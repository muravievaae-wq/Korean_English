
import React from 'react';
import { Character } from '../types';
import { SpeakerIcon } from './icons';
import { useLanguage } from '../context/LanguageContext';

interface CharacterCardProps {
  character: Character;
  onCardClick: (character: Character) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onCardClick }) => {
  const { language, t } = useLanguage();

  const speak = (text: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if ('speechSynthesis' in window) {
      // Cancel any previous speech to avoid overlap
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech is not supported in your browser.');
    }
  };

  return (
    <div
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-in-out p-4 flex flex-col items-center justify-between cursor-pointer border-2 border-transparent hover:border-teal-400"
      onClick={() => onCardClick(character)}
    >
      <div className="text-center">
        <p className="text-7xl font-korean font-bold text-gray-800">{character.hangul}</p>
        <p className="text-2xl text-teal-600 mt-2 font-semibold">{character.transcription[language]}</p>
        <p className="text-md text-gray-500 font-korean">{character.name}</p>
      </div>
      <button
        onClick={(e) => speak(character.hangul, e)}
        className="mt-4 p-3 bg-teal-50 hover:bg-teal-100 rounded-full text-teal-600 transition-colors duration-200"
        aria-label={`${t('pronounce')} ${character.name}`}
      >
        <SpeakerIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default CharacterCard;
