import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw, Trophy, Sparkles } from 'lucide-react';
import { KidIllustrations } from '../../data/letterJData';
import { sounds } from '../../services/soundEffects';

interface CardItem {
  id: number;
  pairKey: string;
  type: 'letter' | 'picture';
  label: string;
  iconType?: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface MemoryModeProps {
  onEarnStar: () => void;
}

const RAW_PAIRS = [
  { key: 'jeruk', label: 'Jeruk', iconType: 'jeruk', letter: 'J' },
  { key: 'jerapah', label: 'Jerapah', iconType: 'jerapah', letter: 'J' },
  { key: 'jam', label: 'Jam', iconType: 'jam', letter: 'j' },
  { key: 'jagung', label: 'Jagung', iconType: 'jagung', letter: 'j' },
];

export const MemoryMode: React.FC<MemoryModeProps> = ({ onEarnStar }) => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  const initGame = () => {
    const deck: CardItem[] = [];
    let idCounter = 1;

    RAW_PAIRS.forEach((item) => {
      // Card A: The Letter
      deck.push({
        id: idCounter++,
        pairKey: item.key,
        type: 'letter',
        label: item.letter,
        isFlipped: false,
        isMatched: false,
      });

      // Card B: The Picture
      deck.push({
        id: idCounter++,
        pairKey: item.key,
        type: 'picture',
        label: item.label,
        iconType: item.iconType,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Fisher-Yates shuffle
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    setCards(deck);
    setFlippedIndices([]);
    setIsChecking(false);
    setHasWon(false);
  };

  useEffect(() => {
    initGame();
    sounds.speak("Ayo temukan pasangan huruf J dengan gambarnya!");
  }, []);

  const handleCardClick = (idx: number) => {
    if (isChecking) return;
    if (cards[idx].isFlipped || cards[idx].isMatched) return;

    sounds.playCardFlip();

    const newCards = [...cards];
    newCards[idx].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, idx];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setIsChecking(true);
      const [firstIdx, secondIdx] = newFlipped;
      const firstCard = newCards[firstIdx];
      const secondCard = newCards[secondIdx];

      if (firstCard.pairKey === secondCard.pairKey) {
        // MATCH!
        setTimeout(() => {
          sounds.playSuccess();
          sounds.speak(`Cocok! Huruf J dan ${firstCard.pairKey}!`);
          onEarnStar();

          setCards((prev) => {
            const updated = prev.map((c, i) =>
              i === firstIdx || i === secondIdx ? { ...c, isMatched: true } : c
            );

            // Check if all matched
            if (updated.every((c) => c.isMatched)) {
              setHasWon(true);
              sounds.playSuccess();
              sounds.speak("Horeee! Semua kartu berhasil dipasangkan!");
              confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.6 },
              });
            }

            return updated;
          });

          setFlippedIndices([]);
          setIsChecking(false);
        }, 500);
      } else {
        // NO MATCH
        setTimeout(() => {
          sounds.playGentleWobble();
          setCards((prev) =>
            prev.map((c, i) =>
              i === firstIdx || i === secondIdx ? { ...c, isFlipped: false } : c
            )
          );
          setFlippedIndices([]);
          setIsChecking(false);
        }, 1100);
      }
    }
  };

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      {/* Top Controls */}
      <div className="bg-white rounded-3xl p-4 border-2 border-amber-200 flex items-center justify-between gap-3 shadow-xs">
        <div>
          <div className="text-xs font-bold text-amber-800 uppercase tracking-wide">
            Permainan Ingatan
          </div>
          <div className="text-base font-black text-slate-800">
            Cocokkan Huruf J & Gambarnya!
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            sounds.playBoing();
            initGame();
          }}
          className="px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Kocok Ulang</span>
        </button>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {cards.map((card, idx) => {
          const isOpen = card.isFlipped || card.isMatched;
          const Illustration = card.iconType ? KidIllustrations[card.iconType] : null;

          return (
            <button
              key={card.id}
              type="button"
              onClick={() => handleCardClick(idx)}
              disabled={isOpen}
              className={`h-36 sm:h-40 rounded-3xl border-4 transition-all duration-300 transform active:scale-95 cursor-pointer shadow-sm relative flex flex-col items-center justify-center p-3 select-none ${
                isOpen
                  ? card.isMatched
                    ? 'bg-amber-50 border-amber-400 ring-4 ring-amber-200 scale-98'
                    : 'bg-white border-orange-400 ring-2 ring-orange-200'
                  : 'bg-gradient-to-br from-amber-400 to-orange-400 border-amber-500 hover:scale-102 hover:shadow-md'
              }`}
            >
              {isOpen ? (
                card.type === 'letter' ? (
                  <div className="flex flex-col items-center">
                    <span className="text-6xl font-black text-amber-600 leading-none">
                      {card.label}
                    </span>
                    <span className="text-xs font-extrabold text-amber-900 mt-2">
                      Huruf J
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center w-full h-full justify-between">
                    <div className="w-20 h-20 my-auto">
                      {Illustration ? <Illustration /> : null}
                    </div>
                    <span className="text-sm font-black text-slate-800">
                      {card.label}
                    </span>
                  </div>
                )
              ) : (
                /* Card Back Pattern */
                <div className="flex flex-col items-center justify-center text-white/90">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center font-black text-2xl shadow-inner mb-1">
                    ?
                  </div>
                  <Sparkles className="w-4 h-4 text-amber-100" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Victory modal / card */}
      {hasWon && (
        <div className="bg-emerald-50 border-3 border-emerald-400 rounded-3xl p-6 text-center animate-fadeIn shadow-md">
          <Trophy className="w-12 h-12 text-emerald-600 mx-auto mb-2 animate-bounce" />
          <h3 className="text-2xl font-black text-emerald-950">
            Luar Biasa! Semua Cocok!
          </h3>
          <p className="text-sm font-semibold text-emerald-800 mt-1">
            Daya ingatmu luar biasa! Kamu sudah hafal huruf J dan gambarnya.
          </p>
          <button
            type="button"
            onClick={initGame}
            className="mt-4 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-2xl shadow-sm transition-transform active:scale-95 inline-flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Main Sekali Lagi</span>
          </button>
        </div>
      )}
    </div>
  );
};
