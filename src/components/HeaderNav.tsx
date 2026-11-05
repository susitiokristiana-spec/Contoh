import React from 'react';
import { Volume2, VolumeX, Sparkles, Award } from 'lucide-react';
import { GameMode } from '../types/game';
import { sounds } from '../services/soundEffects';

interface HeaderNavProps {
  currentMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
  starsCount: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenStickers: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentMode,
  onSelectMode,
  starsCount,
  isMuted,
  onToggleMute,
  onOpenStickers,
}) => {
  const modes: { id: GameMode; label: string; icon: string }[] = [
    { id: 'explore', label: 'Kenal Huruf J', icon: '🔤' },
    { id: 'balloons', label: 'Tangkap Balon', icon: '🎈' },
    { id: 'tracing', label: 'Tulis Huruf', icon: '✍️' },
    { id: 'quiz', label: 'Tebak Gambar', icon: '🧩' },
    { id: 'memory', label: 'Cocok Kartu', icon: '🃏' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/80 px-4 sm:px-6 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Single text wordmark */}
        <button
          type="button"
          onClick={() => onSelectMode('explore')}
          className="text-xl sm:text-2xl font-black text-amber-700 tracking-tight flex items-center gap-2 hover:opacity-90 transition-opacity whitespace-nowrap shrink-0 text-left cursor-pointer"
        >
          <span className="w-9 h-9 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-extrabold text-xl shadow-sm">
            J
          </span>
          <span>Petualangan Huruf J</span>
        </button>

        {/* Zone 2: Navigation links for game modes */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1 bg-amber-100/60 rounded-2xl">
          {modes.map((mode) => {
            const isActive = currentMode === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => {
                  sounds.playBoing();
                  onSelectMode(mode.id);
                }}
                className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-white shadow-sm scale-102'
                    : 'text-amber-900/80 hover:text-amber-950 hover:bg-amber-200/50'
                }`}
              >
                <span>{mode.icon}</span>
                <span>{mode.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action cluster (Stars & Sound controls) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Sticker Album button */}
          <button
            type="button"
            onClick={() => {
              sounds.playSparkle();
              onOpenStickers();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-sm rounded-2xl shadow-sm transition-transform active:scale-95 cursor-pointer"
            title="Buka Koleksi Stiker & Bintang"
          >
            <Award className="w-4 h-4 text-amber-950" />
            <span className="tabular-nums">{starsCount}</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-900" />
          </button>

          {/* Sound toggle button */}
          <button
            type="button"
            onClick={onToggleMute}
            className={`p-2 rounded-2xl border-2 transition-all cursor-pointer ${
              isMuted
                ? 'bg-slate-100 border-slate-300 text-slate-500'
                : 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100'
            }`}
            title={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Mode Switcher Scrollbar for touch friendliness */}
      <div className="flex lg:hidden overflow-x-auto gap-2 pt-2.5 pb-0.5 no-scrollbar">
        {modes.map((mode) => {
          const isActive = currentMode === mode.id;
          return (
            <button
              key={mode.id}
              type="button"
              onClick={() => {
                sounds.playBoing();
                onSelectMode(mode.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 flex items-center gap-1 transition-all ${
                isActive
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-amber-100/70 text-amber-900 hover:bg-amber-200'
              }`}
            >
              <span>{mode.icon}</span>
              <span>{mode.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
