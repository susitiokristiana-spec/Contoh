import React from 'react';
import { VocabularyItem, QuizQuestion, StickerReward } from '../types/game';

// Custom SVG Icons for children: Bright, cheerful, and recognizable
export const KidIllustrations: Record<string, () => React.JSX.Element> = {
  jeruk: () => (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="54" r="38" fill="#FB923C" />
      <circle cx="50" cy="54" r="38" stroke="#EA580C" strokeWidth="4" />
      {/* Orange texture dots */}
      <circle cx="36" cy="46" r="2.5" fill="#F97316" />
      <circle cx="64" cy="46" r="2.5" fill="#F97316" />
      <circle cx="48" cy="68" r="2.5" fill="#F97316" />
      <circle cx="38" cy="62" r="2.5" fill="#F97316" />
      <circle cx="62" cy="62" r="2.5" fill="#F97316" />
      {/* Cute eyes & smile */}
      <circle cx="40" cy="52" r="4" fill="#431407" />
      <circle cx="60" cy="52" r="4" fill="#431407" />
      <circle cx="41.5" cy="50.5" r="1.5" fill="#FFFFFF" />
      <circle cx="61.5" cy="50.5" r="1.5" fill="#FFFFFF" />
      <path d="M 43 62 Q 50 68 57 62" stroke="#431407" strokeWidth="3" strokeLinecap="round" />
      {/* Rosy cheeks */}
      <ellipse cx="33" cy="57" rx="3.5" ry="2" fill="#F43F5E" opacity="0.6" />
      <ellipse cx="67" cy="57" rx="3.5" ry="2" fill="#F43F5E" opacity="0.6" />
      {/* Stem & Leaf */}
      <path d="M 50 16 Q 52 8 50 4" stroke="#78350F" strokeWidth="5" strokeLinecap="round" />
      <path d="M 52 14 C 64 6 78 12 76 22 C 64 26 54 18 52 14 Z" fill="#22C55E" stroke="#15803D" strokeWidth="3" />
    </svg>
  ),

  jerapah: () => (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body & long neck */}
      <path d="M 30 92 L 40 40 Q 42 26 50 26 Q 58 26 60 40 L 70 92 Z" fill="#FBBF24" />
      <path d="M 30 92 L 40 40 Q 42 26 50 26 Q 58 26 60 40 L 70 92 Z" stroke="#D97706" strokeWidth="4" />
      {/* Spots */}
      <ellipse cx="48" cy="55" rx="7" ry="5" fill="#B45309" />
      <ellipse cx="44" cy="72" rx="6" ry="7" fill="#B45309" />
      <ellipse cx="58" cy="68" rx="5" ry="6" fill="#B45309" />
      {/* Head */}
      <ellipse cx="50" cy="24" rx="16" ry="14" fill="#FBBF24" stroke="#D97706" strokeWidth="3.5" />
      {/* Snout */}
      <ellipse cx="50" cy="30" rx="11" ry="8" fill="#FDE68A" />
      <circle cx="46" cy="30" r="1.5" fill="#78350F" />
      <circle cx="54" cy="30" r="1.5" fill="#78350F" />
      <path d="M 47 34 Q 50 36 53 34" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
      {/* Cute eyes */}
      <circle cx="43" cy="20" r="3.5" fill="#451A03" />
      <circle cx="57" cy="20" r="3.5" fill="#451A03" />
      <circle cx="44" cy="19" r="1" fill="#FFFFFF" />
      <circle cx="58" cy="19" r="1" fill="#FFFFFF" />
      {/* Cheeks */}
      <circle cx="37" cy="25" r="2.5" fill="#FB7185" opacity="0.6" />
      <circle cx="63" cy="25" r="2.5" fill="#FB7185" opacity="0.6" />
      {/* Horns (Ossicones) */}
      <path d="M 44 14 L 42 6" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
      <circle cx="42" cy="6" r="3.5" fill="#92400E" />
      <path d="M 56 14 L 58 6" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
      <circle cx="58" cy="6" r="3.5" fill="#92400E" />
      {/* Ears */}
      <ellipse cx="32" cy="18" rx="6" ry="3" transform="rotate(-30 32 18)" fill="#FBBF24" stroke="#D97706" strokeWidth="2.5" />
      <ellipse cx="68" cy="18" rx="6" ry="3" transform="rotate(30 68 18)" fill="#FBBF24" stroke="#D97706" strokeWidth="2.5" />
    </svg>
  ),

  jam: () => (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Clock twin bells */}
      <circle cx="28" cy="26" r="13" fill="#60A5FA" stroke="#2563EB" strokeWidth="3" />
      <circle cx="72" cy="26" r="13" fill="#60A5FA" stroke="#2563EB" strokeWidth="3" />
      {/* Alarm hammer */}
      <path d="M 44 16 L 56 16" stroke="#1E40AF" strokeWidth="4" strokeLinecap="round" />
      {/* Clock legs */}
      <line x1="30" y1="84" x2="22" y2="94" stroke="#1E40AF" strokeWidth="5" strokeLinecap="round" />
      <line x1="70" y1="84" x2="78" y2="94" stroke="#1E40AF" strokeWidth="5" strokeLinecap="round" />
      {/* Main clock circle */}
      <circle cx="50" cy="56" r="34" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="5" />
      {/* Clock face markings */}
      <circle cx="50" cy="28" r="2.5" fill="#1D4ED8" />
      <circle cx="78" cy="56" r="2.5" fill="#1D4ED8" />
      <circle cx="50" cy="84" r="2.5" fill="#1D4ED8" />
      <circle cx="22" cy="56" r="2.5" fill="#1D4ED8" />
      {/* Clock hands showing 3 o'clock */}
      <line x1="50" y1="56" x2="50" y2="34" stroke="#1E3A8A" strokeWidth="4" strokeLinecap="round" />
      <line x1="50" y1="56" x2="68" y2="56" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
      <circle cx="50" cy="56" r="4.5" fill="#1E3A8A" />
      {/* Friendly face */}
      <circle cx="42" cy="64" r="2" fill="#1E40AF" />
      <circle cx="58" cy="64" r="2" fill="#1E40AF" />
      <path d="M 46 68 Q 50 71 54 68" stroke="#1E40AF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  jagung: () => (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Corn husk leaves */}
      <path d="M 32 86 C 18 64 24 38 42 28 C 30 52 38 74 46 88 Z" fill="#86EFAC" stroke="#16A34A" strokeWidth="3" />
      <path d="M 68 86 C 82 64 76 38 58 28 C 70 52 62 74 54 88 Z" fill="#86EFAC" stroke="#16A34A" strokeWidth="3" />
      {/* Corn Cob */}
      <ellipse cx="50" cy="50" rx="19" ry="34" fill="#FACC15" stroke="#CA8A04" strokeWidth="4" />
      {/* Corn kernels grid */}
      <line x1="42" y1="26" x2="42" y2="74" stroke="#EAB308" strokeWidth="2" strokeDasharray="3 3" />
      <line x1="50" y1="20" x2="50" y2="80" stroke="#EAB308" strokeWidth="2" strokeDasharray="3 3" />
      <line x1="58" y1="26" x2="58" y2="74" stroke="#EAB308" strokeWidth="2" strokeDasharray="3 3" />
      <line x1="36" y1="40" x2="64" y2="40" stroke="#EAB308" strokeWidth="2" />
      <line x1="34" y1="52" x2="66" y2="52" stroke="#EAB308" strokeWidth="2" />
      <line x1="36" y1="64" x2="64" y2="64" stroke="#EAB308" strokeWidth="2" />
      {/* Cute eyes */}
      <circle cx="44" cy="46" r="3" fill="#713F12" />
      <circle cx="56" cy="46" r="3" fill="#713F12" />
      <circle cx="45" cy="45" r="1" fill="#FFFFFF" />
      <circle cx="57" cy="45" r="1" fill="#FFFFFF" />
      <path d="M 46 54 Q 50 58 54 54" stroke="#713F12" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),

  jari: () => (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cute waving open hand */}
      <path d="M 36 90 L 36 68 
               C 34 66 22 62 20 50 C 18 40 28 36 34 46 L 36 50
               L 36 32 C 36 24 44 24 44 32 L 44 48
               L 46 22 C 46 14 54 14 54 22 L 54 48
               L 56 26 C 56 18 64 18 64 26 L 64 50
               L 66 38 C 66 30 74 30 74 38 L 74 62
               C 74 80 66 90 58 90 Z" 
            fill="#FED7AA" stroke="#EA580C" strokeWidth="3.5" strokeLinejoin="round" />
      {/* Happy face in the palm */}
      <circle cx="47" cy="62" r="2.5" fill="#7C2D12" />
      <circle cx="59" cy="62" r="2.5" fill="#7C2D12" />
      <path d="M 50 70 Q 53 74 56 70" stroke="#7C2D12" strokeWidth="2" strokeLinecap="round" />
      {/* Sparkles of movement */}
      <path d="M 16 30 L 22 34" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 78 22 L 84 26" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),

  jendela: () => (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Window Frame */}
      <rect x="20" y="16" width="60" height="68" rx="6" fill="#F0FDF4" stroke="#15803D" strokeWidth="5" />
      {/* Window Glass Panes */}
      <rect x="27" y="23" width="20" height="25" rx="3" fill="#BAE6FD" />
      <rect x="53" y="23" width="20" height="25" rx="3" fill="#BAE6FD" />
      <rect x="27" y="53" width="20" height="24" rx="3" fill="#BAE6FD" />
      <rect x="53" y="53" width="20" height="24" rx="3" fill="#BAE6FD" />
      {/* Sun peeking inside */}
      <circle cx="63" cy="35" r="7" fill="#FBBF24" />
      {/* Window sill */}
      <rect x="14" y="82" width="72" height="8" rx="4" fill="#B45309" stroke="#78350F" strokeWidth="2" />
      {/* Flower pot on sill */}
      <path d="M 44 82 L 46 72 L 54 72 L 56 82 Z" fill="#F97316" stroke="#C2410C" strokeWidth="2" />
      <circle cx="50" cy="68" r="4" fill="#EC4899" />
    </svg>
  ),

  jus: () => (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Straw */}
      <path d="M 52 64 L 62 20 L 74 16" stroke="#EC4899" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Glass */}
      <path d="M 30 32 L 36 84 C 36 88 64 88 64 84 L 70 32 Z" fill="#FEF08A" stroke="#CA8A04" strokeWidth="4" />
      {/* Juice Level */}
      <path d="M 33 46 L 37 80 C 38 84 62 84 63 80 L 67 46 Z" fill="#F97316" />
      {/* Ice Cubes */}
      <rect x="42" y="52" width="9" height="9" rx="2" fill="#FFFFFF" opacity="0.6" />
      {/* Orange slice on rim */}
      <circle cx="30" cy="32" r="12" fill="#FB923C" stroke="#EA580C" strokeWidth="2.5" />
      <circle cx="30" cy="32" r="8" fill="#FDBA74" />
    </svg>
  ),

  jembatan: () => (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Water below */}
      <path d="M 10 82 Q 30 76 50 82 Q 70 88 90 82" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />
      <path d="M 15 90 Q 35 84 55 90 Q 75 96 85 90" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
      {/* Bridge Arch */}
      <path d="M 14 74 Q 50 28 86 74" stroke="#DC2626" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M 12 60 L 88 60" stroke="#B91C1C" strokeWidth="4" />
      {/* Bridge vertical cables */}
      <line x1="32" y1="48" x2="32" y2="60" stroke="#DC2626" strokeWidth="2.5" />
      <line x1="50" y1="36" x2="50" y2="60" stroke="#DC2626" strokeWidth="2.5" />
      <line x1="68" y1="48" x2="68" y2="60" stroke="#DC2626" strokeWidth="2.5" />
      {/* Red Bridge pillars */}
      <rect x="20" y="44" width="8" height="30" fill="#EF4444" />
      <rect x="72" y="44" width="8" height="30" fill="#EF4444" />
    </svg>
  ),

  // Non-J items for quiz & pop balloons
  apel: () => (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 50 30 C 40 18 20 22 20 46 C 20 74 46 86 50 86 C 54 86 80 74 80 46 C 80 22 60 18 50 30 Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="3.5" />
      <path d="M 50 30 C 50 18 56 12 60 8" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
      <path d="M 56 18 C 66 14 72 20 68 26 C 60 26 56 22 56 18 Z" fill="#22C55E" />
      {/* Face */}
      <circle cx="42" cy="50" r="3" fill="#450A0A" />
      <circle cx="58" cy="50" r="3" fill="#450A0A" />
      <path d="M 46 58 Q 50 62 54 58" stroke="#450A0A" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  bola: () => (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="36" fill="#FFFFFF" stroke="#0284C7" strokeWidth="4" />
      <path d="M 50 14 C 40 30 40 70 50 86" stroke="#0284C7" strokeWidth="3" />
      <path d="M 50 14 C 60 30 60 70 50 86" stroke="#0284C7" strokeWidth="3" />
      <line x1="14" y1="50" x2="86" y2="50" stroke="#0284C7" strokeWidth="3" />
      <circle cx="50" cy="50" r="12" fill="#38BDF8" />
    </svg>
  ),

  kucing: () => (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Ears */}
      <polygon points="26,44 32,20 46,34" fill="#F472B6" stroke="#DB2777" strokeWidth="3" />
      <polygon points="74,44 68,20 54,34" fill="#F472B6" stroke="#DB2777" strokeWidth="3" />
      {/* Head */}
      <circle cx="50" cy="54" r="30" fill="#FDF2F8" stroke="#DB2777" strokeWidth="4" />
      {/* Eyes */}
      <circle cx="40" cy="50" r="3.5" fill="#831843" />
      <circle cx="60" cy="50" r="3.5" fill="#831843" />
      {/* Nose & mouth */}
      <polygon points="48,58 52,58 50,61" fill="#F43F5E" />
      <path d="M 46 64 Q 50 67 54 64" stroke="#831843" strokeWidth="2" strokeLinecap="round" />
      {/* Whiskers */}
      <line x1="26" y1="56" x2="38" y2="58" stroke="#9D174D" strokeWidth="2" />
      <line x1="74" y1="56" x2="62" y2="58" stroke="#9D174D" strokeWidth="2" />
    </svg>
  ),

  bunga: () => (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="30" r="14" fill="#FB7185" />
      <circle cx="70" cy="50" r="14" fill="#FB7185" />
      <circle cx="50" cy="70" r="14" fill="#FB7185" />
      <circle cx="30" cy="50" r="14" fill="#FB7185" />
      <circle cx="50" cy="50" r="16" fill="#FBBF24" stroke="#D97706" strokeWidth="3" />
    </svg>
  ),

  pisang: () => (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 30 20 C 50 24 76 46 70 78 C 66 84 56 82 52 74 C 44 56 34 38 26 24 Z" fill="#FACC15" stroke="#CA8A04" strokeWidth="3.5" />
      <circle cx="56" cy="56" r="2.5" fill="#713F12" />
      <path d="M 52 64 Q 56 68 60 64" stroke="#713F12" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
};

export const vocabularyList: VocabularyItem[] = [
  {
    id: 'jeruk',
    word: 'Jeruk',
    syllables: ['Je', 'ruk'],
    meaningIndo: 'Buah bulat oranye manis dan segar',
    sentence: 'Jeruk manis kaya akan vitamin C!',
    iconType: 'jeruk',
    color: '#EA580C',
    borderColor: '#FB923C',
    lightBg: '#FFF7ED',
  },
  {
    id: 'jerapah',
    word: 'Jerapah',
    syllables: ['Je', 'ra', 'pah'],
    meaningIndo: 'Hewan berleher panjang yang ramah',
    sentence: 'Jerapah suka makan daun di pohon tinggi!',
    iconType: 'jerapah',
    color: '#D97706',
    borderColor: '#FBBF24',
    lightBg: '#FEFCE8',
  },
  {
    id: 'jam',
    word: 'Jam',
    syllables: ['Jam'],
    meaningIndo: 'Alat pengingat waktu tik-tok',
    sentence: 'Jam berbunyi tik-tok mengingatkan waktu bermain!',
    iconType: 'jam',
    color: '#2563EB',
    borderColor: '#60A5FA',
    lightBg: '#EFF6FF',
  },
  {
    id: 'jagung',
    word: 'Jagung',
    syllables: ['Ja', 'gung'],
    meaningIndo: 'Makanan bergizi berwarna kuning keemasan',
    sentence: 'Jagung manis enak direbus atau dibakar!',
    iconType: 'jagung',
    color: '#CA8A04',
    borderColor: '#FACC15',
    lightBg: '#FEF9C3',
  },
  {
    id: 'jari',
    word: 'Jari',
    syllables: ['Ja', 'ri'],
    meaningIndo: 'Sepuluh jari mungil tangan kita',
    sentence: 'Kita punya sepuluh jari untuk bertepuk tangan!',
    iconType: 'jari',
    color: '#C2410C',
    borderColor: '#FDBA74',
    lightBg: '#FFF7ED',
  },
  {
    id: 'jendela',
    word: 'Jendela',
    syllables: ['Jen', 'de', 'la'],
    meaningIndo: 'Kaca tempat udara dan sinar mentari masuk',
    sentence: 'Buka jendela di pagi hari, udaranya sejuk!',
    iconType: 'jendela',
    color: '#16A34A',
    borderColor: '#86EFAC',
    lightBg: '#F0FDF4',
  },
  {
    id: 'jus',
    word: 'Jus',
    syllables: ['Jus'],
    meaningIndo: 'Minuman buah segar dan sehat',
    sentence: 'Ayo minum jus buah agar badan kuat dan sehat!',
    iconType: 'jus',
    color: '#DB2777',
    borderColor: '#F472B6',
    lightBg: '#FDF2F8',
  },
  {
    id: 'jembatan',
    word: 'Jembatan',
    syllables: ['Jem', 'ba', 'tan'],
    meaningIndo: 'Jalan layang di atas sungai indah',
    sentence: 'Jembatan menghubungkan dua jalan seberang sungai!',
    iconType: 'jembatan',
    color: '#DC2626',
    borderColor: '#F87171',
    lightBg: '#FEF2F2',
  },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    prompt: 'Manakah benda yang berawalan huruf J?',
    options: [
      { text: 'Jeruk', isCorrect: true, iconType: 'jeruk', hint: 'Huruf J untuk Jeruk! Rasanya segar.' },
      { text: 'Apel', isCorrect: false, iconType: 'apel', hint: 'Ini Apel, berawalan huruf A!' },
      { text: 'Bola', isCorrect: false, iconType: 'bola', hint: 'Ini Bola, berawalan huruf B!' },
    ],
  },
  {
    id: 2,
    prompt: 'Hewan berleher panjang ini berawalan huruf J:',
    options: [
      { text: 'Kucing', isCorrect: false, iconType: 'kucing', hint: 'Ini Kucing, berawalan huruf K!' },
      { text: 'Jerapah', isCorrect: true, iconType: 'jerapah', hint: 'Benar! J untuk Jerapah!' },
      { text: 'Bunga', isCorrect: false, iconType: 'bunga', hint: 'Ini Bunga, berawalan huruf B!' },
    ],
  },
  {
    id: 3,
    prompt: 'Alat penunjuk waktu berawalan huruf J:',
    options: [
      { text: 'Pisang', isCorrect: false, iconType: 'pisang', hint: 'Ini Pisang, berawalan huruf P!' },
      { text: 'Jam', isCorrect: true, iconType: 'jam', hint: 'Hebat! J untuk Jam tik-tok!' },
      { text: 'Apel', isCorrect: false, iconType: 'apel', hint: 'Ini Apel, berawalan huruf A!' },
    ],
  },
  {
    id: 4,
    prompt: 'Makanan manis warna kuning berawalan huruf J:',
    options: [
      { text: 'Jagung', isCorrect: true, iconType: 'jagung', hint: 'Yum! J untuk Jagung manis!' },
      { text: 'Bola', isCorrect: false, iconType: 'bola', hint: 'Ini Bola mainan!' },
      { text: 'Kucing', isCorrect: false, iconType: 'kucing', hint: 'Kucing berbulu manis, huruf K!' },
    ],
  },
  {
    id: 5,
    prompt: 'Bagian tubuh kita untuk memegang benda, huruf J:',
    options: [
      { text: 'Bunga', isCorrect: false, iconType: 'bunga', hint: 'Ini Bunga di taman!' },
      { text: 'Jari', isCorrect: true, iconType: 'jari', hint: 'Pintar! J untuk Jari tangan!' },
      { text: 'Pisang', isCorrect: false, iconType: 'pisang', hint: 'Ini buah pisang!' },
    ],
  },
];

export const initialStickers: StickerReward[] = [
  { id: 'stiker_jeruk', name: 'Jeruk Ceria', description: 'Bintang pertama mengenal huruf J', icon: '🍊', unlocked: true },
  { id: 'stiker_jerapah', name: 'Jerapah Sahabat', description: 'Sahabat berleher panjang', icon: '🦒', unlocked: false },
  { id: 'stiker_jam', name: 'Jam Ajaib', description: 'Selalu tepat waktu', icon: '⏰', unlocked: false },
  { id: 'stiker_jagung', name: 'Jagung Manis', description: 'Lezat dan bergizi', icon: '🌽', unlocked: false },
  { id: 'stiker_bintang', name: 'Bintang Juara', description: 'Menyelesaikan teka-teki', icon: '⭐', unlocked: false },
  { id: 'stiker_mahkota', name: 'Mahkota Raja J', description: 'Ahli huruf J sejati!', icon: '👑', unlocked: false },
];
