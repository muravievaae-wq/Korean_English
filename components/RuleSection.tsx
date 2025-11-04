import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SpeakerIcon } from './icons';

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

const SyllableBlock: React.FC<{ c1: string, v: string, c2?: string, vertical: boolean }> = ({ c1, v, c2, vertical }) => (
    <div className={`relative border-2 border-dashed border-gray-400 w-24 h-24 grid ${vertical ? 'grid-cols-2' : 'grid-rows-2'} items-center justify-items-center text-xl font-korean font-bold`}>
        {vertical ? (
            <>
                <div className="flex flex-col items-center justify-center">
                    <span className="text-gray-500">{c1}</span>
                    {c2 && <span className="text-blue-600">{c2}</span>}
                </div>
                <span className="text-red-600">{v}</span>
            </>
        ) : (
            <>
                <span className="text-gray-500">{c1}</span>
                 <div className="flex items-center justify-center">
                    <span className="text-red-600">{v}</span>
                    {c2 && <span className="text-blue-600 ml-2">{c2}</span>}
                </div>
            </>
        )}
    </div>
);

const SyllableStructureDiagram: React.FC<{ c1: string, v: string, c2?: string, example: string }> = ({ c1, v, c2, example }) => (
    <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
        <div className="w-16 h-16 border-2 border-dashed border-gray-400 grid grid-cols-2 grid-rows-2 text-center font-mono text-gray-500">
            <span className="flex items-center justify-center">{c1}</span>
            <span className="flex items-center justify-center">{v}</span>
            <span className={`flex items-center justify-center col-span-2 ${c2 ? 'text-blue-500' : ''}`}>{c2 ? c2 : ''}</span>
        </div>
        <div className="mt-2 text-3xl font-korean font-bold">{example}</div>
    </div>
);


const RuleSection: React.FC = () => {
  const { t } = useLanguage();

  const renderSyllableBuilding = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-teal-800 mb-3">{t('syllableBuilding')}</h3>
        <p className="text-gray-600 mb-6">{t('syllableIntro')}</p>
        
        <div className="mb-8">
            <h4 className="text-xl font-bold text-gray-700 mb-3 border-l-4 border-teal-500 pl-3">{t('syllableCase1Title')}</h4>
            <p className="text-gray-600 mb-4">{t('syllableCase1Desc')}</p>
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <h5 className="font-semibold mb-2">{t('verticalVowel')}</h5>
                    <p className="text-sm text-gray-500 mb-3">{t('verticalVowelDesc')}</p>
                    <div className="flex gap-4 items-center">
                        <SyllableStructureDiagram c1="C" v="V" example="아" />
                        <SyllableStructureDiagram c1="C" v="V" example="너" />
                    </div>
                </div>
                <div>
                    <h5 className="font-semibold mb-2">{t('horizontalVowel')}</h5>
                    <p className="text-sm text-gray-500 mb-3">{t('horizontalVowelDesc')}</p>
                    <div className="flex gap-4 items-center">
                        <SyllableStructureDiagram c1="C" v="V" example="오" />
                        <SyllableStructureDiagram c1="C" v="V" example="누" />
                    </div>
                </div>
            </div>
        </div>

        <div>
            <h4 className="text-xl font-bold text-gray-700 mb-3 border-l-4 border-teal-500 pl-3">{t('syllableCase2Title')}</h4>
            <p className="text-gray-600 mb-4">{t('syllableCase2Desc')}</p>
             <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <h5 className="font-semibold mb-2">{t('verticalVowelBatchim')}</h5>
                     <div className="flex gap-4 items-center">
                        <SyllableStructureDiagram c1="C" v="V" c2="C" example="않" />
                        <SyllableStructureDiagram c1="C" v="V" c2="C" example="읽" />
                    </div>
                </div>
                <div>
                    <h5 className="font-semibold mb-2">{t('horizontalVowelBatchim')}</h5>
                    <div className="flex gap-4 items-center">
                        <SyllableStructureDiagram c1="C" v="V" c2="C" example="운" />
                        <SyllableStructureDiagram c1="C" v="V" c2="C" example="곧" />
                    </div>
                </div>
            </div>
        </div>
    </div>
  );

  const renderBatchimRules = () => {
      const rules = [
          { sound: t('batchimSoundK'), letters: "ㄱ, ㅋ, ㄲ", example: "부엌 [부억]" },
          { sound: t('batchimSoundN'), letters: "ㄴ", example: "산 [산]" },
          { sound: t('batchimSoundT'), letters: "ㄷ, ㅅ, ㅆ, ㅈ, ㅊ, ㅌ, ㅎ", example: "옷 [옫], 있다 [읻다], 꽃 [꼳]" },
          { sound: t('batchimSoundL'), letters: "ㄹ", example: "달 [달]" },
          { sound: t('batchimSoundM'), letters: "ㅁ", example: "몸 [몸]" },
          { sound: t('batchimSoundP'), letters: "ㅂ, ㅍ", example: "밥 [밥], 앞 [압]" },
          { sound: t('batchimSoundNG'), letters: "ㅇ", example: "강 [강]" }
      ];
      return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 className="text-2xl font-semibold text-teal-800 mb-3">{t('batchimTitle')}</h3>
            <p className="text-gray-600 mb-6">{t('batchimIntro')}</p>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-teal-50">
                            <th className="p-3 font-semibold text-teal-800 border-b-2 border-teal-200">{t('batchimTableSound')}</th>
                            <th className="p-3 font-semibold text-teal-800 border-b-2 border-teal-200">{t('batchimTableLetters')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rules.map(rule => (
                            <tr key={rule.sound} className="hover:bg-gray-50">
                                <td className="p-3 border-b border-gray-200 font-bold">{rule.sound}</td>
                                <td className="p-3 border-b border-gray-200 font-korean text-xl">{rule.letters}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
             <p className="mt-4 text-gray-600">
                <span className="font-semibold">{t('batchimExample')}</span>
                <span className="font-korean ml-2">부엌 → [부억],</span>
                <span className="font-korean ml-2">옷 → [옫],</span>
                <span className="font-korean ml-2">앞 → [압]</span>
             </p>
        </div>
      );
  };
  
  const renderAdvancedRules = () => (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h3 className="text-2xl font-semibold text-teal-800 mb-3">{t('advancedRulesTitle')}</h3>
      <div className="space-y-6">
        <div>
          <h4 className="text-xl font-bold text-gray-700 mb-2">{t('linkingRuleTitle')}</h4>
          <p className="text-gray-600 mb-3">{t('linkingRuleDesc')}</p>
          <div className="bg-gray-100 p-3 rounded font-korean text-gray-700">
             <p>
                {t('linkingRuleExample1')}
                <button onClick={(e) => speak('밥은', e)} className="ml-2 p-1 bg-teal-100 hover:bg-teal-200 rounded-full text-teal-600 align-middle"><SpeakerIcon className="w-4 h-4" /></button>
             </p>
             <p>
                {t('linkingRuleExample2')}
                <button onClick={(e) => speak('한국어', e)} className="ml-2 p-1 bg-teal-100 hover:bg-teal-200 rounded-full text-teal-600 align-middle"><SpeakerIcon className="w-4 h-4" /></button>
             </p>
          </div>
        </div>
        <div>
          <h4 className="text-xl font-bold text-gray-700 mb-2">{t('nasalAssimilationTitle')}</h4>
          <p className="text-gray-600 mb-3">{t('nasalAssimilationDesc')}</p>
          <div className="bg-gray-100 p-3 rounded font-korean text-gray-700 space-y-2">
            <p><strong>{t('nasalAssimilationRule1')}:</strong> {t('nasalAssimilationExample1')}
                <button onClick={(e) => speak('국물', e)} className="ml-2 p-1 bg-teal-100 hover:bg-teal-200 rounded-full text-teal-600 align-middle"><SpeakerIcon className="w-4 h-4" /></button>
            </p>
            <p><strong>{t('nasalAssimilationRule2')}:</strong> {t('nasalAssimilationExample2')}
                 <button onClick={(e) => speak('있는', e)} className="ml-2 p-1 bg-teal-100 hover:bg-teal-200 rounded-full text-teal-600 align-middle"><SpeakerIcon className="w-4 h-4" /></button>
            </p>
            <p><strong>{t('nasalAssimilationRule3')}:</strong> {t('nasalAssimilationExample3')}
                <button onClick={(e) => speak('입니다', e)} className="ml-2 p-1 bg-teal-100 hover:bg-teal-200 rounded-full text-teal-600 align-middle"><SpeakerIcon className="w-4 h-4" /></button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-700">{t('phoneticRules')}</h2>
      <div className="max-w-4xl mx-auto space-y-6">
        {renderSyllableBuilding()}
        {renderBatchimRules()}
        {renderAdvancedRules()}
      </div>
    </div>
  );
};

export default RuleSection;
