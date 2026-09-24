import React, { useEffect, useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { CelebrationParticles } from './CelebrationParticles';
import { ExternalLink, CheckCircle2 } from 'lucide-react';

interface GradorraRevealProps {
  onRedirect: () => void;
}

export const GradorraReveal: React.FC<GradorraRevealProps> = ({ onRedirect }) => {
  const [showCelebration, setShowCelebration] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(8); // 8-second celebration duration

  useEffect(() => {
    // Activate celebratory particles as Gradorra is unveiled
    const celebTimer = setTimeout(() => {
      setShowCelebration(true);
    }, 300);

    // 8-second celebration countdown before automatic redirection to https://gpet.org.in/
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onRedirect();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(celebTimer);
      clearInterval(interval);
    };
  }, [onRedirect]);

  return (
    <div className="relative z-30 flex flex-col items-center justify-center min-h-[65vh] sm:min-h-[70vh] px-4 py-6 text-center animate-in fade-in zoom-in-95 duration-1000 w-full max-w-2xl mx-auto">
      {showCelebration && <CelebrationParticles durationMs={8000} />}

      {/* Central Radiant Glow Behind Logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-tr from-blue-600/20 via-amber-500/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />

      {/* Status Pill / Live Notification */}
      <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-5 sm:mb-6 shadow-sm">
        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        <span>GPET 2026 is Now Live</span>
      </div>

      {/* Prominent Gradorra Identity */}
      <div className="relative transform hover:scale-105 transition-transform duration-500">
        <BrandLogo size="hero" showWordmark={false} />
      </div>

      <div className="mt-4 sm:mt-6">
        <h1
          className="text-3xl min-[380px]:text-4xl sm:text-6xl md:text-7xl font-black tracking-[0.16em] sm:tracking-[0.2em] text-white uppercase drop-shadow-[0_4px_24px_rgba(255,255,255,0.2)]"
          style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
        >
          GRADORRA
        </h1>
        
        <p className="mt-2 sm:mt-3 text-base min-[380px]:text-lg sm:text-2xl font-light tracking-[0.2em] sm:tracking-[0.3em] text-amber-300 uppercase">
          The Future Starts Now
        </p>
      </div>

      {/* Academic Descriptor */}
      <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-slate-400 max-w-md font-normal tracking-wide px-2 leading-relaxed">
        Welcome to the official Graduate & Professional Entrance Examination portal. Your scholarship gateway has officially commenced.
      </p>

      {/* 8-Second Redirect Indicator & Manual Bypass */}
      <div className="mt-8 sm:mt-10 flex flex-col items-center gap-3 w-full">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
          <span>Entering platform in</span>
          <span className="font-mono font-bold text-amber-300 text-sm sm:text-base tabular-nums bg-slate-900/90 px-2.5 py-0.5 rounded-md border border-amber-500/30 shadow-inner">
            {secondsRemaining}s
          </span>
          <span>...</span>
        </div>

        {/* Progress bar representing the 8-second celebration window */}
        <div className="w-48 sm:w-64 h-1.5 bg-slate-800/80 rounded-full overflow-hidden border border-slate-700/50 mt-1">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-blue-500 transition-all duration-1000 ease-linear rounded-full"
            style={{ width: `${((8 - secondsRemaining) / 8) * 100}%` }}
          />
        </div>

        <button
          onClick={onRedirect}
          className="mt-3 inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600/30 to-blue-500/20 hover:from-blue-600/40 hover:to-blue-500/30 border border-blue-500/40 text-blue-200 hover:text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-sm group active:scale-95"
        >
          <span>Proceed to GPET.ORG.IN</span>
          <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
