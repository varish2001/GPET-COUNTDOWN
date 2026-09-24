import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BrandLogo } from './BrandLogo';
import { Countdown } from './Countdown';
import { PinGate } from './PinGate';
import { CurtainReveal } from './CurtainReveal';
import { GradorraReveal } from './GradorraReveal';
import { LaunchBackground } from './LaunchBackground';
import { SimulationBar } from './SimulationBar';
import {
  calculateTimeRemaining,
  LAUNCH_TIMESTAMP_MS,
  TimeRemaining,
} from '../utils/time';

export type GateState =
  | 'COUNTDOWN'
  | 'LAUNCH_MOMENT_TRANSITION'
  | 'PIN_GATE'
  | 'CURTAIN_CLOSED'
  | 'REVEAL';

export const LaunchGate: React.FC = () => {
  // Mode tracking for testing/simulation
  const [simulationMode, setSimulationMode] = useState<
    'real' | 'simulated-countdown' | 'post-launch'
  >('real');

  // Time state locked to official launch timestamp (25 September 2026, 11:25:00 AM IST)
  const [time, setTime] = useState<TimeRemaining>(() => calculateTimeRemaining());
  const [simulatedOffsetMs, setSimulatedOffsetMs] = useState<number>(0);

  // Overall launch gate state machine:
  // Starts in COUNTDOWN until 25 Sep 2026 11:25:00 AM IST, then transitions to PIN_GATE
  const [gateState, setGateState] = useState<GateState>(() => {
    const initialRemaining = calculateTimeRemaining();
    return initialRemaining.isLaunched ? 'PIN_GATE' : 'COUNTDOWN';
  });

  const [isCurtainOpen, setIsCurtainOpen] = useState(false);
  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Main countdown timer loop
  useEffect(() => {
    if (simulationMode === 'post-launch') return;

    const interval = setInterval(() => {
      const now = Date.now() + simulatedOffsetMs;
      const remaining = calculateTimeRemaining(LAUNCH_TIMESTAMP_MS, now);
      setTime(remaining);

      // When countdown reaches 00:00:00:00, seamlessly trigger launch transition & open PIN page
      if (remaining.isLaunched) {
        clearInterval(interval);
        handleLaunchMomentTrigger();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [simulationMode, simulatedOffsetMs]);

  // When countdown hits 00:00:00:00 exactly at 11:25 AM IST
  const handleLaunchMomentTrigger = useCallback(() => {
    setGateState((prev) => {
      if (prev === 'COUNTDOWN') {
        return 'LAUNCH_MOMENT_TRANSITION';
      }
      return prev;
    });

    // 1.2s atmospheric launch moment sequence into PIN page
    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    transitionTimerRef.current = setTimeout(() => {
      setGateState('PIN_GATE');
    }, 1200);
  }, []);

  // When PIN is successfully verified by server API
  const handlePinSuccess = useCallback(() => {
    // 1. Drapes curtains closed
    setGateState('CURTAIN_CLOSED');
    setIsCurtainOpen(false);

    // 2. Smoothly retract curtains to left and right
    setTimeout(() => {
      setIsCurtainOpen(true);
      setGateState('REVEAL');
    }, 200);
  }, []);

  // Redirect handler: Navigates to target website https://gpet.org.in/
  const handleRedirect = useCallback(() => {
    window.location.href = 'https://gpet.org.in/';
  }, []);

  // Simulation Controls for Testing & Verification
  const handleSimulateLaunchCountdown = () => {
    // Set time to 5 seconds before launch
    const targetOffset = LAUNCH_TIMESTAMP_MS - Date.now() - 5000;
    setSimulatedOffsetMs(targetOffset);
    setSimulationMode('simulated-countdown');
    setGateState('COUNTDOWN');
    setIsCurtainOpen(false);
    setTime(calculateTimeRemaining(LAUNCH_TIMESTAMP_MS, Date.now() + targetOffset));
  };

  const handleSimulatePostLaunch = () => {
    setSimulationMode('post-launch');
    setGateState('PIN_GATE');
    setIsCurtainOpen(false);
  };

  const handleResetToRealTime = () => {
    setSimulatedOffsetMs(0);
    setSimulationMode('real');
    setIsCurtainOpen(false);
    const realRemaining = calculateTimeRemaining();
    setTime(realRemaining);
    setGateState(realRemaining.isLaunched ? 'PIN_GATE' : 'COUNTDOWN');
  };

  // Only show dev simulation bar if ?test=true is explicitly passed in URL
  const showTestControls =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('test') === 'true';

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden text-slate-100 font-sans">
      {/* High-end Academic Launch Background */}
      <LaunchBackground />

      {/* Top Header Bar with Responsive Mobile Styling */}
      <header className="w-full max-w-7xl mx-auto px-3 sm:px-8 py-3.5 sm:py-6 flex items-center justify-between border-b border-slate-800/40 z-20">
        <div className="flex items-center gap-2 sm:gap-3">
          <BrandLogo size="sm" showWordmark={false} />
          <div className="flex flex-col">
            <span
              className="text-sm sm:text-lg font-bold tracking-widest text-white uppercase leading-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              GRADORRA
            </span>
            <span className="text-[9px] sm:text-xs font-semibold tracking-wider text-amber-400/90 uppercase">
              GPET 2026 Examination
            </span>
          </div>
        </div>

        {/* Official Portal Status Badge */}
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-[10px] sm:text-xs font-medium text-slate-400 tracking-wider uppercase">
            Official Portal
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="System Online" />
        </div>
      </header>

      {/* Main Experience Viewport */}
      <main className="flex-1 flex flex-col items-center justify-center py-6 sm:py-10 px-3 sm:px-4 z-20 w-full max-w-5xl mx-auto">
        {gateState === 'COUNTDOWN' && (
          <div className="flex flex-col items-center w-full text-center animate-in fade-in duration-700">
            {/* Center Logo Lockup */}
            <div className="mb-4 sm:mb-8 scale-90 sm:scale-100 transition-transform">
              <BrandLogo size="lg" showWordmark={true} />
            </div>

            {/* Launch Status Banner */}
            <div className="mb-4 sm:mb-6">
              <span className="text-[10px] min-[360px]:text-xs sm:text-sm font-semibold tracking-[0.22em] sm:tracking-[0.25em] text-amber-400/90 uppercase bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                Launching Soon
              </span>
            </div>

            {/* Countdown Component */}
            <Countdown
              days={time.days}
              hours={time.hours}
              minutes={time.minutes}
              seconds={time.seconds}
            />
          </div>
        )}

        {gateState === 'LAUNCH_MOMENT_TRANSITION' && (
          <div className="flex flex-col items-center justify-center text-center animate-in zoom-in-95 fade-in duration-700 px-4">
            <BrandLogo size="hero" showWordmark={false} />
            <h2
              className="mt-6 text-2xl sm:text-5xl font-extrabold text-white tracking-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Initiating Launch...
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-amber-400/90 font-medium tracking-widest uppercase">
              Preparing Candidate Portal Access
            </p>
          </div>
        )}

        {gateState === 'PIN_GATE' && (
          <div className="flex flex-col items-center w-full">
            <div className="mb-2 sm:mb-6 scale-90 sm:scale-100">
              <BrandLogo size="md" showWordmark={false} />
            </div>
            <PinGate onSuccess={handlePinSuccess} />
          </div>
        )}

        {(gateState === 'CURTAIN_CLOSED' || gateState === 'REVEAL') && (
          <GradorraReveal onRedirect={handleRedirect} />
        )}
      </main>

      {/* Cinematic Curtains Layer (Animates on successful PIN verification) */}
      {(gateState === 'CURTAIN_CLOSED' || gateState === 'REVEAL') && (
        <CurtainReveal isOpen={isCurtainOpen} />
      )}

      {/* Mobile-Friendly Academic Footer */}
      <footer className="w-full max-w-7xl mx-auto px-3 sm:px-8 py-4 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 border-t border-slate-800/40 text-[10px] sm:text-xs text-slate-500 z-20 text-center sm:text-left">
        <p>© 2026 Gradorra Foundation & GPET. All Rights Reserved.</p>
        <p className="tracking-wider">
          Graduate & Professional Entrance Test · Official Admissions
        </p>
      </footer>

      {/* Simulation Bar for Testing Scenarios (Only rendered when ?test=true) */}
      {showTestControls && (
        <SimulationBar
          onSimulateLaunchCountdown={handleSimulateLaunchCountdown}
          onSimulatePostLaunch={handleSimulatePostLaunch}
          onReset={handleResetToRealTime}
          currentMode={simulationMode}
        />
      )}
    </div>
  );
};
