import React, { useState } from 'react';
import { SlidersHorizontal, RotateCcw, Play, Clock, Sparkles } from 'lucide-react';

interface SimulationBarProps {
  onSimulateLaunchCountdown: () => void;
  onSimulatePostLaunch: () => void;
  onReset: () => void;
  currentMode: 'real' | 'simulated-countdown' | 'post-launch';
}

export const SimulationBar: React.FC<SimulationBarProps> = ({
  onSimulateLaunchCountdown,
  onSimulatePostLaunch,
  onReset,
  currentMode,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-3 left-3 sm:bottom-4 sm:left-4 z-50 select-none">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-700/60 text-slate-400 hover:text-slate-200 text-[11px] sm:text-xs font-medium shadow-lg backdrop-blur-md transition-all opacity-70 hover:opacity-100 active:scale-95"
          title="Open Launch Gate Simulation Controls"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden min-[400px]:inline">Launch Simulation Tester</span>
        </button>
      ) : (
        <div className="flex flex-col gap-2 p-3 rounded-2xl bg-slate-950/95 border border-slate-800 shadow-2xl backdrop-blur-xl text-xs w-[calc(100vw-24px)] max-w-[280px] sm:w-72 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Launch Gate Test Controls</span>
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-500 hover:text-slate-300 font-bold px-1"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-1.5 pt-1">
            <button
              onClick={onReset}
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg border text-left transition-all ${
                currentMode === 'real'
                  ? 'bg-blue-600/20 border-blue-500/50 text-blue-200'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Live Clock (25 Sept 2026)</span>
              </span>
              {currentMode === 'real' && <span className="text-[10px] text-blue-400">ACTIVE</span>}
            </button>

            <button
              onClick={onSimulateLaunchCountdown}
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg border text-left transition-all ${
                currentMode === 'simulated-countdown'
                  ? 'bg-amber-600/20 border-amber-500/50 text-amber-200'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5 text-amber-400" />
                <span>Test 5s Countdown Transition</span>
              </span>
            </button>

            <button
              onClick={onSimulatePostLaunch}
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg border text-left transition-all ${
                currentMode === 'post-launch'
                  ? 'bg-emerald-600/20 border-emerald-500/50 text-emerald-200'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Jump Directly to PIN Gate</span>
              </span>
            </button>

            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/40 hover:bg-slate-900 border border-slate-800/80 text-slate-400 hover:text-white transition-all mt-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset State</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
