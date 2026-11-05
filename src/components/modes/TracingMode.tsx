import React, { useState, useRef, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw, Play, CheckCircle2, Volume2, Sparkles } from 'lucide-react';
import { sounds } from '../../services/soundEffects';

interface TracingModeProps {
  onEarnStar: () => void;
}

export const TracingMode: React.FC<TracingModeProps> = ({ onEarnStar }) => {
  const [letterType, setLetterType] = useState<'upper' | 'lower'>('upper');
  const [strokeColor, setStrokeColor] = useState('#F97316'); // Orange marker
  const [isDemoRunning, setIsDemoRunning] = useState(false);
  const [demoProgress, setDemoProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const pointsDrawnRef = useRef<number>(0);

  // Initialize Canvas
  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pointsDrawnRef.current = 0;
    setCompleted(false);
  }, []);

  useEffect(() => {
    clearCanvas();
    if (letterType === 'upper') {
      sounds.speak("Ayo tulis huruf J besar! Tarik garis dari atas lurus ke bawah, lalu lengkungkan ke kiri seperti gagang payung!");
    } else {
      sounds.speak("Ayo tulis huruf j kecil! Tarik garis melengkung ke kiri, lalu beri titik di atasnya!");
    }
  }, [letterType, clearCanvas]);

  // Handle Demo Animation
  const runDemoAnimation = () => {
    if (isDemoRunning) return;
    setIsDemoRunning(true);
    setDemoProgress(0);
    sounds.playBoing();
    sounds.speak("Perhatikan contoh Jojo ya!");

    let p = 0;
    const interval = setInterval(() => {
      p += 0.04;
      if (p >= 1) {
        clearInterval(interval);
        setIsDemoRunning(false);
        setDemoProgress(1);
        sounds.playSparkle();
        sounds.speak("Sekarang giliranmu mencoba!");
      } else {
        setDemoProgress(p);
      }
    }, 40);
  };

  // Drawing Handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = true;
    sounds.playPop();
    draw(e);
  };

  const stopDrawing = () => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;

    // Check if enough strokes were drawn to count as completed
    if (pointsDrawnRef.current > 25 && !completed) {
      setCompleted(true);
      sounds.playSuccess();
      sounds.speak("Wah hebat sekali! Tulisan huruf J kamu sangat rapi dan indah!");
      onEarnStar();
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ('touches' in e) {
      if (e.touches.length === 0) return;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.fillStyle = strokeColor;
    ctx.beginPath();
    ctx.arc(x, y, 14, 0, Math.PI * 2);
    ctx.fill();

    pointsDrawnRef.current += 1;
  };

  // Compute demo hand position along J path
  // Standard J path: top (160, 50) -> down to (160, 240) -> curve to (90, 270) -> hook to (60, 230)
  const getDemoUpperCoord = (prog: number) => {
    if (prog < 0.65) {
      const local = prog / 0.65;
      return { x: 180, y: 60 + local * 180 };
    } else {
      const local = (prog - 0.65) / 0.35;
      const angle = Math.PI * 0.5 + local * Math.PI * 0.7;
      return {
        x: 120 + Math.cos(angle) * 60,
        y: 240 + Math.sin(angle) * 45,
      };
    }
  };

  const demoCoord = getDemoUpperCoord(demoProgress);

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      {/* Top Controls: Switch between J and j, Color picker, Demo */}
      <div className="bg-white rounded-3xl p-4 border-2 border-amber-200 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        {/* Letter Type Picker */}
        <div className="flex items-center gap-1.5 p-1 bg-amber-100/70 rounded-2xl">
          <button
            type="button"
            onClick={() => setLetterType('upper')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              letterType === 'upper'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-amber-900 hover:bg-amber-200/50'
            }`}
          >
            Huruf J Besar
          </button>
          <button
            type="button"
            onClick={() => setLetterType('lower')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              letterType === 'lower'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-amber-900 hover:bg-amber-200/50'
            }`}
          >
            Huruf j Kecil
          </button>
        </div>

        {/* Color Palette for Kids */}
        <div className="flex items-center gap-2">
          {['#F97316', '#EC4899', '#3B82F6', '#10B981', '#8B5CF6'].map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => {
                setStrokeColor(color);
                sounds.playPop();
              }}
              style={{ backgroundColor: color }}
              className={`w-7 h-7 rounded-full transition-transform cursor-pointer ${
                strokeColor === color ? 'scale-125 ring-3 ring-amber-300' : 'hover:scale-110'
              }`}
              title="Ganti Warna Crayon"
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={runDemoAnimation}
            disabled={isDemoRunning}
            className="px-3.5 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-amber-900" />
            <span>Contoh</span>
          </button>
          <button
            type="button"
            onClick={clearCanvas}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Hapus</span>
          </button>
        </div>
      </div>

      {/* Interactive Tracing Blackboard Canvas */}
      <div className="relative w-full h-[420px] bg-amber-50/50 rounded-3xl border-4 border-dashed border-amber-300 overflow-hidden flex items-center justify-center shadow-inner">
        {/* Background Letter Guide / Dotted Path */}
        <svg viewBox="0 0 320 360" className="absolute inset-0 w-full h-full pointer-events-none">
          {letterType === 'upper' ? (
            <>
              {/* Optional top hat */}
              <line
                x1="120"
                y1="50"
                x2="240"
                y2="50"
                stroke="#FCD34D"
                strokeWidth="24"
                strokeLinecap="round"
                opacity="0.4"
              />
              <line
                x1="120"
                y1="50"
                x2="240"
                y2="50"
                stroke="#D97706"
                strokeWidth="4"
                strokeDasharray="8 8"
                strokeLinecap="round"
              />

              {/* Main J Hook Guide */}
              <path
                d="M 180 50 L 180 240 C 180 295 120 295 90 260 C 75 240 70 215 70 215"
                stroke="#FCD34D"
                strokeWidth="38"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                opacity="0.5"
              />
              <path
                d="M 180 50 L 180 240 C 180 295 120 295 90 260 C 75 240 70 215 70 215"
                stroke="#B45309"
                strokeWidth="4"
                strokeDasharray="10 8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />

              {/* Step 1 Start Marker */}
              <circle cx="180" cy="50" r="14" fill="#22C55E" />
              <text x="180" y="55" textAnchor="middle" fill="#FFFFFF" fontWeight="900" fontSize="14">
                1
              </text>

              {/* Step 2 Downward Arrow Marker */}
              <circle cx="180" cy="150" r="12" fill="#3B82F6" />
              <text x="180" y="155" textAnchor="middle" fill="#FFFFFF" fontWeight="900" fontSize="13">
                ↓
              </text>

              {/* Step 3 Curve Marker */}
              <circle cx="70" cy="215" r="14" fill="#F97316" />
              <text x="70" y="220" textAnchor="middle" fill="#FFFFFF" fontWeight="900" fontSize="14">
                2
              </text>
            </>
          ) : (
            <>
              {/* Lowercase j Dot on top */}
              <circle cx="180" cy="65" r="18" fill="#FCD34D" opacity="0.6" />
              <circle cx="180" cy="65" r="18" stroke="#B45309" strokeWidth="3" strokeDasharray="6 4" fill="none" />
              <circle cx="180" cy="65" r="12" fill="#EF4444" />
              <text x="180" y="70" textAnchor="middle" fill="#FFFFFF" fontWeight="900" fontSize="13">
                ★
              </text>

              {/* Lowercase j Stem and Hook */}
              <path
                d="M 180 110 L 180 260 C 180 320 120 320 90 280 C 75 260 70 240 70 240"
                stroke="#FCD34D"
                strokeWidth="34"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                opacity="0.5"
              />
              <path
                d="M 180 110 L 180 260 C 180 320 120 320 90 280 C 75 260 70 240 70 240"
                stroke="#B45309"
                strokeWidth="4"
                strokeDasharray="10 8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />

              {/* Step 1 Start */}
              <circle cx="180" cy="110" r="14" fill="#22C55E" />
              <text x="180" y="115" textAnchor="middle" fill="#FFFFFF" fontWeight="900" fontSize="14">
                1
              </text>

              {/* Step 2 Finish Hook */}
              <circle cx="70" cy="240" r="14" fill="#F97316" />
              <text x="70" y="245" textAnchor="middle" fill="#FFFFFF" fontWeight="900" fontSize="14">
                2
              </text>
            </>
          )}

          {/* Animated Demo Hand Pointer */}
          {isDemoRunning && (
            <g transform={`translate(${demoCoord.x - 16}, ${demoCoord.y - 16})`}>
              <circle cx="16" cy="16" r="18" fill="#FBBF24" opacity="0.8" className="animate-ping" />
              <circle cx="16" cy="16" r="12" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
              <text x="16" y="20" textAnchor="middle" fontSize="16">
                👆
              </text>
            </g>
          )}
        </svg>

        {/* Drawing Canvas */}
        <canvas
          ref={canvasRef}
          width={320}
          height={360}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onMouseMove={draw}
          onTouchStart={startDrawing}
          onTouchEnd={stopDrawing}
          onTouchMove={draw}
          className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
        />

        {/* Success Stamp Overlay */}
        {completed && (
          <div className="absolute top-6 right-6 bg-emerald-500 text-white px-4 py-2 rounded-2xl shadow-lg flex items-center gap-2 animate-bounce pointer-events-none">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-black text-sm">Pintar! Bintang +1</span>
          </div>
        )}
      </div>

      {/* Instruction Tip */}
      <div className="text-center text-xs sm:text-sm font-bold text-amber-800 bg-amber-100/60 p-3 rounded-2xl flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 text-amber-600" />
        <span>Gunakan jari atau mouse untuk mengikuti garis dari lingkaran hijau 1 ke oranye 2!</span>
      </div>
    </div>
  );
};
