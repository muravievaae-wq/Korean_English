export const en = {
  // Main/Home Screen
  mainTitle: "Language Trainer",
  mainSubtitle: "Choose what you want to learn today",
  hangulModeTitle: "Korean Alphabet (Hangul)",
  hangulModeDesc: "An interactive guide to letters, syllables, and reading rules.",
  englishModeTitle: "English for Travel",
  englishModeDesc: "Practice pronouncing useful phrases for your trips.",
  backToHome: "Back to Home",

  // Header
  headerTitle: "Hangul (한글) Practice",
  headerSubtitle: "Interactive guide to the Korean alphabet",
  startPractice: "Pronunciation Practice",

  // App Sections
  simpleVowels: "Simple Vowels",
  diphthongs: "Diphthongs (Complex Vowels)",
  consonants: "Consonants",
  footer: "Created for effective learning of the Korean language.",

  // Modal
  readingRules: "Reading Rules",
  example: "Example",
  close: "Close",
  pronounce: "Pronounce",
  pronounceExample: "Pronounce example",

  // Rules Section
  phoneticRules: "Main Phonetic Rules",
  rules: [
    {
      title: "Batchim (받침) - Consonant at the end of a syllable",
      description: "Consonants at the end of a syllable (in the 'basement') are often read differently than at the beginning. Many are devoiced. For example, ㅅ, ㅆ, ㅈ, ㅊ, ㄷ, ㅌ, ㅎ in batchim are all pronounced as [t].",
      example: "옷 [ot], 있다 [itta], 낮 [nat], 꽃 [kkot], 끝 [kkeut]"
    },
    {
      title: "Assimilation (동화)",
      description: "Adjacent consonants can influence each other, changing their pronunciation. This is one of the most important rules for natural speech.",
      example: "국물 [gungmul] (ㄱ before ㅁ is read as ㅇ), 입니다 [imnida] (ㅂ before ㄴ is read as ㅁ)"
    },
    {
      title: "Voicing",
      description: "Unvoiced consonants ㄱ, ㄷ, ㅂ, ㅈ become voiced (sounding like g, d, b, j) when they are between two vowels.",
      example: "가구 [gagu], 바다 [bada], 나비 [nabi]"
    },
    {
      title: "Palatalization (구개음화)",
      description: "Consonants ㄷ and ㅌ, when followed by the vowel ㅣ or a yotated vowel (ㅑ, ㅕ, ㅛ, ㅠ), change to ㅈ and ㅊ respectively.",
      example: "같이 [kachi], 굳이 [kuji]"
    }
  ],

  // Practice View (Hangul)
  practiceHint: 'Press the microphone and say the NAME of the letter.',
  listening: 'Listening...',
  checking: 'Checking...',
  correct: 'Excellent! Correct!',
  incorrect: 'Almost! I heard: "{transcript}". Try saying "{correctAnswer}".',
  shuffle: "Shuffle cards",
  closePractice: "Close practice",
  practiceCardHint: "Hint",
  startRecording: "Start recording",
  cardOf: "Card {current} of {total}",
  
  // Speech Recognition Errors
  speechUnsupported: "Speech recognition is not supported in this browser.",
  speechPermissionDenied: "Microphone access is blocked. Please allow access in your browser settings.",
  speechError: "Recognition error: {error}",

  // English Practice View
  englishPracticeTitle: "Pronunciation Practice: Travel",
  englishPracticeHint: "Press the microphone and say the phrase in English.",
  englishIncorrect: 'Please try again for a better score.',
  nextQuestion: "Next",
  explanation: "Explanation",
  completed: "Congratulations!",
  completedMessage: "You have completed all the exercises. Great job!",
  restart: "Restart",
  questionOf: "Sentence {current} of {total}",
  analyzing: "Analyzing...",
  yourScore: "Your Score",
  feedback: "Feedback",
  geminiError: "Could not get feedback. Please try again.",
};