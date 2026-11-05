export type GameMode = 'explore' | 'balloons' | 'tracing' | 'quiz' | 'memory';

export interface VocabularyItem {
  id: string;
  word: string;
  syllables: string[];
  meaningIndo: string;
  sentence: string;
  iconType: 'jeruk' | 'jerapah' | 'jam' | 'jagung' | 'jari' | 'jendela' | 'jus' | 'jembatan';
  color: string;
  borderColor: string;
  lightBg: string;
}

export interface QuizQuestion {
  id: number;
  prompt: string;
  options: {
    text: string;
    isCorrect: boolean;
    iconType: 'jeruk' | 'jerapah' | 'jam' | 'jagung' | 'jari' | 'jendela' | 'jus' | 'jembatan' | 'apel' | 'bola' | 'kucing' | 'bunga' | 'pisang';
    hint: string;
  }[];
}

export interface StickerReward {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
}
