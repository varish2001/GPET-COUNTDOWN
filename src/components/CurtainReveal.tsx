import React, { useEffect, useState } from 'react';

interface CurtainRevealProps {
  isOpen: boolean;
  onOpened?: () => void;
}

export const CurtainReveal: React.FC<CurtainRevealProps> = ({ isOpen, onOpened }) => {
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Small 0.3s cinematic pause before curtain glide
      const startTimer = setTimeout(() => {
        setHasStarted(true);
      }, 300);

      // Notify completion when curtains fully retract (2.2s glide)
      const completeTimer = setTimeout(() => {
        onOpened?.();
      }, 2500);

      return () => {
        clearTimeout(startTimer);
        clearTimeout(completeTimer);
      };
    } else {
      setHasStarted(false);
    }
  }, [isOpen, onOpened]);

  return (
    <div
      className={`fixed inset-0 z-40 pointer-events-none flex overflow-hidden transition-opacity duration-700 ${
        hasStarted ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
      aria-hidden="true"
    >
      {/* Left Virtual Curtain */}
      <div
        className="relative w-1/2 h-full bg-[#070b16] transition-transform duration-[2200ms] ease-[cubic-bezier(0.77,0,0.175,1)] will-change-transform"
        style={{
          transform: hasStarted ? 'translateX(-100%)' : 'translateX(0%)',
          background: `
            linear-gradient(90deg, 
              #04060c 0%, 
              #080e1e 25%, 
              #060a16 50%, 
              #0a1329 75%, 
              #050812 98%, 
              #0b1220 100%
            )
          `,
          boxShadow: 'inset -20px 0 50px rgba(0,0,0,0.8), 20px 0 60px rgba(0,0,0,0.9)',
        }}
      >
        {/* Fabric Vertical Pleat Folds & Depth Lines */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 24px,
              rgba(255,255,255,0.05) 25px,
              rgba(0,0,0,0.5) 45px
            )`,
          }}
        />

        {/* Golden Embroidered Vertical Trim on Inner Leading Edge */}
        <div className="absolute top-0 right-0 bottom-0 w-[3px] bg-gradient-to-b from-amber-600 via-amber-300 to-amber-600 shadow-[0_0_15px_rgba(251,191,36,0.8)]" />
        <div className="absolute top-0 right-1 bottom-0 w-[1px] bg-amber-400/50" />
      </div>

      {/* Right Virtual Curtain */}
      <div
        className="relative w-1/2 h-full bg-[#070b16] transition-transform duration-[2200ms] ease-[cubic-bezier(0.77,0,0.175,1)] will-change-transform"
        style={{
          transform: hasStarted ? 'translateX(100%)' : 'translateX(0%)',
          background: `
            linear-gradient(-90deg, 
              #04060c 0%, 
              #080e1e 25%, 
              #060a16 50%, 
              #0a1329 75%, 
              #050812 98%, 
              #0b1220 100%
            )
          `,
          boxShadow: 'inset 20px 0 50px rgba(0,0,0,0.8), -20px 0 60px rgba(0,0,0,0.9)',
        }}
      >
        {/* Fabric Vertical Pleat Folds */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -90deg,
              transparent,
              transparent 24px,
              rgba(255,255,255,0.05) 25px,
              rgba(0,0,0,0.5) 45px
            )`,
          }}
        />

        {/* Golden Embroidered Vertical Trim on Inner Leading Edge */}
        <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-gradient-to-b from-amber-600 via-amber-300 to-amber-600 shadow-[0_0_15px_rgba(251,191,36,0.8)]" />
        <div className="absolute top-0 left-1 bottom-0 w-[1px] bg-amber-400/50" />
      </div>
    </div>
  );
};
