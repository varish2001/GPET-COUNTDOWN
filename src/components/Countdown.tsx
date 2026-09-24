import React from 'react';
import { padNumber } from '../utils/time';

interface CountdownProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Countdown: React.FC<CountdownProps> = ({
  days,
  hours,
  minutes,
  seconds,
}) => {
  const units = [
    { label: 'DAYS', value: padNumber(days) },
    { label: 'HOURS', value: padNumber(hours) },
    { label: 'MINUTES', value: padNumber(minutes) },
    { label: 'SECONDS', value: padNumber(seconds) },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-2 sm:px-4">
      {/* Supporting Academic Statement */}
      <div className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-8 text-center max-w-full">
        <span className="h-[1px] w-4 min-[380px]:w-6 sm:w-12 bg-gradient-to-r from-transparent to-amber-500/50 flex-shrink-0" />
        <p className="text-[10px] min-[360px]:text-xs sm:text-sm md:text-base font-medium tracking-[0.18em] min-[360px]:tracking-[0.22em] sm:tracking-[0.25em] text-slate-300 uppercase truncate">
          A New Academic Journey Begins
        </p>
        <span className="h-[1px] w-4 min-[380px]:w-6 sm:w-12 bg-gradient-to-l from-transparent to-amber-500/50 flex-shrink-0" />
      </div>

      {/* Responsive Countdown Grid */}
      <div className="grid grid-cols-4 gap-1.5 min-[360px]:gap-2 sm:gap-4 md:gap-6 w-full max-w-3xl">
        {units.map((unit, index) => (
          <div
            key={unit.label}
            className="relative flex flex-col items-center justify-center py-3 min-[360px]:py-4 sm:py-6 md:py-8 px-1 min-[360px]:px-2 sm:px-4 rounded-xl sm:rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-slate-800/90 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md overflow-hidden group hover:border-slate-700/80 transition-all duration-300"
          >
            {/* Top Subtle Glass Highlight */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
            
            {/* Number Display with Tabular Figures */}
            <div className="relative flex items-center justify-center w-full">
              <span
                className="font-extrabold text-2xl min-[360px]:text-3xl min-[420px]:text-4xl sm:text-6xl md:text-7xl lg:text-8xl tabular-nums tracking-tight text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.15)] leading-none"
                style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
              >
                {unit.value}
              </span>
              
              {/* Subtle amber indicator on the seconds box */}
              {index === 3 && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 sm:w-10 h-[2px] bg-amber-400/80 rounded-full animate-pulse" />
              )}
            </div>

            {/* Label Display */}
            <span className="mt-1.5 min-[360px]:mt-2 sm:mt-3 md:mt-4 text-[8px] min-[360px]:text-[9px] sm:text-xs md:text-sm font-semibold tracking-[0.14em] min-[360px]:tracking-[0.2em] text-slate-400 uppercase">
              {unit.label}
            </span>
          </div>
        ))}
      </div>

      {/* Trust & Schedule Footer Badge */}
      <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-4 text-center px-2">
        <div className="flex items-center gap-2 text-[11px] sm:text-sm text-slate-400 font-medium">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-ping opacity-75 flex-shrink-0" />
          <span>Scheduled Launch:</span>
          <span className="text-white font-semibold tracking-wide">
            25 September 2026 · 11:25 AM IST
          </span>
        </div>
      </div>
    </div>
  );
};
