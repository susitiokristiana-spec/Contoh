import React, { useState } from 'react';
import { Volume2, Sparkles, Music } from 'lucide-react';
import { vocabularyList, KidIllustrations } from '../../data/letterJData';
import { VocabularyItem } from '../../types/game';
import { sounds } from '../../services/soundEffects';

interface ExploreModeProps {
  onEarnStar: () => void;
}

export const ExploreMode: React.FC<ExploreModeProps> = ({ onEarnStar }) => {
  const [selectedLetter, setSelectedLetter] = useState<'upper' | 'lower'>('upper');
  const [activeWordId, setActiveWordId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'alphabet' | 'words'>('alphabet');
  const [hasPlayedChant, setHasPlayedChant] = useState(false);

  const handleLetterClick = (type: 'upper' | 'lower') => {
    setSelectedLetter(type);
    sounds.playBoing();
    if (type === 'upper') {
      sounds.speak("Ini huruf J kapital! Huruf J besar, tegak melengkung ke kiri. Bunyinya: Je! Je! Je!");
    } else {
      sounds.speak("Ini huruf j kecil! Ada titik lucu di atasnya seperti buah jeruk kecil! Bunyinya: Je! Je!");
    }
  };

  const handleWordClick = (item: VocabularyItem) => {
    setActiveWordId(item.id);
    sounds.playDing();
    const syllableSpoken = item.syllables.join('... ');
    sounds.speak(`Huruf J untuk ${item.word}! ${syllableSpoken}! ${item.sentence}`);
    onEarnStar();
  };

  const handlePlayChant = () => {
    sounds.playSparkle();
    sounds.speak("Ayo bernyanyi bersama Jojo! J... J... J... Jerapah makan jagung, Jeruk manis rasanya segar, Jam dinding berdetik riang!");
    if (!hasPlayedChant) {
      setHasPlayedChant(true);
      onEarnStar();
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Switcher: Bentuk Huruf vs Kosakata */}
      <div className="flex items-center justify-center gap-2 max-w-md mx-auto p-1 bg-amber-100/70 rounded-2xl">
        <button
          type="button"
          onClick={() => {
            sounds.playBoing();
            setActiveTab('alphabet');
          }}
          className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-extrabold transition-all cursor-pointer ${
            activeTab === 'alphabet'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'text-amber-900/80 hover:bg-amber-200/50'
          }`}
        >
          🔤 Bentuk Huruf J
        </button>
        <button
          type="button"
          onClick={() => {
            sounds.playBoing();
            setActiveTab('words');
          }}
          className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-extrabold transition-all cursor-pointer ${
            activeTab === 'words'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'text-amber-900/80 hover:bg-amber-200/50'
          }`}
        >
          🍎 Kata Berawalan J
        </button>
      </div>

      {activeTab === 'alphabet' ? (
        <div className="space-y-6">
          {/* Big Interactive Letters: Uppercase & Lowercase */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
            {/* J Besar */}
            <button
              type="button"
              onClick={() => handleLetterClick('upper')}
              className={`group relative p-6 rounded-3xl border-4 text-center transition-all transform active:scale-95 cursor-pointer shadow-sm ${
                selectedLetter === 'upper'
                  ? 'bg-gradient-to-b from-amber-50 to-orange-50 border-orange-400 ring-4 ring-orange-200 scale-102'
                  : 'bg-white border-amber-200 hover:border-amber-300'
              }`}
            >
              <div className="text-8xl sm:text-9xl font-black text-amber-500 drop-shadow-md group-hover:scale-105 transition-transform leading-none py-2 select-none">
                J
              </div>
              <div className="mt-2 text-xl font-extrabold text-amber-900">
                Huruf J Besar (Kapital)
              </div>
              <p className="text-xs font-semibold text-amber-700/80 mt-1">
                Sentuh untuk dengar bunyi fonik
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 text-white font-bold text-xs rounded-xl shadow-xs">
                <Volume2 className="w-4 h-4" />
                <span>Bunyi: "Je"</span>
              </div>
            </button>

            {/* j Kecil */}
            <button
              type="button"
              onClick={() => handleLetterClick('lower')}
              className={`group relative p-6 rounded-3xl border-4 text-center transition-all transform active:scale-95 cursor-pointer shadow-sm ${
                selectedLetter === 'lower'
                  ? 'bg-gradient-to-b from-amber-50 to-orange-50 border-orange-400 ring-4 ring-orange-200 scale-102'
                  : 'bg-white border-amber-200 hover:border-amber-300'
              }`}
            >
              <div className="text-8xl sm:text-9xl font-black text-amber-500 drop-shadow-md group-hover:scale-105 transition-transform leading-none py-2 select-none">
                j
              </div>
              <div className="mt-2 text-xl font-extrabold text-amber-900">
                Huruf j Kecil
              </div>
              <p className="text-xs font-semibold text-amber-700/80 mt-1">
                Ada titik manis di atasnya!
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 text-white font-bold text-xs rounded-xl shadow-xs">
                <Volume2 className="w-4 h-4" />
                <span>Bunyi: "Je"</span>
              </div>
            </button>
          </div>

          {/* Interactive Phonics Rhyme Card */}
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-3xl p-5 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0">
                <Music className="w-6 h-6 text-white animate-bounce" />
              </div>
              <div>
                <h3 className="text-lg font-black">Lagu Fonik Huruf J</h3>
                <p className="text-sm font-semibold text-amber-100">
                  "J... J... J... Jerapah makan Jagung manis!"
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handlePlayChant}
              className="shrink-0 px-4 py-2.5 bg-white text-amber-800 hover:bg-amber-50 active:scale-95 transition-all font-extrabold text-sm rounded-2xl shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-amber-600" />
              <span>Putar Lagu</span>
            </button>
          </div>
        </div>
      ) : (
        /* Vocabulary Grid */
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-black text-amber-900">
              Koleksi Benda Huruf J
            </h2>
            <p className="text-sm font-semibold text-amber-700 mt-1">
              Sentuh setiap kartu untuk mendengar suara dan suku katanya!
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {vocabularyList.map((item) => {
              const Illustration = KidIllustrations[item.iconType];
              const isSelected = activeWordId === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleWordClick(item)}
                  className={`p-4 rounded-3xl border-3 text-center transition-all transform active:scale-95 cursor-pointer shadow-xs hover:shadow-sm ${
                    isSelected
                      ? 'border-orange-500 bg-orange-50/90 ring-4 ring-orange-200 scale-103'
                      : 'border-amber-200/90 bg-white hover:border-amber-300'
                  }`}
                  style={{ backgroundColor: isSelected ? item.lightBg : '#FFFFFF' }}
                >
                  <div className="w-24 h-24 mx-auto mb-2 p-1">
                    {Illustration ? <Illustration /> : null}
                  </div>

                  <div className="text-xl font-black text-slate-800 tracking-wide">
                    <span className="text-amber-600 font-extrabold">J</span>
                    {item.word.slice(1)}
                  </div>

                  {/* Syllables Pills */}
                  <div className="flex items-center justify-center gap-1 mt-1 text-xs font-bold text-slate-600">
                    {item.syllables.map((syl, idx) => (
                      <React.Fragment key={idx}>
                        <span className={idx === 0 ? 'text-amber-600 font-black' : ''}>
                          {syl}
                        </span>
                        {idx < item.syllables.length - 1 && <span>-</span>}
                      </React.Fragment>
                    ))}
                  </div>

                  <div className="mt-2.5 flex items-center justify-center gap-1 text-[11px] font-bold text-amber-800/80 bg-amber-100/70 py-1 px-2 rounded-lg">
                    <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>Dengar</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
