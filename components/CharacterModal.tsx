
import React, { useEffect } from 'react';
import { Character } from '../types';
import { CloseIcon, SpeakerIcon } from './icons';
import { useLanguage } from '../context/LanguageContext';

interface CharacterModalProps {
  character: Character | null;
  onClose: () => void;
}

const CharacterModal: React.FC<CharacterModalProps> = ({ character, onClose }) => {
  const { language, t } = useLanguage();

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const speak = (text: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!character) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 relative transform transition-transform duration-300 scale-95"
        onClick={(e) => e.stopPropagation()}
        style={{ transform: character ? 'scale(1)' : 'scale(0.95)' }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
          aria-label={t('close')}
        >
          <CloseIcon className="w-7 h-7" />
        </button>

        <div className="flex flex-col sm:flex-row items-center gap-6 border-b pb-6 mb-6">
          <div className="text-8xl font-korean font-bold text-teal-600">{character.hangul}</div>
          <div>
            <h2 className="text-4xl font-bold text-gray-800">{character.transcription[language]}</h2>
            <p className="text-xl text-gray-500 font-korean">{character.name}</p>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-4 text-gray-700">{t('readingRules')}</h3>
        <div className="space-y-4">
          {character.soundVariations.map((variation, index) => (
            <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-lg font-semibold text-teal-700">
                <span className="font-bold">{variation.position[language]}:</span> "{variation.sound[language]}"
              </p>
              <p className="text-gray-600 mt-1">{variation.explanation[language]}</p>
              <div className="mt-3 flex items-center gap-4 bg-white p-3 rounded-md border">
                <p className="font-korean text-lg">
                  {t('example')}: <span className="font-bold text-xl">{variation.exampleHangul}</span>
                  <span className="text-gray-500"> → [{variation.exampleTranscription[language]}]</span>
                </p>
                <button
                  onClick={(e) => speak(variation.exampleHangul, e)}
                  className="p-2 bg-teal-50 hover:bg-teal-100 rounded-full text-teal-600 transition-colors"
                  aria-label={`${t('pronounceExample')} ${variation.exampleHangul}`}
                >
                  <SpeakerIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharacterModal;
