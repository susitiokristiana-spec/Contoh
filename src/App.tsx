import React, { useState, useEffect } from 'react';
import { GameMode, StickerReward } from './types/game';
import { initialStickers } from './data/letterJData';
import { sounds } from './services/soundEffects';
import { HeaderNav } from './components/HeaderNav';
import { MascotJojo } from './components/MascotJojo';
import { ExploreMode } from './components/modes/ExploreMode';
import { BalloonPopMode } from './components/modes/BalloonPopMode';
import { TracingMode } from './components/modes/TracingMode';
import { QuizMode } from './components/modes/QuizMode';
import { MemoryMode } from './components/modes/MemoryMode';
import { StickerAlbumModal } from './components/StickerAlbumModal';
import { Heart, Sparkles, BookOpen } from 'lucide-react';

export default function App() {
  const [currentMode, setCurrentMode] = useState<GameMode>('explore');
  const [starsCount, setStarsCount] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [stickers, setStickers] = useState<StickerReward[]>(initialStickers);
  const [isStickersOpen, setIsStickersOpen] = useState<boolean>(false);
  const [mascotHappy, setMascotHappy] = useState<boolean>(false);

  // Toggle Mute
  const handleToggleMute = () => {
    sounds.isMuted = !isMuted;
    setIsMuted(!isMuted);
    if (isMuted) {
      sounds.playDing();
    }
  };

  // Earning Stars & Unlocking Stickers
  const handleEarnStar = () => {
    setStarsCount((prev) => {
      const next = prev + 1;
      setMascotHappy(true);
      setTimeout(() => setMascotHappy(false), 2000);

      // Check sticker unlock thresholds
      setStickers((prevStickers) =>
        prevStickers.map((s, index) => {
          const threshold = index * 3; // 0, 3, 6, 9, 12, 15
          if (next >= threshold) {
            return { ...s, unlocked: true };
          }
          return s;
        })
      );

      return next;
    });
  };

  // Mascot dynamic messages based on current mode
  const getMascotMessage = () => {
    switch (currentMode) {
      case 'explore':
        return 'Halo sahabat kecil! Sentuh huruf J dan gambar-gambar seru untuk mendengar bunyinya!';
      case 'balloons':
        return 'Ayo tangkap dan pecahkan balon yang berisi huruf J dan benda huruf J!';
      case 'tracing':
        return 'Ayo ikuti titik-titik indah untuk menulis huruf J bersama Jojo!';
      case 'quiz':
        return 'Bisakah kamu menebak mana benda yang berawalan huruf J?';
      case 'memory':
        return 'Ayo cocokkan kartu huruf J dengan gambarnya yang tepat!';
      default:
        return 'Ayo belajar dan bermain huruf J!';
    }
  };

  // Initial welcome voice
  useEffect(() => {
    const timer = setTimeout(() => {
      sounds.speak('Selamat datang di Petualangan Huruf J bersama Jojo si Jerapah!');
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50/70 via-orange-50/40 to-amber-50/70 text-slate-800">
      {/* Top Bar Header */}
      <HeaderNav
        currentMode={currentMode}
        onSelectMode={setCurrentMode}
        starsCount={starsCount}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenStickers={() => setIsStickersOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-4">
        {/* Adorable Mascot Jojo Banner */}
        <MascotJojo message={getMascotMessage()} isHappy={mascotHappy} />

        {/* Dynamic Mode Screen */}
        <div className="bg-white/80 backdrop-blur-xs border-2 border-amber-200/90 rounded-3xl p-4 sm:p-6 shadow-sm">
          {currentMode === 'explore' && <ExploreMode onEarnStar={handleEarnStar} />}
          {currentMode === 'balloons' && <BalloonPopMode onEarnStar={handleEarnStar} />}
          {currentMode === 'tracing' && <TracingMode onEarnStar={handleEarnStar} />}
          {currentMode === 'quiz' && <QuizMode onEarnStar={handleEarnStar} />}
          {currentMode === 'memory' && <MemoryMode onEarnStar={handleEarnStar} />}
        </div>
      </main>

      {/* Clean Kindergarten Educational Footer */}
      <footer className="border-t border-amber-200/80 bg-white/70 py-4 px-4 text-center text-xs font-bold text-amber-900/80">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-amber-600" />
            <span>Materi Pengenalan Huruf J TK A · Kurikulum Merdeka PAUD</span>
          </div>
          <div className="flex items-center gap-1 text-slate-500">
            <span>Dibuat dengan</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>untuk anak-anak Indonesia yang ceria & pintar</span>
          </div>
        </div>
      </footer>

      {/* Sticker Album Modal */}
      <StickerAlbumModal
        isOpen={isStickersOpen}
        onClose={() => setIsStickersOpen(false)}
        stickers={stickers}
        starsCount={starsCount}
      />
    </div>
  );
}
