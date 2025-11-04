import React, { useState } from 'react';
import HangulView from './components/HangulView';
import EnglishPracticeView from './components/EnglishPracticeView';
import { useLanguage } from './context/LanguageContext';

type Mode = 'home' | 'hangul' | 'english';

const HomeScreen: React.FC<{ onSelectMode: (mode: Mode) => void }> = ({ onSelectMode }) => {
  const { t } = useLanguage();

  const ModeCard: React.FC<{ title: string, description: string, onClick: () => void, emoji: string }> = ({ title, description, onClick, emoji }) => (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer p-8 text-center border-2 border-transparent hover:border-teal-400 flex flex-col items-center"
    >
      <div className="text-6xl mb-4">{emoji}</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-teal-600">
          {t('mainTitle')}
        </h1>
        <p className="mt-4 text-xl text-gray-500">
          {t('mainSubtitle')}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <ModeCard
          title={t('hangulModeTitle')}
          description={t('hangulModeDesc')}
          onClick={() => onSelectMode('hangul')}
          emoji="🇰🇷"
        />
        <ModeCard
          title={t('englishModeTitle')}
          description={t('englishModeDesc')}
          onClick={() => onSelectMode('english')}
          emoji="✈️"
        />
      </div>
    </div>
  );
};


const App: React.FC = () => {
  const [mode, setMode] = useState<Mode>('home');

  const handleBack = () => setMode('home');

  if (mode === 'hangul') {
    return <HangulView onBack={handleBack} />;
  }

  if (mode === 'english') {
    return <EnglishPracticeView onBack={handleBack} />;
  }

  return <HomeScreen onSelectMode={setMode} />;
};

export default App;
