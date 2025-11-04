
import React, { createContext, useState, useContext, ReactNode, useMemo } from 'react';
import { ru } from '../locales/ru';
import { en } from '../locales/en';

type Language = 'ru' | 'en';

type Translations = typeof ru;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: keyof Translations) => string;
  t_replace: (key: keyof Translations, replacements?: { [key: string]: string | number }) => string;
  translations: Translations;
}

const translationsData = { ru, en };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ru');

  const value = useMemo(() => {
    const t = (key: keyof Translations): string => {
      return translationsData[language][key] as string || key;
    };

    const t_replace = (key: keyof Translations, replacements: { [key: string]: string | number } = {}): string => {
      let text = translationsData[language][key] as string || key;
      Object.keys(replacements).forEach(rKey => {
        text = text.replace(`{${rKey}}`, String(replacements[rKey]));
      });
      return text;
    };
    
    return { 
        language, 
        setLanguage, 
        t,
        t_replace,
        translations: translationsData[language] 
    };
  }, [language]);


  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
