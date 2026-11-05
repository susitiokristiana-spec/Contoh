import React, { useState } from 'react';
import { Volume2, Sparkles, Heart } from 'lucide-react';
import { sounds } from '../services/soundEffects';

interface MascotJojoProps {
  message: string;
  isHappy?: boolean;
}

export const MascotJojo: React.FC<MascotJojoProps> = ({ message, isHappy = false }) => {
  const [isWiggling, setIsWiggling] = useState(false);
  const [showHeart, setShowHeart] = useState(false);

  const handleMascotClick = () => {
    setIsWiggling(true);
    setShowHeart(true);
    sounds.playBoing();
    sounds.speak("Halo teman-teman TK A! Aku Jojo si Jerapah! Ayo belajar huruf J bersamaku!");
    setTimeout(() => setIsWiggling(false), 900);
    setTimeout(() => setShowHeart(false), 1400);
  };

  const handleSpeakMessage = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playDing();
    sounds.speak(message);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 bg-white/90 backdrop-blur-sm border-2 border-amber-200/80 rounded-3xl p-3.5 shadow-sm max-w-2xl mx-auto my-2 transition-all">
      {/* Mascot Avatar */}
      <button
        type="button"
        onClick={handleMascotClick}
        title="Sentuh Jojo untuk menyapa!"
        className={`relative shrink-0 w-20 h-20 rounded-2xl bg-amber-100/80 border-2 border-amber-300 flex items-center justify-center p-1.5 cursor-pointer hover:scale-105 active:scale-95 transition-transform ${
          isWiggling ? 'animate-wiggle' : isHappy ? 'animate-gentle-bounce' : ''
        }`}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Giraffe Long Neck */}
          <path d="M 40 100 L 44 48 Q 45 36 50 36 Q 55 36 56 48 L 60 100 Z" fill="#FBBF24" stroke="#D97706" strokeWidth="3" />
          <circle cx="48" cy="65" r="4.5" fill="#B45309" />
          <circle cx="53" cy="82" r="5" fill="#B45309" />
          {/* Head */}
          <ellipse cx="50" cy="34" rx="20" ry="18" fill="#FBBF24" stroke="#D97706" strokeWidth="3.5" />
          {/* Snout */}
          <ellipse cx="50" cy="42" rx="14" ry="10" fill="#FEF08A" />
          <circle cx="45" cy="42" r="1.8" fill="#78350F" />
          <circle cx="55" cy="42" r="1.8" fill="#78350F" />
          <path d="M 46 46 Q 50 49 54 46" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
          {/* Cute Eyes with Sparkles */}
          <circle cx="42" cy="28" r="4.5" fill="#451A03" />
          <circle cx="58" cy="28" r="4.5" fill="#451A03" />
          <circle cx="43.5" cy="26.5" r="1.8" fill="#FFFFFF" />
          <circle cx="59.5" cy="26.5" r="1.8" fill="#FFFFFF" />
          {/* Cheeks */}
          <circle cx="34" cy="35" r="3.5" fill="#FB7185" opacity="0.7" />
          <circle cx="66" cy="35" r="3.5" fill="#FB7185" opacity="0.7" />
          {/* Ossicones (Horns) */}
          <path d="M 43 20 L 40 10" stroke="#D97706" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="40" cy="9" r="4" fill="#92400E" />
          <path d="M 57 20 L 60 10" stroke="#D97706" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="60" cy="9" r="4" fill="#92400E" />
          {/* Cute Ears */}
          <ellipse cx="28" cy="24" rx="7" ry="4" transform="rotate(-30 28 24)" fill="#FBBF24" stroke="#D97706" strokeWidth="2.5" />
          <ellipse cx="72" cy="24" rx="7" ry="4" transform="rotate(30 72 24)" fill="#FBBF24" stroke="#D97706" strokeWidth="2.5" />
        </svg>

        {showHeart && (
          <div className="absolute -top-3 -right-2 text-rose-500 animate-bounce">
            <Heart className="w-6 h-6 fill-rose-500" />
          </div>
        )}
      </button>

      {/* Speech Bubble */}
      <div className="flex-1 flex items-center justify-between gap-3 text-left w-full sm:w-auto">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 tracking-wide uppercase">
            <span>Jojo si Jerapah</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <p className="text-base sm:text-lg font-semibold text-slate-800 leading-snug">
            {message}
          </p>
        </div>

        <button
          type="button"
          onClick={handleSpeakMessage}
          className="shrink-0 p-2.5 rounded-2xl bg-amber-500 text-white hover:bg-amber-600 active:scale-95 transition-all shadow-sm flex items-center gap-1.5 font-bold text-xs cursor-pointer"
          title="Dengar suara Jojo"
        >
          <Volume2 className="w-5 h-5" />
          <span className="hidden md:inline">Dengar</span>
        </button>
      </div>
    </div>
  );
};
