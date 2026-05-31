export function renderTimeline(profile) {
  return `
    <section class="slide timeline-section" id="timeline">
      <div class="timeline-container reveal">
        <h2 class="section-heading">Experience & Education</h2>
        
        <div class="timeline">
          <!-- Experience -->
          <div class="timeline-item">
            <div class="timeline-dot icon-dot">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
            </div>
            <div class="timeline-content">
              <span class="timeline-date">May 2025 - Jun 2025</span>
              <h3 class="timeline-title">Full Stack Web Development Intern</h3>
              <h4 class="timeline-subtitle">InAmigos Foundation</h4>
              <ul class="timeline-list">
                <li>Collaborated with team members to design, implement, and optimize website features, improving functionality and overall performance.</li>
                <li>Developed responsive web pages and UI components.</li>
                <li>Frontend design and debugging.</li>
              </ul>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-dot icon-dot">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
            </div>
            <div class="timeline-content">
              <span class="timeline-date">April 2025 - Present</span>
              <h3 class="timeline-title">Neuroinfomatics Research in Center of Neuroinformatics</h3>
              <h4 class="timeline-subtitle">VIT Chennai</h4>
              <ul class="timeline-list">
                <li>Conducting research and data analysis in the field of neuroinformatics for real-world applications.</li>
                <li>Developing and evaluating computational approaches for neuroscience-related research problems.</li>
                <li>Contributing to research findings and publication of a scientific paper.</li>
              </ul>
            </div>
          </div>

          <!-- Education -->
          <div class="timeline-item">
            <div class="timeline-dot icon-dot">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
            </div>
            <div class="timeline-content">
              <span class="timeline-date">2024 - 2028</span>
              <h3 class="timeline-title">B.Tech Electrical & Computer Science Engineering</h3>
              <h4 class="timeline-subtitle">VIT Chennai</h4>
              <p class="timeline-text">Focus on software engineering, AI, embedded systems, and modern web development.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="timeline-item">
            <div class="timeline-dot icon-dot">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
            </div>
            <div class="timeline-content">
              <span class="timeline-date">Till 2024</span>
              <h3 class="timeline-title">Student</h3>
              <h4 class="timeline-subtitle">Kendriya Vidyalaya CRPF, Hyderabad</h4>
              <p class="timeline-text">Completed schooling with a focus on science and mathematics, laying the foundation for a career in technology.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

