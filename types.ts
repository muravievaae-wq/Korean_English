export interface LocalizedString {
  ru: string;
  en: string;
}

export interface SoundVariation {
  position: LocalizedString;
  sound: LocalizedString;
  exampleHangul: string;
  exampleTranscription: LocalizedString;
  explanation: LocalizedString;
}

export interface Character {
  hangul: string;
  name: string; // Korean name, no translation needed
  transcription: LocalizedString;
  type: 'vowel' | 'consonant';
  soundVariations: SoundVariation[];
  acceptablePronunciations?: string[];
}

export interface EnglishExercise {
  sentence: LocalizedString;
  explanation: LocalizedString;
}
