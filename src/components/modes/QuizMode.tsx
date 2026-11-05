import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, Sparkles, CheckCircle, RotateCcw, Trophy } from 'lucide-react';
import { quizQuestions, KidIllustrations } from '../../data/letterJData';
import { sounds } from '../../services/soundEffects';

interface QuizModeProps {
  onEarnStar: () => void;
}

export const QuizMode: React.FC<QuizModeProps> = ({ onEarnStar }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const question = quizQuestions[currentIdx];

  const speakCurrentQuestion = () => {
    if (!question) return;
    sounds.playDing();
    sounds.speak(question.prompt);
  };

  useEffect(() => {
    speakCurrentQuestion();
    setSelectedOptionIdx(null);
    setIsAnsweredCorrectly(false);
  }, [currentIdx]);

  const handleOptionClick = (optionIdx: number) => {
    const option = question.options[optionIdx];
    setSelectedOptionIdx(optionIdx);

    if (option.isCorrect) {
      setIsAnsweredCorrectly(true);
      sounds.playSuccess();
      sounds.speak(`Hebat! ${option.hint}`);
      onEarnStar();
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
      });

      // Move to next question after short delay
      setTimeout(() => {
        if (currentIdx < quizQuestions.length - 1) {
          setCurrentIdx(prev => prev + 1);
        } else {
          setIsCompleted(true);
          sounds.playSuccess();
          sounds.speak("Luar biasa! Kamu berhasil menjawab semua tebak gambar huruf J!");
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.5 },
          });
        }
      }, 1600);
    } else {
      sounds.playGentleWobble();
      sounds.speak(option.hint);
    }
  };

  const restartQuiz = () => {
    setCurrentIdx(0);
    setSelectedOptionIdx(null);
    setIsAnsweredCorrectly(false);
    setIsCompleted(false);
    sounds.playBoing();
  };

  if (isCompleted) {
    return (
      <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 border-3 border-amber-300 text-center shadow-md animate-fadeIn">
        <div className="w-24 h-24 mx-auto rounded-full bg-amber-100 border-4 border-amber-400 flex items-center justify-center text-amber-600 mb-4 animate-bounce">
          <Trophy className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-black text-amber-900">
          Hebat Sekali! Kamu Lulus!
        </h2>
        <p className="text-base font-semibold text-slate-700 mt-2">
          Kamu sudah pintar mengenali semua benda yang berawalan huruf J!
        </p>

        <div className="flex items-center justify-center gap-2 my-6">
          {quizQuestions.map((_, i) => (
            <div key={i} className="w-10 h-10 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center font-black text-lg shadow-sm">
              ⭐
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={restartQuiz}
          className="px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-base rounded-2xl shadow-md active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Main Tebak Gambar Lagi</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Progress Dots */}
      <div className="flex items-center justify-between bg-white rounded-2xl p-3 border-2 border-amber-200">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-amber-800 uppercase">
            Soal {currentIdx + 1} dari {quizQuestions.length}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {quizQuestions.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all ${
                i < currentIdx
                  ? 'bg-emerald-500'
                  : i === currentIdx
                  ? 'bg-amber-500 scale-125'
                  : 'bg-amber-100'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-gradient-to-b from-amber-50 to-orange-50/50 rounded-3xl p-6 border-3 border-amber-300 text-center shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-200 text-amber-900 rounded-full text-xs font-extrabold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Tebak Benda Huruf J</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-slate-800 leading-snug max-w-lg mx-auto">
          {question.prompt}
        </h3>

        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={speakCurrentQuestion}
            className="px-4 py-2 bg-amber-500 text-white hover:bg-amber-600 rounded-2xl text-xs font-bold flex items-center gap-1.5 shadow-xs active:scale-95 transition-all cursor-pointer"
          >
            <Volume2 className="w-4 h-4" />
            <span>Ulangi Pertanyaan</span>
          </button>
        </div>
      </div>

      {/* 3 Large Picture Options */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {question.options.map((option, idx) => {
          const Illustration = KidIllustrations[option.iconType];
          const isSelected = selectedOptionIdx === idx;
          const isCorrect = isAnsweredCorrectly && option.isCorrect;

          let cardStyle = 'bg-white border-amber-200 hover:border-amber-400 hover:shadow-md';
          if (isSelected) {
            if (option.isCorrect) {
              cardStyle = 'bg-emerald-50 border-emerald-500 ring-4 ring-emerald-200 scale-103';
            } else {
              cardStyle = 'bg-rose-50 border-rose-400 ring-2 ring-rose-200 animate-wiggle';
            }
          }

          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleOptionClick(idx)}
              className={`p-6 rounded-3xl border-4 text-center transition-all transform active:scale-95 cursor-pointer shadow-sm relative group flex flex-col items-center justify-between min-h-[220px] ${cardStyle}`}
            >
              {isCorrect && (
                <div className="absolute top-3 right-3 text-emerald-600 bg-white rounded-full p-1 shadow-sm">
                  <CheckCircle className="w-6 h-6 fill-emerald-100" />
                </div>
              )}

              <div className="w-28 h-28 mx-auto my-auto p-2 group-hover:scale-105 transition-transform">
                {Illustration ? <Illustration /> : null}
              </div>

              <div className="w-full pt-2 border-t border-amber-100">
                <span className="text-xl font-black text-slate-800 block">
                  {option.text}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
