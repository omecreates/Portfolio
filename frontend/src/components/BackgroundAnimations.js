/**
 * BackgroundAnimations.js
 * Pure decorative, non-interactive background animations for each portfolio section.
 * Self-initialises via MutationObserver — no modifications to existing files needed.
 *
 * Respects prefers-reduced-motion, uses only transform/opacity for GPU compositing.
 */

/* ─── Shared helpers ──────────────────────────────────────────────────── */

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function injectStyle(css) {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
}

function makeBg(extraStyle) {
  const el = document.createElement('div');
  el.setAttribute('aria-hidden', 'true');
  Object.assign(el.style, {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    zIndex: '0',
    pointerEvents: 'none',
    overflow: 'hidden',
    ...extraStyle,
  });
  return el;
}

/* ─── 1. Hero Background ─ floating particles + connecting lines ─────── */

function initHeroBackground(section) {
  const wrapper = makeBg({ opacity: '0.15' });
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');

  const style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
  style.textContent = `
    @media (prefers-reduced-motion: reduce) { .hero-particle, .hero-line { animation: none !important; } }
    .hero-particle {
      fill: #E63946;
      animation: heroFloat linear infinite;
      will-change: transform;
    }
    .hero-line {
      stroke: #E63946;
      stroke-width: 1;
      animation: heroFloat linear infinite;
      will-change: transform;
    }
    @keyframes heroFloat {
      0%   { transform: translateY(100vh); opacity: 0; }
      10%  { opacity: 1; }
      90%  { opacity: 1; }
      100% { transform: translateY(-20vh); opacity: 0; }
    }
  `;
  svg.appendChild(style);

  const particles = [
    { cx: '10%', r: 3, dur: '13s', delay: '0s' },
    { cx: '22%', r: 5, dur: '17s', delay: '2s' },
    { cx: '38%', r: 2, dur: '11s', delay: '5s' },
    { cx: '51%', r: 4, dur: '15s', delay: '1s' },
    { cx: '64%', r: 3, dur: '12s', delay: '7s' },
    { cx: '77%', r: 6, dur: '18s', delay: '3s' },
    { cx: '89%', r: 3, dur: '14s', delay: '9s' },
    { cx: '30%', r: 2, dur: '10s', delay: '4s' },
  ];

  const lines = [
    { x1: '10%', y1: '100%', x2: '22%', y2: '100%', dur: '13s', delay: '0s' },
    { x1: '51%', y1: '100%', x2: '64%', y2: '100%', dur: '15s', delay: '1s' },
    { x1: '77%', y1: '100%', x2: '89%', y2: '100%', dur: '18s', delay: '3s' },
  ];

  particles.forEach(p => {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', p.cx);
    circle.setAttribute('cy', '100%');
    circle.setAttribute('r', p.r);
    circle.setAttribute('class', 'hero-particle');
    circle.style.animationDuration = p.dur;
    circle.style.animationDelay = p.delay;
    svg.appendChild(circle);
  });

  lines.forEach(l => {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', l.x1); line.setAttribute('y1', l.y1);
    line.setAttribute('x2', l.x2); line.setAttribute('y2', l.y2);
    line.setAttribute('class', 'hero-line');
    line.style.animationDuration = l.dur;
    line.style.animationDelay = l.delay;
    svg.appendChild(line);
  });

  wrapper.appendChild(svg);
  section.style.position = 'relative';
  section.insertBefore(wrapper, section.firstChild);
}

/* ─── 2. About Background ─ slow diagonal scrolling grid ─────────────── */

function initAboutBackground(section) {
  const wrapper = makeBg();

  injectStyle(`
    @media (prefers-reduced-motion: reduce) { .about-grid-bg { animation: none !important; } }
    .about-grid-bg {
      background-image:
        linear-gradient(#0D0D0D 1px, transparent 1px),
        linear-gradient(90deg, #0D0D0D 1px, transparent 1px);
      background-size: 40px 40px;
      opacity: 0.05;
      width: 200%;
      height: 200%;
      position: absolute;
      top: -50%;
      left: -50%;
      transform: rotate(-15deg);
      animation: aboutGridScroll 60s linear infinite;
      will-change: transform;
    }
    @keyframes aboutGridScroll {
      0%   { transform: rotate(-15deg) translateY(0); }
      100% { transform: rotate(-15deg) translateY(40px); }
    }
  `);

  const grid = document.createElement('div');
  grid.className = 'about-grid-bg';
  grid.setAttribute('aria-hidden', 'true');
  wrapper.appendChild(grid);

  section.style.position = 'relative';
  section.insertBefore(wrapper, section.firstChild);
}

/* ─── 3. Projects Background ─ radial pulse / sonar rings ────────────── */

function initProjectsBackground(section) {
  const wrapper = makeBg();

  injectStyle(`
    @media (prefers-reduced-motion: reduce) { .projects-pulse-ring { animation: none !important; } }
    .projects-pulse-ring {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 10px;
      height: 10px;
      border: 2px solid #E63946;
      border-radius: 50%;
      opacity: 0;
      animation: projectsPulse 8s ease-out infinite;
      will-change: transform, opacity;
    }
    @keyframes projectsPulse {
      0%   { transform: translate(-50%, -50%) scale(1);   opacity: 0.10; }
      100% { transform: translate(-50%, -50%) scale(100); opacity: 0; }
    }
  `);

  [0, 2.6, 5.3].forEach(delay => {
    const ring = document.createElement('div');
    ring.className = 'projects-pulse-ring';
    ring.setAttribute('aria-hidden', 'true');
    ring.style.animationDelay = `${delay}s`;
    wrapper.appendChild(ring);
  });

  section.style.position = 'relative';
  section.insertBefore(wrapper, section.firstChild);
}

/* ─── 4. Skills Background ─ canvas binary/code rain ─────────────────── */

function initSkillsBackground(section) {
  const wrapper = makeBg({ opacity: '1' });
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  Object.assign(canvas.style, {
    width: '100%',
    height: '100%',
    display: 'block',
  });
  wrapper.appendChild(canvas);
  section.style.position = 'relative';
  section.insertBefore(wrapper, section.firstChild);

  let rafId;

  function startRain() {
    if (prefersReducedMotion()) return;

    canvas.width = section.offsetWidth;
    canvas.height = section.offsetHeight;

    const ctx = canvas.getContext('2d');
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array.from({ length: columns }, () => Math.random() * -canvas.height);
    const chars = ['0', '1'];

    function draw() {
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
      rafId = requestAnimationFrame(draw);
    }

    draw();
  }

  startRain();

  // Restart on resize
  const ro = new ResizeObserver(() => {
    cancelAnimationFrame(rafId);
    startRain();
  });
  ro.observe(section);
}

/* ─── 5. Contact Background ─ SVG noise texture overlay ──────────────── */

function initContactBackground(section) {
  const wrapper = makeBg({ opacity: '1' });

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  svg.setAttribute('aria-hidden', 'true');

  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');

  const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
  filter.setAttribute('id', 'bg-noise-filter');
  filter.setAttribute('x', '0%');
  filter.setAttribute('y', '0%');
  filter.setAttribute('width', '100%');
  filter.setAttribute('height', '100%');

  const turbulence = document.createElementNS('http://www.w3.org/2000/svg', 'feTurbulence');
  turbulence.setAttribute('type', 'fractalNoise');
  turbulence.setAttribute('baseFrequency', '0.65');
  turbulence.setAttribute('numOctaves', '3');
  turbulence.setAttribute('stitchTiles', 'stitch');

  // Animate the seed slowly for subtle movement
  const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
  animate.setAttribute('attributeName', 'seed');
  animate.setAttribute('from', '0');
  animate.setAttribute('to', '100');
  animate.setAttribute('dur', '30s');
  animate.setAttribute('repeatCount', 'indefinite');
  turbulence.appendChild(animate);

  filter.appendChild(turbulence);
  defs.appendChild(filter);
  svg.appendChild(defs);

  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('width', '100%');
  rect.setAttribute('height', '100%');
  rect.setAttribute('filter', 'url(#bg-noise-filter)');
  rect.setAttribute('opacity', '0.04');
  svg.appendChild(rect);

  wrapper.appendChild(svg);
  section.style.position = 'relative';
  section.insertBefore(wrapper, section.firstChild);
}

/* ─── Wire up: ensure content z-index is above backgrounds ───────────── */

function ensureContentLayering(section) {
  // Direct children that are NOT the background wrapper should sit above it
  Array.from(section.children).forEach(child => {
    if (child.style.position === 'absolute' && child.style.zIndex === '0') return; // our bg
    if (!child.style.position || child.style.position === 'static') {
      child.style.position = 'relative';
    }
    if (!child.style.zIndex) {
      child.style.zIndex = '1';
    }
  });
}

/* ─── Main initialiser ───────────────────────────────────────────────── */

function initBackgroundAnimations() {
  const hero     = document.getElementById('hero');
  const about    = document.getElementById('about');
  const projects = document.getElementById('projects');
  const skills   = document.getElementById('skills');
  const contact  = document.getElementById('contact');

  if (hero)     { initHeroBackground(hero);     ensureContentLayering(hero); }
  if (about)    { initAboutBackground(about);   ensureContentLayering(about); }
  if (projects) { initProjectsBackground(projects); ensureContentLayering(projects); }
  if (skills)   { initSkillsBackground(skills); ensureContentLayering(skills); }
  if (contact)  { initContactBackground(contact); ensureContentLayering(contact); }
}

/* ─── Self-boot via MutationObserver ─────────────────────────────────── */
// Waits for the sections to be injected into the DOM by Home.js renderHome(),
// then runs once automatically. No modification to existing files required.

let _booted = false;

function tryBoot() {
  if (_booted) return;
  const hero = document.getElementById('hero');
  if (!hero) return;
  _booted = true;
  initBackgroundAnimations();
  observer.disconnect();
}

const observer = new MutationObserver(tryBoot);
observer.observe(document.body || document.documentElement, {
  childList: true,
  subtree: true,
});

// Also try immediately in case DOM is already ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', tryBoot);
} else {
  tryBoot();
}

export { initBackgroundAnimations };
