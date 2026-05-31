export function renderAbout(profile) {
  const bio = profile?.bio || "I am an Electrical and computer science Engineer passionate about low-level programming and circuits.";
  const stats = profile?.stats || {
    institution: "Vellore Institute of Technology",
    graduationYear: "2028",
    location: "Chennai, India"
  };

  const illustration = `
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" class="about-illustration">
      <!-- Glow -->
      <circle cx="200" cy="140" r="100" fill="var(--color-accent)" opacity="0.1" filter="blur(30px)"/>
      
      <!-- Desk -->
      <path d="M40 260 L360 260 L390 290 L10 290 Z" fill="var(--color-surface)" stroke="var(--color-border)"/>
      
      <!-- Monitor 1 -->
      <rect x="80" y="90" width="140" height="90" rx="8" fill="#18181b" stroke="var(--color-border)" stroke-width="4"/>
      <rect x="90" y="100" width="120" height="70" rx="4" fill="#09090b"/>
      <rect x="100" y="110" width="60" height="4" rx="2" fill="var(--color-accent)"/>
      <rect x="100" y="120" width="80" height="4" rx="2" fill="var(--color-text-muted)"/>
      <rect x="100" y="130" width="40" height="4" rx="2" fill="var(--color-text-muted)"/>
      <rect x="100" y="150" width="50" height="4" rx="2" fill="var(--color-accent)"/>
      <!-- Monitor 1 Stand -->
      <rect x="140" y="180" width="20" height="30" fill="var(--color-border)"/>
      <rect x="110" y="210" width="80" height="6" rx="3" fill="var(--color-border)"/>
      
      <!-- Monitor 2 (Vertical/Laptop) -->
      <rect x="240" y="120" width="80" height="120" rx="6" fill="#18181b" stroke="var(--color-border)" stroke-width="4"/>
      <rect x="245" y="125" width="70" height="110" rx="2" fill="#09090b"/>
      <rect x="255" y="140" width="40" height="4" rx="2" fill="var(--color-accent)"/>
      <rect x="255" y="150" width="50" height="4" rx="2" fill="var(--color-text-muted)"/>
      <rect x="255" y="160" width="30" height="4" rx="2" fill="var(--color-text-muted)"/>
      <rect x="255" y="190" width="45" height="4" rx="2" fill="var(--color-accent)"/>
      
      <!-- Plant -->
      <path d="M60 210 Q40 180 70 170 Q80 190 60 210 Z" fill="var(--color-accent-dim)"/>
      <path d="M60 210 Q80 170 50 160 Q40 180 60 210 Z" fill="var(--color-accent)"/>
      <rect x="50" y="210" width="20" height="20" rx="4" fill="var(--color-surface)"/>
      
      <!-- Coffee Mug -->
      <rect x="330" y="230" width="20" height="25" rx="4" fill="var(--color-text-muted)"/>
      <path d="M350 235 C360 235 360 250 350 250" stroke="var(--color-text-muted)" stroke-width="3" fill="none"/>
    </svg>
  `;

  return `
    <section class="slide about-section" id="about">
      <div class="about-container reveal">
        <h2 class="section-heading">About Me</h2>
        
        <div class="about-grid">
          <!-- Left: Illustration -->
          <div class="about-illustration-wrapper">
            ${illustration}
          </div>

          <!-- Right: Bio & Stats -->
          <div class="bio-content">
            <h3 class="bio-heading">Building intelligent software, full-stack applications, and embedded systems.</h3>
            <p class="bio-text">${bio}</p>
            
            <div class="about-stats-mini">
              <div class="mini-stat">
                <span class="stat-icon">🎓</span>
                <div>
                  <span class="stat-val">${stats.institution}</span>
                  <span class="stat-lbl">Class of ${stats.graduationYear}</span>
                </div>
              </div>
              <div class="mini-stat">
                <span class="stat-icon">📍</span>
                <div>
                  <span class="stat-val">${stats.location}</span>
                  <span class="stat-lbl">Based In</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
