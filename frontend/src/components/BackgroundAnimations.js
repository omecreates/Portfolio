/**
 * BackgroundAnimations.js — Premium Dark Mode Edition
 * Breathtaking section-specific animated backgrounds for a premium dark portfolio.
 * Uses only GPU-composited properties and respects prefers-reduced-motion.
 */

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function injectStyle(css) {
  const s = document.createElement('style');
  s.textContent = css;
  document.head.appendChild(s);
}

function bgLayer(section) {
  const el = document.createElement('div');
  el.className = 'bg-anim-layer';
  el.setAttribute('aria-hidden', 'true');
  el.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;z-index:0;pointer-events:none;overflow:hidden;';
  section.style.position = 'relative';
  if (!section.querySelector('.bg-anim-layer')) {
    section.insertBefore(el, section.firstChild);
  }
  return el;
}

function liftContent(section) {
  Array.from(section.children).forEach(function(child) {
    if (child.classList.contains('bg-anim-layer')) return;
    if (!child.style.position || child.style.position === 'static') {
      child.style.position = 'relative';
    }
    if (!child.style.zIndex) child.style.zIndex = '2';
  });
}

/* ══════════════════════════════════════════════════════
   1. HERO — Deep Space: Stars + Nebula Orbs + Mouse Parallax
   ══════════════════════════════════════════════════════ */
function initHeroBackground(section) {
  section.style.background = 'radial-gradient(ellipse at 30% 60%, #0a0814 0%, #030305 70%)';

  var layer = bgLayer(section);
  var canvas = document.createElement('canvas');
  canvas.style.cssText = 'width:100%;height:100%;display:block;';
  layer.appendChild(canvas);

  var w, h;
  var mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  var rafId;

  var ORBS = [
    { x: 0.18, y: 0.35, r: 350, hue: '340', sat: '85%', lit: '55%', alpha: 0.14, vx: 0.0008, vy: 0.001 },
    { x: 0.82, y: 0.65, r: 450, hue: '270', sat: '80%', lit: '50%', alpha: 0.12, vx: -0.001, vy: -0.0008 },
    { x: 0.50, y: 0.20, r: 550, hue: '230', sat: '70%', lit: '45%', alpha: 0.10, vx: 0.0006, vy: -0.0006 },
  ];

  var STARS = [];
  for (var i = 0; i < 180; i++) {
    STARS.push({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.6 + 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: 0.008 + Math.random() * 0.015,
    });
  }

  function resize() {
    w = canvas.width = section.offsetWidth;
    h = canvas.height = section.offsetHeight;
  }

  function draw() {
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, w, h);

    // Smooth mouse interpolation
    mouse.x += (mouse.tx - mouse.x) * 0.04;
    mouse.y += (mouse.ty - mouse.y) * 0.04;
    var mx = (mouse.x / w) - 0.5;
    var my = (mouse.y / h) - 0.5;

    // Nebula orbs
    ORBS.forEach(function(o) {
      o.x += o.vx; o.y += o.vy;
      if (o.x < -0.3 || o.x > 1.3) o.vx *= -1;
      if (o.y < -0.3 || o.y > 1.3) o.vy *= -1;
      var px = (o.x + mx * 0.08) * w;
      var py = (o.y + my * 0.08) * h;
      var g = ctx.createRadialGradient(px, py, 0, px, py, o.r);
      g.addColorStop(0, 'hsla(' + o.hue + ',' + o.sat + ',' + o.lit + ',' + o.alpha + ')');
      g.addColorStop(0.5, 'hsla(' + o.hue + ',' + o.sat + ',' + o.lit + ',' + (o.alpha * 0.4) + ')');
      g.addColorStop(1, 'hsla(' + o.hue + ',0%,0%,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(px, py, o.r, 0, Math.PI * 2);
      ctx.fill();
    });

    // Stars
    STARS.forEach(function(s) {
      s.phase += s.speed;
      var opacity = (Math.sin(s.phase) * 0.5 + 0.5) * 0.85;
      var px = (s.x + mx * 0.015) * w;
      var py = (s.y + my * 0.015) * h;
      ctx.globalAlpha = opacity;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(px, py, s.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    if (!reduced()) rafId = requestAnimationFrame(draw);
  }

  section.addEventListener('mousemove', function(e) {
    var r = section.getBoundingClientRect();
    mouse.tx = e.clientX - r.left;
    mouse.ty = e.clientY - r.top;
  });

  var ro = new ResizeObserver(function() { resize(); });
  ro.observe(section);
  resize();
  mouse.x = mouse.tx = w / 2;
  mouse.y = mouse.ty = h / 2;
  if (!reduced()) draw();
}

/* ══════════════════════════════════════════════════════
   2. ABOUT — Cyberpunk Perspective Grid
   ══════════════════════════════════════════════════════ */
function initAboutBackground(section) {
  section.style.background = 'linear-gradient(160deg, #030305 0%, #08060f 100%)';

  injectStyle([
    '@keyframes bgGridScroll {',
    '  0%   { background-position: 0 0; }',
    '  100% { background-position: 0 60px; }',
    '}',
    '@keyframes bgGridFadeIn {',
    '  from { opacity: 0; }',
    '  to   { opacity: 1; }',
    '}',
    '.about-cyber-grid {',
    '  position: absolute;',
    '  inset: 0;',
    '  background-image:',
    '    linear-gradient(rgba(255,42,95,0.18) 1px, transparent 1px),',
    '    linear-gradient(90deg, rgba(255,42,95,0.18) 1px, transparent 1px);',
    '  background-size: 60px 60px;',
    '  transform: perspective(500px) rotateX(55deg) scaleX(1.5);',
    '  transform-origin: center bottom;',
    '  animation: bgGridScroll 4s linear infinite, bgGridFadeIn 1.5s ease forwards;',
    '  opacity: 0;',
    '}',
    '.about-cyber-fade {',
    '  position: absolute;',
    '  inset: 0;',
    '  background: radial-gradient(ellipse at 50% 110%, transparent 40%, #030305 70%);',
    '}',
  ].join('\n'));

  var layer = bgLayer(section);
  var grid = document.createElement('div');
  grid.className = 'about-cyber-grid';
  var fade = document.createElement('div');
  fade.className = 'about-cyber-fade';
  layer.appendChild(grid);
  layer.appendChild(fade);

  // Two accent glow blobs
  injectStyle([
    '@keyframes blobFloat {',
    '  0%,100% { transform: translate(0,0) scale(1); }',
    '  50%     { transform: translate(30px,-20px) scale(1.1); }',
    '}',
    '.about-blob {',
    '  position: absolute;',
    '  border-radius: 50%;',
    '  filter: blur(80px);',
    '  animation: blobFloat 12s ease-in-out infinite;',
    '}',
  ].join('\n'));

  var blobs = [
    { w: 500, h: 500, top: '-15%', left: '-10%', bg: 'rgba(255,42,95,0.12)', delay: '0s' },
    { w: 400, h: 400, bottom: '-10%', right: '-8%', bg: 'rgba(74,0,224,0.14)', delay: '6s' },
  ];
  blobs.forEach(function(b) {
    var blob = document.createElement('div');
    blob.className = 'about-blob';
    blob.style.width = b.w + 'px';
    blob.style.height = b.h + 'px';
    blob.style.background = b.bg;
    blob.style.animationDelay = b.delay;
    if (b.top) blob.style.top = b.top;
    if (b.bottom) blob.style.bottom = b.bottom;
    if (b.left) blob.style.left = b.left;
    if (b.right) blob.style.right = b.right;
    layer.appendChild(blob);
  });
}

/* ══════════════════════════════════════════════════════
   3. PROJECTS — Floating Glass Triangles on Canvas
   ══════════════════════════════════════════════════════ */
function initProjectsBackground(section) {
  section.style.background = 'radial-gradient(circle at 20% 80%, #0a0510 0%, #050508 100%)';

  var layer = bgLayer(section);
  var canvas = document.createElement('canvas');
  canvas.style.cssText = 'width:100%;height:100%;display:block;';
  layer.appendChild(canvas);

  var w, h, rafId;

  var SHARDS = [];
  for (var i = 0; i < 18; i++) {
    var isRed = Math.random() < 0.5;
    SHARDS.push({
      x:        Math.random(),
      y:        Math.random(),
      size:     40 + Math.random() * 90,
      rot:      Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.006,
      vy:       -(0.0003 + Math.random() * 0.0008),
      hue:      isRed ? '345' : ('220'),
      alpha:    0.04 + Math.random() * 0.06,
    });
  }

  // Pulsing sonar rings
  var t = 0;

  function resize() {
    w = canvas.width = section.offsetWidth;
    h = canvas.height = section.offsetHeight;
  }

  function draw() {
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, w, h);
    t++;

    SHARDS.forEach(function(s) {
      s.y += s.vy;
      s.rot += s.rotSpeed;
      if (s.y < -0.2) s.y = 1.2;

      var px = s.x * w, py = s.y * h;
      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(s.rot);

      // Glow halo
      var g = ctx.createRadialGradient(0, 0, 0, 0, 0, s.size * 1.4);
      g.addColorStop(0, 'hsla(' + s.hue + ',90%,60%,' + (s.alpha * 1.8) + ')');
      g.addColorStop(1, 'hsla(' + s.hue + ',80%,50%,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(0, 0, s.size * 1.4, 0, Math.PI * 2);
      ctx.fill();

      // Triangle stroke
      ctx.strokeStyle = 'hsla(' + s.hue + ',90%,65%,' + (s.alpha * 2.5) + ')';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, -s.size);
      ctx.lineTo(s.size * 0.866, s.size * 0.5);
      ctx.lineTo(-s.size * 0.866, s.size * 0.5);
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    });

    // Sonar rings
    for (var i = 0; i < 3; i++) {
      var phase = ((t * 0.6 + i * 120) % 360) / 360;
      var maxR = Math.min(w, h) * 0.5;
      var rr = phase * maxR;
      var al = (1 - phase) * 0.06;
      ctx.strokeStyle = 'rgba(255,42,95,' + al + ')';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(w * 0.5, h * 0.5, rr, 0, Math.PI * 2);
      ctx.stroke();
    }

    if (!reduced()) rafId = requestAnimationFrame(draw);
  }

  var ro = new ResizeObserver(function() { cancelAnimationFrame(rafId); resize(); if (!reduced()) draw(); });
  ro.observe(section);
  resize();
  if (!reduced()) draw();
}

/* ══════════════════════════════════════════════════════
   4. SKILLS — Matrix Code Rain (Neon Pink)
   ══════════════════════════════════════════════════════ */
function initSkillsBackground(section) {
  section.style.background = '#020202';

  var layer = bgLayer(section);
  var canvas = document.createElement('canvas');
  canvas.style.cssText = 'width:100%;height:100%;display:block;opacity:0.45;';
  layer.appendChild(canvas);

  var w, h, rafId;
  var FONT_SIZE = 14;
  var CHARS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ{}[]</>'.split('');
  var drops = [];

  function init() {
    w = canvas.width = section.offsetWidth;
    h = canvas.height = section.offsetHeight;
    var cols = Math.floor(w / FONT_SIZE);
    drops = [];
    for (var i = 0; i < cols; i++) {
      drops.push(Math.random() * -(h / FONT_SIZE));
    }
  }

  function draw() {
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(2,2,2,0.12)';
    ctx.fillRect(0, 0, w, h);
    ctx.font = FONT_SIZE + 'px "Space Mono", monospace';

    for (var i = 0; i < drops.length; i++) {
      var char = CHARS[Math.floor(Math.random() * CHARS.length)];
      var isLead = Math.random() > 0.93;

      if (isLead) {
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#ff2a5f';
      } else {
        ctx.fillStyle = 'rgba(255,42,95,' + (0.4 + Math.random() * 0.6) + ')';
        ctx.shadowBlur = 0;
      }

      ctx.fillText(char, i * FONT_SIZE, drops[i] * FONT_SIZE);
      ctx.shadowBlur = 0;

      if (drops[i] * FONT_SIZE > h && Math.random() > 0.975) drops[i] = 0;
      drops[i] += 0.7;
    }

    if (!reduced()) rafId = requestAnimationFrame(draw);
  }

  var ro = new ResizeObserver(function() { cancelAnimationFrame(rafId); init(); if (!reduced()) draw(); });
  ro.observe(section);
  init();
  if (!reduced()) draw();

  // Override skills text for dark bg
  injectStyle([
    '#skills .section-heading,',
    '#skills .skills-category-title { color: #fff !important; }',
    '#skills .skill-pill { color: rgba(255,255,255,0.7) !important; border-color: rgba(255,42,95,0.3) !important; }',
    '#skills .skill-pill:hover { background: rgba(255,42,95,0.2) !important; color: #ff2a5f !important; border-color: rgba(255,42,95,0.5) !important; }',
    '#skills .skills-category-group { background: rgba(0,0,0,0.4) !important; border-color: rgba(255,42,95,0.2) !important; }',
  ].join('\n'));
}

/* ══════════════════════════════════════════════════════
   5. CONTACT — Pulsing Neon Aura Blobs
   ══════════════════════════════════════════════════════ */
function initContactBackground(section) {
  section.style.background = '#030305';

  injectStyle([
    '@keyframes contactAura {',
    '  0%   { transform: scale(0.85) translate(0px, 0px); opacity: 0.6; }',
    '  50%  { transform: scale(1.15) translate(-25px, 20px); opacity: 1; }',
    '  100% { transform: scale(0.85) translate(0px, 0px); opacity: 0.6; }',
    '}',
    '@keyframes contactAuraAlt {',
    '  0%   { transform: scale(1.1) translate(0px, 0px); opacity: 0.5; }',
    '  50%  { transform: scale(0.9) translate(20px, -25px); opacity: 0.9; }',
    '  100% { transform: scale(1.1) translate(0px, 0px); opacity: 0.5; }',
    '}',
    '.contact-aura-red {',
    '  position: absolute;',
    '  width: 700px; height: 700px;',
    '  border-radius: 50%;',
    '  background: radial-gradient(circle, rgba(255,42,95,0.18) 0%, transparent 65%);',
    '  top: -250px; right: -200px;',
    '  animation: contactAura 9s ease-in-out infinite;',
    '}',
    '.contact-aura-purple {',
    '  position: absolute;',
    '  width: 600px; height: 600px;',
    '  border-radius: 50%;',
    '  background: radial-gradient(circle, rgba(74,0,224,0.18) 0%, transparent 65%);',
    '  bottom: -200px; left: -150px;',
    '  animation: contactAuraAlt 7s ease-in-out infinite;',
    '}',
    '.contact-dot-pattern {',
    '  position: absolute;',
    '  inset: 0;',
    '  background-image: radial-gradient(circle, rgba(255,42,95,0.25) 1px, transparent 1px);',
    '  background-size: 36px 36px;',
    '  opacity: 0;',
    '  animation: bgGridFadeIn 2s ease 0.5s forwards;',
    '}',
  ].join('\n'));

  var layer = bgLayer(section);

  var auraRed = document.createElement('div');
  auraRed.className = 'contact-aura-red';
  layer.appendChild(auraRed);

  var auraPurple = document.createElement('div');
  auraPurple.className = 'contact-aura-purple';
  layer.appendChild(auraPurple);

  var dots = document.createElement('div');
  dots.className = 'contact-dot-pattern';
  layer.appendChild(dots);
}

/* ══════════════════════════════════════════════════════
   Boot — initialise all sections once DOM is ready
   ══════════════════════════════════════════════════════ */
export function initBackgroundAnimations() {
  var hero     = document.getElementById('hero');
  var about    = document.getElementById('about');
  var projects = document.getElementById('projects');
  var skills   = document.getElementById('skills');
  var contact  = document.getElementById('contact');

  if (hero)     { initHeroBackground(hero);         liftContent(hero); }
  if (about)    { initAboutBackground(about);        liftContent(about); }
  if (projects) { initProjectsBackground(projects);  liftContent(projects); }
  if (skills)   { initSkillsBackground(skills);      liftContent(skills); }
  if (contact)  { initContactBackground(contact);    liftContent(contact); }
}
