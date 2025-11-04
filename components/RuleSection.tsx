
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const RuleSection: React.FC = () => {
  const { translations, t } = useLanguage();
  const rules = translations.rules || [];

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-700">{t('phoneticRules')}</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {rules.map((rule, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-teal-500">
            <h3 className="text-xl font-semibold text-teal-800 mb-2">{rule.title}</h3>
            <p className="text-gray-600 mb-3">{rule.description}</p>
            <p className="bg-gray-100 p-3 rounded font-korean text-gray-700 text-center">
              <span className="font-semibold">{t('example')}:</span> {rule.example}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RuleSection;
