export function renderAbout(profile) {
  const bio = profile?.bio || "I am an Electrical and computer science Engineer passionate about low-level programming and circuits.";
  const stats = profile?.stats || {
    institution: "Vellore Institute of Technology",
    graduationYear: "2028",
    location: "Chennai, India"
  };

  return `
    <section class="slide about-section" id="about">
      <div class="about-container reveal">
        <h2 class="section-heading">About Me</h2>
        
        <div class="about-grid">
          <!-- Left: Styled Stats Card -->
          <div class="stats-card">
            <div class="card-header">
              <span class="card-dot red"></span>
              <span class="card-dot black"></span>
              <span class="card-dot black"></span>
              <span class="card-title">STATUS_REPORT.log</span>
            </div>
            <div class="card-body">
              <div class="stat-item">
                <span class="stat-label">INSTITUTION:</span>
                <span class="stat-value">${stats.institution}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">EXPECTED GRAD:</span>
                <span class="stat-value">${stats.graduationYear}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">LOCATION:</span>
                <span class="stat-value">${stats.location}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">FOCUS:</span>
                <span class="stat-value">Full Stack Web Development</span>
              </div>
            </div>
          </div>

          <!-- Right: Short Bio Paragraph -->
          <div class="bio-content">
            <h3 class="bio-heading">Designing hardware and software with artificial intelligence.</h3>
            <p class="bio-text">${bio}</p>
            <div class="bio-quote">
              <span class="quote-mark">“</span>
              <span class="quote-text">The best hardware is only as good as the firmware that brings it to life.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
