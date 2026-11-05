import React from 'react';
import { X, Award, Sparkles, Star, Lock } from 'lucide-react';
import { StickerReward } from '../types/game';
import { sounds } from '../services/soundEffects';

interface StickerAlbumModalProps {
  isOpen: boolean;
  onClose: () => void;
  stickers: StickerReward[];
  starsCount: number;
}

export const StickerAlbumModal: React.FC<StickerAlbumModalProps> = ({
  isOpen,
  onClose,
  stickers,
  starsCount,
}) => {
  if (!isOpen) return null;

  const handleStickerTap = (sticker: StickerReward) => {
    if (!sticker.unlocked) {
      sounds.playGentleWobble();
      sounds.speak(`Kumpulkan lebih banyak bintang untuk membuka stiker ${sticker.name}!`);
      return;
    }

    sounds.playSparkle();
    sounds.speak(`Stiker ${sticker.name}! ${sticker.description}!`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl border-4 border-amber-300 max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-3xl mb-2">
            🏆
          </div>
          <h3 className="text-2xl font-black text-amber-900">
            Buku Koleksi Stiker & Bintang
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-amber-700 mt-1">
            Sentuh stiker yang sudah terbuka untuk mendengar suaranya!
          </p>

          <div className="inline-flex items-center gap-2 mt-3 px-4 py-1.5 bg-amber-400 text-amber-950 rounded-full font-black text-sm shadow-xs">
            <Star className="w-4 h-4 fill-amber-950" />
            <span className="tabular-nums">Total Bintang: {starsCount}</span>
          </div>
        </div>

        {/* Stickers Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {stickers.map((sticker) => (
            <button
              key={sticker.id}
              type="button"
              onClick={() => handleStickerTap(sticker)}
              className={`p-4 rounded-3xl border-3 text-center transition-all transform active:scale-95 cursor-pointer relative flex flex-col items-center justify-between min-h-[140px] ${
                sticker.unlocked
                  ? 'bg-gradient-to-b from-amber-50 to-orange-50 border-amber-300 hover:scale-103 shadow-xs'
                  : 'bg-slate-100 border-dashed border-slate-300 opacity-60'
              }`}
            >
              {sticker.unlocked ? (
                <>
                  <div className="text-4xl my-auto drop-shadow-sm animate-gentle-bounce">
                    {sticker.icon}
                  </div>
                  <div>
                    <span className="text-sm font-black text-amber-950 block">
                      {sticker.name}
                    </span>
                    <span className="text-[10px] font-bold text-amber-700 block mt-0.5">
                      {sticker.description}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-10 h-10 my-auto rounded-2xl bg-slate-200 flex items-center justify-center text-slate-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-500 block">
                    Terkunci
                  </span>
                </>
              )}
            </button>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm rounded-2xl shadow-sm transition-transform active:scale-98 cursor-pointer"
          >
            Tutup & Lanjut Bermain
          </button>
        </div>
      </div>
    </div>
  );
};
