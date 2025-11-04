
import { useState, useEffect, useRef } from 'react';

interface SpeechRecognition extends EventTarget {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  continuous: boolean;
  start(): void;
  stop(): void;
  abort(): void;
  grammars: any; 
  onerror: ((event: any) => void) | null;
  onresult: ((event: any) => void) | null;
  onend: (() => void) | null;
}

interface SpeechRecognitionStatic {
  new (): SpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionStatic;
    webkitSpeechRecognition: SpeechRecognitionStatic;
  }
}

export type SpeechRecognitionError = 'unsupported' | 'permission-denied' | 'network' | 'no-speech' | 'aborted' | 'audio-capture' | 'bad-grammar' | 'language-not-supported' | 'not-allowed' | 'service-not-allowed' | 'unknown';


const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<SpeechRecognitionError | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const hasSupport = !!(typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition));

  useEffect(() => {
    if (!hasSupport) {
        setError('unsupported');
        return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'ko-KR';
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const result = event.results[event.results.length - 1][0].transcript;
      setTranscript(result.trim());
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      let errorCode: SpeechRecognitionError = event.error;
       if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        errorCode = 'permission-denied';
      }
      setError(errorCode);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
        if (recognitionRef.current) {
            recognitionRef.current.abort();
        }
    };
  }, [hasSupport]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setTranscript('');
      setError(null);
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.error("Could not start recognition", e);
        setError("unknown");
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };
  
  return { isListening, transcript, error, startListening, stopListening, hasSupport };
};

export default useSpeechRecognition;
