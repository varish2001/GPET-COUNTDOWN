import React from 'react';

export const LaunchBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#050811]">
      {/* Deep Atmospheric Base Gradients */}
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(30, 58, 138, 0.25), transparent 70%), radial-gradient(ellipse 60% 40% at 50% 110%, rgba(245, 158, 11, 0.08), transparent 60%)',
        }}
      />

      {/* Subtle Academic Precision Grid Hairlines */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, black 40%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, black 40%, transparent 85%)',
        }}
      />

      {/* Subtle Concentric Orbital Calibration Rings representing Scholarship / Academic Guidance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] md:w-[900px] md:h-[900px] rounded-full border border-blue-500/[0.04] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] md:w-[600px] md:h-[600px] rounded-full border border-amber-500/[0.03] pointer-events-none" />

      {/* Very Soft Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-amber-600/5 rounded-full blur-3xl" />

      {/* Fine Subtle Corner Academic Markings */}
      <div className="absolute top-8 left-8 hidden md:block text-[11px] font-mono tracking-wider text-slate-500/40">
        LAT 28.6139° N / LON 77.2090° E · IST [UTC+05:30]
      </div>
      <div className="absolute top-8 right-8 hidden md:block text-[11px] font-mono tracking-wider text-slate-500/40 text-right">
        GRADORRA ACADEMIC PLATFORM // GPET 2026
      </div>
      <div className="absolute bottom-8 left-8 hidden md:block text-[11px] font-mono tracking-wider text-slate-500/40">
        SCHOLARSHIP & TALENT ASSESSMENT DIVISION
      </div>
      <div className="absolute bottom-8 right-8 hidden md:block text-[11px] font-mono tracking-wider text-slate-500/40 text-right">
        OFFICIAL ADMISSIONS PORTAL
      </div>
    </div>
  );
};
