import React, { useState, useMemo } from 'react';
import { VOWELS, DIPHTHONGS, CONSONANTS } from '../constants';
import { Character } from '../types';
import Header from './Header';
import CharacterCard from './CharacterCard';
import CharacterModal from './CharacterModal';
import RuleSection from './RuleSection';
import PracticeView from './PracticeView';
import { useLanguage } from '../context/LanguageContext';

interface HangulViewProps {
    onBack: () => void;
}

const HangulView: React.FC<HangulViewProps> = ({ onBack }) => {
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [isPracticeMode, setIsPracticeMode] = useState(false);
  const { t } = useLanguage();

  const allCharacters = useMemo(() => {
    return [...VOWELS, ...DIPHTHONGS, ...CONSONANTS];
  }, []);

  const handleCardClick = (character: Character) => {
    setSelectedChar(character);
  };

  const handleCloseModal = () => {
    setSelectedChar(null);
  };
  
  const handleStartPractice = () => {
    setIsPracticeMode(true);
  };

  const handleClosePractice = () => {
    setIsPracticeMode(false);
  };

  if (isPracticeMode) {
    return <PracticeView characters={allCharacters} onClose={handleClosePractice} />;
  }

  const renderSection = (title: string, characters: Character[]) => (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-700">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {characters.map((char) => (
          <CharacterCard key={char.hangul} character={char} onCardClick={handleCardClick} />
        ))}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-teal-50/20">
      <Header onStartPractice={handleStartPractice} onBack={onBack} />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-teal-600 font-korean">
                {t('headerTitle')}
            </h1>
            <p className="mt-2 text-lg text-gray-600">
                {t('headerSubtitle')}
            </p>
        </div>

        {renderSection(t('simpleVowels'), VOWELS)}
        {renderSection(t('diphthongs'), DIPHTHONGS)}
        {renderSection(t('consonants'), CONSONANTS)}
      </main>
      <RuleSection />
      <footer className="text-center py-6 bg-white mt-8 border-t">
        <p className="text-gray-500">{t('footer')}</p>
      </footer>
      {selectedChar && <CharacterModal character={selectedChar} onClose={handleCloseModal} />}
    </div>
  );
};

export default HangulView;
