
import React, { useState, useEffect } from 'react';
import { Character } from '../types';
import CharacterCard from './CharacterCard';
import { CloseIcon, MicrophoneIcon, ShuffleIcon, SpeakerIcon } from './icons';
import useSpeechRecognition from '../hooks/useSpeechRecognition';
import { useLanguage } from '../context/LanguageContext';

interface PracticeViewProps {
  characters: Character[];
  onClose: () => void;
}

type Status = 'idle' | 'listening' | 'checking' | 'correct' | 'incorrect';

const speak = (text: string, event?: React.MouseEvent) => {
    event?.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
};

const PracticeView: React.FC<PracticeViewProps> = ({ characters, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledChars, setShuffledChars] = useState<Character[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [lastTranscript, setLastTranscript] = useState('');
  const { isListening, transcript, startListening, hasSupport, error } = useSpeechRecognition();
  const { t, t_replace } = useLanguage();
  
  const shuffleCharacters = React.useCallback(() => {
    setShuffledChars([...characters].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setStatus('idle');
  }, [characters]);
  
  useEffect(() => {
    shuffleCharacters();
  }, [shuffleCharacters]);

  const currentCharacter = shuffledChars[currentIndex];

  useEffect(() => {
    if (isListening) {
      setStatus('listening');
    } else if (status === 'listening') {
      setStatus('checking');
    }
  }, [isListening, status]);

  useEffect(() => {
    if (status === 'checking' && transcript && currentCharacter) {
      setLastTranscript(transcript);
      const acceptableAnswers = currentCharacter.acceptablePronunciations || [currentCharacter.name];
      
      if (acceptableAnswers.some(answer => transcript.includes(answer))) {
        setStatus('correct');
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % shuffledChars.length);
          setStatus('idle');
        }, 1500);
      } else {
        setStatus('incorrect');
      }
    }
  }, [status, transcript, currentCharacter, shuffledChars.length]);
  
  const handleMicClick = () => {
    if (!isListening && (status === 'idle' || status === 'incorrect')) {
      startListening();
    }
  };
  
  if (shuffledChars.length === 0 || !currentCharacter) {
    return null;
  }

  const getStatusMessage = () => {
    switch (status) {
      case 'idle':
        return t('practiceHint');
      case 'listening':
        return t('listening');
      case 'checking':
        return t('checking');
      case 'correct':
        return t('correct');
      case 'incorrect':
        return t_replace('incorrect', { transcript: lastTranscript, correctAnswer: currentCharacter.name });
      default:
        return '';
    }
  };

  const getErrorMessage = () => {
      if (!error) return null;
      switch (error) {
          case 'unsupported':
              return t('speechUnsupported');
          case 'permission-denied':
              return t('speechPermissionDenied');
          default:
              return t_replace('speechError', { error });
      }
  }

  const getStatusColor = () => {
    switch (status) {
      case 'correct':
        return 'text-green-600';
      case 'incorrect':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-4 flex gap-4">
        <button
            onClick={shuffleCharacters}
            className="text-gray-500 hover:text-gray-800 transition-colors"
            aria-label={t('shuffle')}
          >
          <ShuffleIcon className="w-8 h-8" />
        </button>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800 transition-colors"
          aria-label={t('closePractice')}
        >
          <CloseIcon className="w-8 h-8" />
        </button>
      </div>
      
      <div className="relative">
          <div className="w-full max-w-xs mx-auto">
            <CharacterCard character={currentCharacter} onCardClick={() => {}} />
          </div>
          <button
            onClick={(e) => speak(currentCharacter.name, e)}
            className="absolute -top-4 -right-4 p-3 bg-blue-100 hover:bg-blue-200 rounded-full text-blue-600 transition-colors duration-200 shadow-lg"
            aria-label={`${t('pronounce')} ${currentCharacter.name}`}
          >
            <SpeakerIcon className="w-6 h-6" />
          </button>
      </div>

      <div className="mt-6 text-center h-8">
        <p className="text-2xl text-gray-700 font-korean font-semibold">
           {t('practiceCardHint')}: ({currentCharacter.name})
        </p>
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
              disabled={isListening || status === 'correct'}
              className={`w-24 h-24 rounded-full transition-all duration-300 flex items-center justify-center shadow-lg
                ${isListening ? 'bg-red-500 animate-pulse' : 'bg-teal-500 hover:bg-teal-600'}
                ${status === 'correct' ? 'bg-green-500' : ''}
                disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400`}
              aria-label={t('startRecording')}
            >
              <MicrophoneIcon className="w-12 h-12 text-white" />
            </button>
            <p className={`mt-4 text-xl font-semibold h-14 flex items-center justify-center max-w-sm transition-colors ${getStatusColor()}`}>
              {getStatusMessage()}
            </p>
          </>
        )}
      </div>

      <div className="absolute bottom-4 text-gray-500">
        {t_replace('cardOf', { current: String(currentIndex + 1), total: String(shuffledChars.length) })}
      </div>
    </div>
  );
};

export default PracticeView;
