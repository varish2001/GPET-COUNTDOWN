import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showWordmark?: boolean;
  className?: string;
  imageSrc?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showWordmark = true,
  className = '',
  imageSrc,
}) => {
  const sizeMap = {
    sm: { icon: 'w-8 h-8', text: 'text-lg', sub: 'text-[9px]' },
    md: { icon: 'w-12 h-12', text: 'text-xl', sub: 'text-[10px]' },
    lg: { icon: 'w-16 h-16', text: 'text-2xl', sub: 'text-xs' },
    xl: { icon: 'w-24 h-24', text: 'text-3xl', sub: 'text-sm' },
    hero: { icon: 'w-32 h-32 md:w-40 md:h-40', text: 'text-4xl md:text-5xl', sub: 'text-sm md:text-base' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <div className="relative flex items-center justify-center">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Gradorra GPET Logo"
            className={`${currentSize.icon} object-contain`}
          />
        ) : (
          /* High-Fidelity Vector Monogram matching the Gradorra GPET aerodynamic 'G' emblem */
          <svg
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${currentSize.icon} filter drop-shadow-[0_8px_24px_rgba(37,99,235,0.35)]`}
            aria-label="Gradorra Logo"
          >
            <defs>
              {/* Royal Blue Gradient for Outer Upper 'G' curve */}
              <linearGradient id="gpetBlueGrad1" x1="20" y1="20" x2="180" y2="160" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="40%" stopColor="#1D4ED8" />
                <stop offset="100%" stopColor="#1E3A8A" />
              </linearGradient>

              {/* Cyan to Sapphire Highlight on Left Arc */}
              <linearGradient id="gpetBlueHighlight" x1="40" y1="40" x2="120" y2="180" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="60%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#1E40AF" />
              </linearGradient>

              {/* Vibrant Amber-Orange Gradient for Crossbar Wing */}
              <linearGradient id="gpetOrangeGrad1" x1="90" y1="90" x2="160" y2="105" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="50%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#EA580C" />
              </linearGradient>

              {/* Warm Orange Gradient for Lower Spur */}
              <linearGradient id="gpetOrangeSpur" x1="100" y1="120" x2="135" y2="165" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#DC2626" />
              </linearGradient>

              {/* Soft Inner Shadow Filter */}
              <filter id="innerDepth" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.4" />
              </filter>
            </defs>

            {/* Main sweeping letter G body */}
            <path
              d="M148 48 C126 48 108 48 90 54 C60 64 42 88 42 120 C42 152 64 178 104 178 C136 178 152 162 152 136 C152 132 150 128 142 128 L114 128 C110 128 108 126 108 122 C108 118 110 114 115 114 L154 114 C164 114 172 122 172 134 C172 168 144 194 100 194 C50 194 22 160 22 118 C22 72 52 32 102 32 C124 32 144 32 156 38 C160 40 162 44 158 46 C154 48 150 48 148 48 Z"
              fill="url(#gpetBlueGrad1)"
            />

            {/* Left curved arc overlay for dimension and smooth ribbon curvature */}
            <path
              d="M102 32 C72 32 46 54 34 84 C26 104 26 126 34 144 C26 128 24 108 30 90 C40 60 68 40 102 36 C116 34 134 35 150 40 C140 35 122 32 102 32 Z"
              fill="url(#gpetBlueHighlight)"
              opacity="0.9"
            />

            {/* Dynamic Upper Horizontal Orange Wing/Flame inside G */}
            <path
              d="M92 102 C102 88 124 82 150 82 C162 82 168 86 166 92 C164 98 152 104 136 105 C116 107 100 106 92 102 Z"
              fill="url(#gpetOrangeGrad1)"
              filter="url(#innerDepth)"
            />

            {/* Secondary aerodynamic orange plume blade extending into crossbar */}
            <path
              d="M96 100 C110 94 132 94 154 94 C158 94 160 97 156 101 C144 112 126 116 108 116 C100 116 95 112 96 100 Z"
              fill="#F59E0B"
              opacity="0.95"
            />

            {/* Dynamic Lower Orange Spur under the right limb */}
            <path
              d="M120 128 C128 128 134 132 134 140 C134 154 122 172 112 182 C110 184 106 182 108 178 C112 166 118 150 118 138 C118 132 119 128 120 128 Z"
              fill="url(#gpetOrangeSpur)"
            />
          </svg>
        )}
      </div>

      {showWordmark && (
        <div className="mt-3 text-center">
          <h1
            className={`font-extrabold tracking-[0.22em] text-white uppercase ${currentSize.text}`}
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            GRADORRA
          </h1>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="h-[1px] w-4 bg-amber-500/40" />
            <span className={`font-semibold tracking-[0.25em] text-amber-400/90 uppercase ${currentSize.sub}`}>
              GPET 2026
            </span>
            <span className="h-[1px] w-4 bg-amber-500/40" />
          </div>
        </div>
      )}
    </div>
  );
};
