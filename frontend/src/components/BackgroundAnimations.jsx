import React, { useEffect, useRef } from 'react';

export const HeroBackground = () => {
  return (
    <div style={{ position: 'absolute', zIndex: 0, pointerEvents: 'none', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', opacity: 0.15 }}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <style>
            {`
              @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
              .particle {
                fill: #E63946;
                animation: floatUp 10s infinite linear;
                will-change: transform;
              }
              .line {
                stroke: #E63946;
                stroke-width: 1;
                animation: floatUp 10s infinite linear;
                will-change: transform;
              }
              @keyframes floatUp {
                0% { transform: translateY(100vh); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(-20vh); opacity: 0; }
              }
            `}
          </style>
        </defs>
        <circle cx="20%" cy="100%" r="4" className="particle" style={{ animationDelay: '0s', animationDuration: '12s' }} />
        <circle cx="80%" cy="100%" r="6" className="particle" style={{ animationDelay: '2s', animationDuration: '15s' }} />
        <circle cx="50%" cy="100%" r="3" className="particle" style={{ animationDelay: '5s', animationDuration: '10s' }} />
        <circle cx="30%" cy="100%" r="5" className="particle" style={{ animationDelay: '7s', animationDuration: '14s' }} />
        <circle cx="70%" cy="100%" r="4" className="particle" style={{ animationDelay: '3s', animationDuration: '11s' }} />
        <line x1="20%" y1="100%" x2="30%" y2="100%" className="line" style={{ animationDelay: '0s', animationDuration: '12s' }} />
        <line x1="70%" y1="100%" x2="80%" y2="100%" className="line" style={{ animationDelay: '2s', animationDuration: '11s' }} />
      </svg>
    </div>
  );
};

export const AboutBackground = () => {
  return (
    <div style={{ position: 'absolute', zIndex: 0, pointerEvents: 'none', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
      <style>
        {`
          @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
          .grid-bg {
            background-image: linear-gradient(#0D0D0D 1px, transparent 1px), linear-gradient(90deg, #0D0D0D 1px, transparent 1px);
            background-size: 40px 40px;
            opacity: 0.05;
            width: 200%;
            height: 200%;
            position: absolute;
            top: -50%;
            left: -50%;
            transform: rotate(-15deg);
            animation: scrollGrid 60s infinite linear;
            will-change: transform;
          }
          @keyframes scrollGrid {
            0% { transform: rotate(-15deg) translateY(0); }
            100% { transform: rotate(-15deg) translateY(40px); }
          }
        `}
      </style>
      <div className="grid-bg"></div>
    </div>
  );
};

export const ProjectsBackground = () => {
  return (
    <div style={{ position: 'absolute', zIndex: 0, pointerEvents: 'none', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
      <style>
        {`
          @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
          .pulse-ring {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 10px;
            height: 10px;
            border: 2px solid #E63946;
            border-radius: 50%;
            opacity: 0;
            animation: pulse 8s infinite ease-out;
            will-change: transform, opacity;
          }
          @keyframes pulse {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 0.10; }
            100% { transform: translate(-50%, -50%) scale(100); opacity: 0; }
          }
        `}
      </style>
      <div className="pulse-ring" style={{ animationDelay: '0s' }}></div>
      <div className="pulse-ring" style={{ animationDelay: '2.6s' }}></div>
      <div className="pulse-ring" style={{ animationDelay: '5.3s' }}></div>
    </div>
  );
};

export const SkillsBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);
    const chars = '01'.split('');

    let animationFrame;
    const draw = () => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(230, 57, 70, 0.07)';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationFrame = requestAnimationFrame(draw);
    };
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mediaQuery.matches) {
      draw();
    }
    
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div style={{ position: 'absolute', zIndex: 0, pointerEvents: 'none', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', opacity: 0.8 }}></canvas>
    </div>
  );
};

export const ContactBackground = () => {
  return (
    <div style={{ position: 'absolute', zIndex: 0, pointerEvents: 'none', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" opacity="0.04" />
      </svg>
    </div>
  );
};
