import React, { useState, useEffect } from 'react';
import { englishExercises } from '../data/englishData';
import { useLanguage } from '../context/LanguageContext';
import { BackIcon, SpeakerIcon, MicrophoneIcon, ShuffleIcon } from './icons';
import useSpeechRecognition from '../hooks/useSpeechRecognition';
import { EnglishExercise } from '../types';
import { GoogleGenAI, Type } from "@google/genai";

interface EnglishPracticeViewProps {
  onBack: () => void;
}

type Status = 'idle' | 'listening' | 'analyzing' | 'correct' | 'incorrect';

const ScoreCircle: React.FC<{ score: number }> = ({ score }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-32 h-32">
      <svg className="w-full h-full" viewBox="0 0 120 120">
        <circle
          className="text-gray-200"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="60"
          cy="60"
        />
        <circle
          className="text-teal-500"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="60"
          cy="60"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 0.5s ease-in-out' }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-teal-600">
        {score}
      </span>
    </div>
  );
};

const EnglishPracticeView: React.FC<EnglishPracticeViewProps> = ({ onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledExercises, setShuffledExercises] = useState<EnglishExercise[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  
  const { language, t, t_replace, setLanguage } = useLanguage();
  const { isListening, transcript, startListening, hasSupport, error } = useSpeechRecognition('en-US');

  const shuffleExercises = React.useCallback(() => {
    setShuffledExercises([...englishExercises].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setStatus('idle');
    setScore(null);
    setFeedback(null);
  }, []);
  
  useEffect(() => {
    shuffleExercises();
  }, [shuffleExercises]);
  
  const currentExercise = shuffledExercises[currentIndex];

  useEffect(() => {
    if (isListening) {
      setStatus('listening');
      setScore(null);
      setFeedback(null);
    } else if (status === 'listening' && transcript) {
      getAIFeedback(currentExercise.sentence.en, transcript);
    }
  }, [isListening, transcript, status, currentExercise]);

  const getAIFeedback = async (correctSentence: string, userTranscript: string) => {
    setStatus('analyzing');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      
      const langName = language === 'ru' ? 'Russian' : 'English';
      const prompt = `You are an expert English pronunciation coach. The user is practicing the following sentence: "${correctSentence}". The user pronounced it, and the speech-to-text result was: "${userTranscript}". Analyze the user's transcript compared to the correct sentence. Provide a score from 0 to 100 based on accuracy, completeness, and similarity. A perfect match should be 100. Minor deviations should result in a slightly lower score. Significant errors or missing words should result in a much lower score. Provide concise, helpful feedback in ${langName} on what the user should improve. Focus on the key mistakes.`;

      const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
          config: {
              responseMimeType: "application/json",
              responseSchema: {
                  type: Type.OBJECT,
                  properties: {
                      score: { type: Type.NUMBER },
                      feedback: { type: Type.STRING },
                  },
              },
          },
      });

      const result = JSON.parse(response.text);
      setScore(result.score);
      setFeedback(result.feedback);

      if (result.score > 85) {
        setStatus('correct');
        setTimeout(() => {
          handleNext();
        }, 3000);
      } else {
        setStatus('incorrect');
      }

    } catch (e) {
        console.error("Error getting AI feedback:", e);
        setFeedback(t('geminiError'));
        setStatus('incorrect');
    }
  };

  const handleMicClick = () => {
    if (!isListening && (status === 'idle' || status === 'incorrect')) {
      startListening();
    }
  };

  const handleNext = () => {
    if (currentIndex < shuffledExercises.length) {
      setCurrentIndex(currentIndex + 1);
      setStatus('idle');
      setScore(null);
      setFeedback(null);
    }
  };
  
  const handleRestart = () => {
    shuffleExercises();
  };

  const speak = (text: string, lang: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const LanguageButton: React.FC<{ lang: 'ru' | 'en' }> = ({ lang }) => (
    <button
      onClick={() => setLanguage(lang)}
      className={`px-3 py-1.5 text-sm font-bold rounded-md transition-colors ${
        language === lang
          ? 'bg-teal-600 text-white shadow-sm'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      {lang.toUpperCase()}
    </button>
  );

  const getStatusMessage = () => {
    switch (status) {
      case 'idle':
        return t('englishPracticeHint');
      case 'listening':
        return t('listening');
      case 'analyzing':
        return t('analyzing');
      case 'correct':
        return t('correct');
      case 'incorrect':
        return t('englishIncorrect');
      default:
        return '';
    }
  };
  
  const getErrorMessage = () => {
    if (!error) return null;
    return error === 'unsupported' ? t('speechUnsupported') :
           error === 'permission-denied' ? t('speechPermissionDenied') :
           t_replace('speechError', { error });
  };

  const getStatusColor = () => {
    return status === 'correct' ? 'text-green-600' :
           status === 'incorrect' ? 'text-red-600' :
           'text-gray-600';
  };

  const renderCompletedView = () => (
    <div className="text-center bg-white p-10 rounded-xl shadow-xl w-full">
      <div className="text-5xl mb-4">🎉</div>
      <h2 className="text-3xl font-bold text-teal-600 mb-2">{t('completed')}</h2>
      <p className="text-gray-700 text-lg mb-6">{t('completedMessage')}</p>
      <button
        onClick={handleRestart}
        className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-lg transition-transform duration-200 hover:scale-105"
      >
        {t('restart')}
      </button>
    </div>
  );
  
  return (
    <div className="min-h-screen bg-teal-50/50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <header className="flex justify-between items-center mb-6">
           <button
             onClick={onBack}
             className="flex items-center gap-2 text-gray-600 hover:text-teal-600 font-semibold transition-colors"
           >
             <BackIcon className="w-6 h-6" />
             <span>{t('backToHome')}</span>
           </button>
           <div className="flex items-center gap-4">
             <button
                onClick={shuffleExercises}
                className="text-gray-500 hover:text-gray-800 transition-colors"
                aria-label={t('shuffle')}
              >
              <ShuffleIcon className="w-7 h-7" />
            </button>
            <div className="flex space-x-1 bg-gray-200 rounded-lg p-1">
              <LanguageButton lang="ru" />
              <LanguageButton lang="en" />
            </div>
           </div>
        </header>

        <main className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center min-h-[500px]">
          {currentIndex >= shuffledExercises.length ? renderCompletedView() : (
            <>
              <div className="w-full flex justify-between items-baseline mb-4">
                <h1 className="text-2xl font-bold text-teal-700">{t('englishPracticeTitle')}</h1>
                <p className="text-gray-500 font-semibold">
                    {t_replace('questionOf', { current: currentIndex + 1, total: shuffledExercises.length })}
                </p>
              </div>
              
              <div className="w-full bg-gray-100 p-6 rounded-lg mb-6 flex items-center justify-center gap-4 relative min-h-[100px]">
                <p className="text-lg md:text-xl text-gray-800 leading-relaxed text-center font-bold">
                  {currentExercise.sentence.en}
                </p>
                 <button
                    onClick={() => speak(currentExercise.sentence.en, 'en-US')}
                    className="p-2 bg-teal-100 hover:bg-teal-200 rounded-full text-teal-600 transition-colors duration-200 flex-shrink-0"
                    aria-label={t('pronounceExample')}
                  >
                    <SpeakerIcon className="w-5 h-5" />
                  </button>
              </div>
              
              <div className="mt-4 text-center flex flex-col items-center">
                {!hasSupport ? (
                  <p className="text-red-600 font-semibold">{t('speechUnsupported')}</p>
                ) : error ? (
                   <p className="text-red-600 font-semibold max-w-sm">{getErrorMessage()}</p>
                ) : (
                  <>
                    <button
                      onClick={handleMicClick}
                      disabled={isListening || status === 'analyzing' || status === 'correct'}
                      className={`w-24 h-24 rounded-full transition-all duration-300 flex items-center justify-center shadow-lg
                        ${isListening || status === 'analyzing' ? 'bg-red-500 animate-pulse' : 'bg-teal-500 hover:bg-teal-600'}
                        ${status === 'correct' ? 'bg-green-500' : ''}
                        disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400`}
                      aria-label={t('startRecording')}
                    >
                      <MicrophoneIcon className="w-12 h-12 text-white" />
                    </button>
                    <p className={`mt-4 text-xl font-semibold h-8 flex items-center justify-center max-w-md text-center transition-colors ${getStatusColor()}`}>
                      {getStatusMessage()}
                    </p>
                  </>
                )}
              </div>

              {(score !== null || feedback) && (
                <div className="mt-6 w-full p-4 rounded-lg bg-blue-50 border border-blue-200 flex flex-col md:flex-row items-center gap-6">
                  {score !== null && (
                    <div className="text-center flex-shrink-0">
                      <h3 className="font-bold text-lg text-blue-800 mb-2">{t('yourScore')}</h3>
                      <ScoreCircle score={score} />
                    </div>
                  )}
                  {feedback && (
                    <div className="flex-grow">
                      <h3 className="font-bold text-lg text-blue-800">{t('feedback')}</h3>
                      <p className="mt-1 text-gray-700">{feedback}</p>
                    </div>
                  )}
                </div>
              )}
              
              {status === 'incorrect' && (
                 <button
                    onClick={handleNext}
                    className="mt-6 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-transform duration-200 hover:scale-105"
                  >
                    {t('nextQuestion')}
                  </button>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default EnglishPracticeView;