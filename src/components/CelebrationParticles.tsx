import React, { useEffect, useRef } from 'react';

interface CelebrationParticlesProps {
  durationMs?: number;
}

export const CelebrationParticles: React.FC<CelebrationParticlesProps> = ({
  durationMs = 8000,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Premium, restrained color palette matching GPET / Gradorra
    const colors = [
      '#F59E0B', // Amber
      '#FBBF24', // Gold
      '#2563EB', // Royal Blue
      '#60A5FA', // Azure Sky
      '#FFFFFF', // Starlight White
      '#F97316', // Warm Orange
    ];

    interface Particle {
      x: number;
      y: number;
      size: number;
      color: string;
      vx: number;
      vy: number;
      rotation: number;
      vRot: number;
      alpha: number;
      decay: number;
    }

    const particles: Particle[] = [];
    const startTime = Date.now();

    // Helper to spawn a batch of particles
    const spawnParticles = (count: number, isInitial: boolean = false) => {
      for (let i = 0; i < count; i++) {
        const originX = isInitial
          ? width / 2 + (Math.random() - 0.5) * (width * 0.4)
          : Math.random() * width;
        const originY = isInitial
          ? height / 2 + (Math.random() - 0.5) * 100
          : -10;

        particles.push({
          x: originX,
          y: originY,
          size: Math.random() * 5 + 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: (Math.random() - 0.5) * (isInitial ? 8 : 4),
          vy: isInitial ? (Math.random() - 0.7) * 8 - 2 : Math.random() * 2 + 1.5,
          rotation: Math.random() * 360,
          vRot: (Math.random() - 0.5) * 6,
          alpha: 1,
          decay: Math.random() * 0.005 + 0.003,
        });
      }
    };

    // Initial burst
    spawnParticles(40, true);

    // Continuous gentle float throughout the 8-second celebration window
    const spawnInterval = setInterval(() => {
      if (Date.now() - startTime < durationMs - 1000) {
        spawnParticles(4, false);
      }
    }, 250);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.06; // gentle gravity
        p.rotation += p.vRot;
        p.alpha -= p.decay;

        if (p.alpha <= 0 || p.y > height + 20) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;

        // Alternate small rectangles and circular sparks
        if (p.size > 4.5) {
          ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.6);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      clearInterval(spawnInterval);
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [durationMs]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      aria-hidden="true"
    />
  );
};
