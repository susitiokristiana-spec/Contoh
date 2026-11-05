import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw, Trophy } from 'lucide-react';
import { sounds } from '../../services/soundEffects';

interface BalloonItem {
  id: number;
  text: string;
  isJ: boolean;
  color: string;
  x: number; // percentage across container
  y: number; // percentage from top
  speed: number;
  size: number;
  popped: boolean;
}

interface BalloonPopModeProps {
  onEarnStar: () => void;
}

const BALLOON_COLORS = [
  'bg-amber-400 border-amber-500 text-amber-950',
  'bg-orange-400 border-orange-500 text-orange-950',
  'bg-emerald-400 border-emerald-500 text-emerald-950',
  'bg-sky-400 border-sky-500 text-sky-950',
  'bg-rose-400 border-rose-500 text-rose-950',
  'bg-violet-400 border-violet-500 text-violet-950',
];

const J_ITEMS = [
  { text: 'J', isJ: true },
  { text: 'j', isJ: true },
  { text: '🍊 Jeruk', isJ: true },
  { text: '🦒 Jerapah', isJ: true },
  { text: '⏰ Jam', isJ: true },
  { text: '🌽 Jagung', isJ: true },
  { text: '🖐️ Jari', isJ: true },
];

const NON_J_ITEMS = [
  { text: 'A', isJ: false },
  { text: 'B', isJ: false },
  { text: 'K', isJ: false },
  { text: '🍎 Apel', isJ: false },
  { text: '⚽ Bola', isJ: false },
  { text: '🐱 Kucing', isJ: false },
];

export const BalloonPopMode: React.FC<BalloonPopModeProps> = ({ onEarnStar }) => {
  const [balloons, setBalloons] = useState<BalloonItem[]>([]);
  const [score, setScore] = useState(0);
  const targetScore = 8;
  const [hasWon, setHasWon] = useState(false);

  // Initialize random balloons
  const spawnBalloons = () => {
    const newBalloons: BalloonItem[] = [];
    // Ensure at least 5 J items and 3 distractors
    const pool = [
      ...J_ITEMS,
      ...J_ITEMS.slice(0, 3),
      ...NON_J_ITEMS.slice(0, 4),
    ];

    pool.forEach((item, index) => {
      newBalloons.push({
        id: Date.now() + index,
        text: item.text,
        isJ: item.isJ,
        color: BALLOON_COLORS[index % BALLOON_COLORS.length],
        x: 10 + (index % 4) * 22 + Math.floor(Math.random() * 8),
        y: 20 + Math.floor(index / 4) * 26 + Math.floor(Math.random() * 8),
        speed: 1 + Math.random() * 0.5,
        size: 80 + Math.floor(Math.random() * 20),
        popped: false,
      });
    });

    setBalloons(newBalloons);
    setScore(0);
    setHasWon(false);
  };

  useEffect(() => {
    spawnBalloons();
    sounds.speak("Ayo pecahkan balon huruf J dan benda yang berawalan J!");
  }, []);

  const handlePop = (balloon: BalloonItem) => {
    if (balloon.popped) return;

    if (balloon.isJ) {
      sounds.playPop();
      sounds.playDing();
      sounds.speak(`Hebat! ${balloon.text}!`);

      setBalloons(prev =>
        prev.map(b => (b.id === balloon.id ? { ...b, popped: true } : b))
      );

      const newScore = score + 1;
      setScore(newScore);
      onEarnStar();

      if (newScore >= targetScore && !hasWon) {
        setHasWon(true);
        sounds.playSuccess();
        sounds.speak("Horeee! Kamu berhasil memecahkan semua balon huruf J! Luar biasa!");
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    } else {
      sounds.playGentleWobble();
      sounds.speak(`Oops! Itu bukan huruf J. Ayo cari huruf J ya!`);
    }
  };

  return (
    <div className="space-y-4">
      {/* Target Progress Bar */}
      <div className="bg-white rounded-3xl p-4 border-2 border-amber-200 flex flex-wrap items-center justify-between gap-4 max-w-2xl mx-auto shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl font-black text-amber-700">
            J
          </div>
          <div>
            <div className="text-xs font-bold text-amber-800 uppercase tracking-wide">
              Misi Balon
            </div>
            <div className="text-base font-extrabold text-slate-800">
              Pecahkan Balon Huruf J: <span className="text-amber-600">{score}</span> / {targetScore}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={spawnBalloons}
          className="px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Balon Baru</span>
        </button>
      </div>

      {/* Floating Arena */}
      <div className="relative w-full h-[450px] sm:h-[500px] bg-gradient-to-b from-sky-100 via-amber-50 to-emerald-50 rounded-3xl border-3 border-amber-200 overflow-hidden shadow-inner p-4">
        {/* Sky Clouds and Sun Backdrop */}
        <div className="absolute top-4 right-8 w-16 h-16 rounded-full bg-amber-300/60 blur-xs animate-pulse" />
        <div className="absolute top-12 left-10 w-24 h-8 bg-white/70 rounded-full blur-xs" />
        <div className="absolute top-20 right-28 w-32 h-10 bg-white/70 rounded-full blur-xs" />

        {/* Victory Overlay if Won */}
        {hasWon ? (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
            <div className="w-20 h-20 rounded-full bg-amber-100 border-4 border-amber-400 flex items-center justify-center text-amber-600 mb-3 animate-bounce">
              <Trophy className="w-10 h-10" />
            </div>
            <h3 className="text-3xl font-black text-amber-900">
              Horeee! Kamu Juara!
            </h3>
            <p className="text-base font-semibold text-slate-700 mt-1 max-w-sm">
              Kamu berhasil menemukan dan memecahkan semua balon huruf J!
            </p>
            <button
              type="button"
              onClick={spawnBalloons}
              className="mt-5 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-base rounded-2xl shadow-md active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Main Lagi Bersama Jojo</span>
            </button>
          </div>
        ) : null}

        {/* Balloons */}
        {balloons.map((balloon) => {
          if (balloon.popped) return null;

          return (
            <button
              key={balloon.id}
              type="button"
              onClick={() => handlePop(balloon)}
              style={{
                left: `${balloon.x}%`,
                top: `${balloon.y}%`,
                width: `${balloon.size}px`,
                height: `${balloon.size * 1.2}px`,
              }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%] border-3 shadow-md flex flex-col items-center justify-center cursor-pointer transform hover:scale-110 active:scale-95 transition-transform animate-gentle-bounce select-none ${balloon.color}`}
            >
              {/* Balloon reflection highlight */}
              <div className="absolute top-2 left-3 w-3 h-5 rounded-full bg-white/50 rotate-[-25deg]" />

              <span className="text-base sm:text-lg font-black tracking-tight text-center px-1">
                {balloon.text}
              </span>

              {/* Balloon knot string */}
              <div className="absolute -bottom-2 w-2 h-2 rounded-full bg-amber-700/60" />
              <div className="absolute -bottom-6 w-0.5 h-4 bg-slate-400/80" />
            </button>
          );
        })}
      </div>
    </div>
  );
};
