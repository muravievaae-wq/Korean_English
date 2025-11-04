import React, { useState, useMemo } from 'react';
import { englishExercises } from '../data/englishData';
import { useLanguage } from '../context/LanguageContext';
import { BackIcon, SpeakerIcon } from './icons';

interface EnglishPracticeViewProps {
  onBack: () => void;
}

const EnglishPracticeView: React.FC<EnglishPracticeViewProps> = ({ onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const { language, t, t_replace, setLanguage } = useLanguage();

  const currentExercise = englishExercises[currentIndex];
  const isCorrect = selectedAnswer === currentExercise?.correct_option;

  const handleAnswerSelect = (option: string) => {
    if (showFeedback) return;
    setSelectedAnswer(option);
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentIndex < englishExercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };
  
  const speak = (text: string, lang: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn('Text-to-speech is not supported in your browser.');
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

  const renderCompletedView = () => (
    <div className="text-center bg-white p-10 rounded-xl shadow-xl">
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
  
  const fullSentence = currentExercise ? `${currentExercise.sentence_start[language]} ${currentExercise.correct_option} ${currentExercise.sentence_end[language]}`.trim().replace(/\s\s+/g, ' ') : '';


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
           <div className="flex space-x-1 bg-gray-200 rounded-lg p-1">
            <LanguageButton lang="ru" />
            <LanguageButton lang="en" />
          </div>
        </header>

        <div className="bg-white p-8 rounded-2xl shadow-xl">
          {currentIndex >= englishExercises.length ? renderCompletedView() : (
            <>
              <div className="flex justify-between items-baseline mb-4">
                <h1 className="text-2xl font-bold text-teal-700">{t('englishPracticeTitle')}</h1>
                <p className="text-gray-500 font-semibold">
                    {t_replace('questionOf', { current: currentIndex + 1, total: englishExercises.length })}
                </p>
              </div>

              <div className="bg-gray-100 p-6 rounded-lg mb-6 flex items-center gap-4">
                <p className="text-lg md:text-xl text-gray-800 text-center leading-relaxed flex-grow">
                  {currentExercise.sentence_start[language]}
                  <span className="font-bold text-teal-600 border-b-2 border-teal-400 border-dashed mx-2 px-2">
                    {showFeedback ? currentExercise.correct_option : '______'}
                  </span>
                  {currentExercise.sentence_end[language]}
                </p>
                 <button
                    onClick={() => speak(fullSentence, 'en-US')}
                    className="p-3 bg-teal-100 hover:bg-teal-200 rounded-full text-teal-600 transition-colors duration-200 flex-shrink-0 self-center"
                    aria-label={t('pronounceExample')}
                  >
                    <SpeakerIcon className="w-6 h-6" />
                  </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentExercise.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={showFeedback}
                    className={`p-4 rounded-lg text-left font-semibold transition-all duration-200 border-2
                      ${showFeedback ? 
                        (option === currentExercise.correct_option ? 'bg-green-100 border-green-500 text-green-800' : 
                         option === selectedAnswer ? 'bg-red-100 border-red-500 text-red-800' : 'bg-gray-100 border-gray-200 text-gray-500')
                        : 'bg-white border-gray-300 hover:bg-teal-50 hover:border-teal-400'
                      }
                      ${!showFeedback ? 'cursor-pointer' : 'cursor-default'}
                    `}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {showFeedback && (
                <div className="mt-6">
                  <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                    <h3 className={`font-bold text-xl ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                      {isCorrect ? t('correctExclamation') : t('incorrectExclamation')}
                    </h3>
                    <p className="mt-2 text-gray-700">
                      <span className="font-semibold">{t('explanation')}:</span> {currentExercise.explanation[language]}
                    </p>
                  </div>
                  <button
                    onClick={handleNext}
                    className="mt-4 w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg transition-transform duration-200 hover:scale-105"
                  >
                    {t('nextQuestion')}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnglishPracticeView;