export function renderHero(profile) {
  const tagline = profile?.tagline || "Designing next-generation web applications, hardware and firmware solutions.";
  const linkedinUrl = profile?.socials?.linkedin || "https://www.linkedin.com/in/pdshahidali/";

  return `
    <section class="slide hero-section" id="hero">
      <div class="diagonal-grid"></div>
      <div class="hero-content reveal active">
        <span class="hero-badge">Welcome to my space</span>
        <h1 class="hero-title">
          Electrical and Computer Engineer & <br/>
          <span class="typing-container">
            <span id="typing-target"></span><span class="typing-cursor">|</span>
          </span>
        </h1>
        <p class="hero-tagline">${tagline}</p>
        <div class="hero-actions">
          <a href="#projects" class="btn btn-primary">View Projects</a>
          <a href="${linkedinUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
            LinkedIn <span class="arrow-up">↗</span>
          </a>
        </div>
      </div>
    </section>
  `;
}

export function initHero() {
  const target = document.getElementById('typing-target');
  if (!target) return;

  const roles = [
    "Full-Stack Web Developer",
    "Hardware Systems Engineer",
    "AI-Enabled App Developer",
    "Digital Logic Designer"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      target.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40; // Speed up deletion
    } else {
      target.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80; // Standard typing speed
    }

    // Determine state and speed adjustments
    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2000; // Pause showing full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before typing next word
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();
}
