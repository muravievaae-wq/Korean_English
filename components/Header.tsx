import React from 'react';
import { MicrophoneIcon, BackIcon } from './icons';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  onStartPractice: () => void;
  onBack: () => void;
}

const Header: React.FC<HeaderProps> = ({ onStartPractice, onBack }) => {
  const { language, setLanguage, t } = useLanguage();

  const LanguageButton: React.FC<{ lang: 'ru' | 'en' }> = ({ lang }) => (
    <button
      onClick={() => setLanguage(lang)}
      className={`px-4 py-2 text-sm font-bold rounded-md transition-colors ${
        language === lang
          ? 'bg-teal-600 text-white shadow-sm'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      {lang.toUpperCase()}
    </button>
  );

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-teal-600 font-semibold transition-colors"
        >
          <BackIcon className="w-6 h-6" />
          <span>{t('backToHome')}</span>
        </button>

        <div className="flex items-center gap-4">
          <div className="flex space-x-1 bg-gray-200 rounded-lg p-1">
            <LanguageButton lang="ru" />
            <LanguageButton lang="en" />
          </div>
          <button
            onClick={onStartPractice}
            className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            <MicrophoneIcon className="w-5 h-5" />
            <span>{t('startPractice')}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
