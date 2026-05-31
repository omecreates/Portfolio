/**
 * BackgroundAnimations.js — Minimalist Professional Edition
 * Stripped down to only essential, subtle animations.
 */

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function injectStyle(css) {
  const s = document.createElement('style');
  s.textContent = css;
  document.head.appendChild(s);
}

// Injects the global styles for minimal animations
function injectMinimalStyles() {
  injectStyle(`
    @keyframes subtleFloat {
      0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
      50% { transform: translateY(-20px) scale(1.1); opacity: 0.6; }
    }
    .hero-glow {
      position: absolute;
      top: 30%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 600px;
      height: 600px;
      background: radial-gradient(circle, var(--color-accent-dim) 0%, transparent 60%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 0;
      opacity: 0.8;
    }
    .hero-particles {
      position: absolute;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      overflow: hidden;
    }
    .particle {
      position: absolute;
      background-color: var(--color-accent);
      border-radius: 50%;
      opacity: 0.3;
      filter: blur(2px);
      animation: subtleFloat 8s ease-in-out infinite;
    }
    .particle-1 { width: 8px; height: 8px; top: 20%; left: 15%; animation-delay: 0s; }
    .particle-2 { width: 12px; height: 12px; top: 60%; left: 80%; animation-delay: -2s; }
    .particle-3 { width: 6px; height: 6px; top: 75%; left: 25%; animation-delay: -4s; }
    .particle-4 { width: 10px; height: 10px; top: 30%; left: 75%; animation-delay: -6s; }
  `);
}

function liftContent(section) {
  Array.from(section.children).forEach(function(child) {
    if (child.classList.contains('hero-glow') || child.classList.contains('hero-particles')) return;
    if (!child.style.position || child.style.position === 'static') {
      child.style.position = 'relative';
    }
    if (!child.style.zIndex) child.style.zIndex = '2';
  });
}

function initHeroBackground(section) {
  if (section.querySelector('.hero-glow')) return;

  const glow = document.createElement('div');
  glow.className = 'hero-glow';
  
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'hero-particles';
  
  if (!reduced()) {
    for (let i = 1; i <= 4; i++) {
      const p = document.createElement('div');
      p.className = `particle particle-${i}`;
      particlesContainer.appendChild(p);
    }
  }

  section.style.position = 'relative';
  section.insertBefore(particlesContainer, section.firstChild);
  section.insertBefore(glow, section.firstChild);
  liftContent(section);
}

export function initBackgroundAnimations() {
  if (!document.querySelector('.hero-glow')) {
    injectMinimalStyles();
  }

  const hero = document.getElementById('hero');
  if (hero) initHeroBackground(hero);
  
  // All other sections have NO background animations now.
}
