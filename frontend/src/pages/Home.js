import { renderNavbar, initNavbar } from '../components/Navbar';

import { renderHero, initHero } from '../components/Hero';
import { renderAbout } from '../components/About';
import { renderProjects } from '../components/ProjectCard';
import { renderSkills } from '../components/SkillBadge';
import { showToast } from '../components/Toast';

let API_BASE_URL = 'http://localhost:5000';

async function detectBackend() {
  const potentialBases = [
    'http://127.0.0.1:5000',
    'http://localhost:5000',
    'http://127.0.0.1:5001',
    'http://localhost:5001',
    'http://127.0.0.1:5002',
    'http://localhost:5002'
  ];

  for (const base of potentialBases) {
    try {
      const controller = new AbortController();
      // FIX: store timeout ID separately so we can clear it,
      // and pass controller.signal (not id.signal) to fetch.
      const timeoutId = setTimeout(() => controller.abort(), 500);
      const res = await fetch(`${base}/api/profile`, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (res.ok) {
        console.log(`Connected to API server at ${base}`);
        API_BASE_URL = base;
        return true;
      }
    } catch (e) {
      // AbortError or network error â€” try next port
    }
  }
  return false;
}

// Fallback data in case API server is not running
const FALLBACK_PROFILE = {
  name: "PD Shaheed Ali",
  role: "ECSE Student @ VIT Chennai | Full-Stack Developer | AI/ML Enthusiast | Embedded Systems & IoT Explorer",
  tagline: "I build intelligent software, full-stack applications, and embedded systems that solve real-world problems through technology and innovation.",
  bio: "Hi, I'm PD Shaheed Ali, an Electrical and Computer Science Engineering student at VIT Chennai passionate about building intelligent software and innovative technology solutions.\n\nMy interests span Artificial Intelligence, Machine Learning, Full-Stack Development, Embedded Systems, IoT, and Software Engineering. I enjoy creating projects that combine modern software technologies with real-world problem solving, from AI-powered applications and data-driven platforms to embedded and hardware-integrated systems.",
  stats: {
    institution: "VIT Chennai",
    graduationYear: "2028",
    location: "Chennai, India"
  },
  socials: {
    linkedin: "https://www.linkedin.com/in/pdshahidali/",
    github: "https://github.com/omecreates",
    email: "mailto:phenomenalonep28@gmail.com"
  }
};

const FALLBACK_PROJECTS = [
  {
    id: 1,
    title: "StockGlobe",
    description: "AI-powered stock market intelligence platform that leverages machine learning and real-time market data to analyze trends, generate insights, and support informed investment decisions.",
    techBadges: ["React", "TypeScript", "FastAPI", "Python", "AI/ML", "Stock Analytics", "REST API"],
    githubUrl: "https://github.com/omecreates/StockGlobe",
    featured: true
  },
  {
    id: 2,
    title: "AI Resume Analyzer",
    description: "AI-powered resume analyzer leveraging NLP to extract skills, evaluate ATS compatibility, and provide intelligent resume improvement suggestions.",
    techBadges: ["React", "Flask", "Python", "NLP", "Machine Learning", "spaCy", "Scikit-Learn"],
    githubUrl: "https://github.com/omecreates/ResumeAnalyser",
    featured: true
  },
  {
    id: 3,
    title: "Travel Partner Finder",
    description: "Android application that helps travelers find compatible travel partners based on destination, route, timing, and travel preferences.",
    techBadges: ["Java", "Android Studio", "Firebase", "Mobile Development"],
    githubUrl: "https://github.com/omecreates",
    featured: false
  },
  {
    id: 4,
    title: "Doppler Radar Monitoring System",
    description: "Arduino-based system using dual Doppler radar sensors and a 16x2 LCD to detect motion, measure speed, and estimate distance in real time.",
    techBadges: ["Arduino", "Embedded Systems", "IoT", "Sensors", "C++"],
    githubUrl: "https://github.com/omecreates",
    featured: false
  },
  {
    id: 5,
    title: "Java Search Engine",
    description: "Designed and developed a search engine using Java that processes and indexes textual data, enabling fast keyword-based retrieval and relevance ranking through optimized data structures and algorithms.",
    techBadges: ["Java", "Data Structures", "Algorithms", "Search Indexing", "OOP"],
    githubUrl: "https://github.com/omecreates/BasicJavaSearchEngine",
    featured: false
  }
];
const FALLBACK_SKILLS = [
  {
    category: "Languages",
    items: ["Java", "Python", "C", "C++", "JavaScript", "TypeScript"]
  },
  {
    category: "Frontend",
    items: ["React", "HTML5", "CSS3", "Responsive Design", "Vite"]
  },
  {
    category: "Backend",
    items: ["FastAPI", "Flask", "REST APIs", "JSON"]
  },
  {
    category: "AI / Machine Learning",
    items: ["Machine Learning", "NLP", "Scikit-Learn", "spaCy", "NLTK"]
  },
  {
    category: "Embedded & IoT",
    items: ["Arduino", "Embedded C", "Sensors", "I2C", "UART", "IoT"]
  },
  {
    category: "Developer Tools",
    items: ["Git", "GitHub", "Linux", "VS Code", "Postman"]
  }
];

export async function renderHome(appElement) {
  let profile = FALLBACK_PROFILE;
  let projects = FALLBACK_PROJECTS;
  let skills = FALLBACK_SKILLS;

  // Scan and discover the backend port
  const hasBackend = await detectBackend();

  if (hasBackend) {
    try {
      const profileRes = await fetch(`${API_BASE_URL}/api/profile`);
      if (profileRes.ok) profile = await profileRes.json();
    } catch (e) {
      console.warn("Failed to fetch profile API.", e);
    }

    try {
      const projectsRes = await fetch(`${API_BASE_URL}/api/projects`);
      if (projectsRes.ok) projects = await projectsRes.json();
    } catch (e) {
      console.warn("Failed to fetch projects API.", e);
    }

    try {
      const skillsRes = await fetch(`${API_BASE_URL}/api/skills`);
      if (skillsRes.ok) skills = await skillsRes.json();
    } catch (e) {
      console.warn("Failed to fetch skills API.", e);
    }
  } else {
    console.log("No API server found. Operating in local static mockup mode.");
  }

  // Assemble HTML
  appElement.innerHTML = `
    ${renderNavbar()}
    
    <div class="slides-container">
      ${renderHero(profile)}
      ${renderAbout(profile)}
      ${renderProjects(projects)}
      ${renderSkills(skills)}
      ${renderContactSection(profile)}
    </div>
    
    ${renderFooter(profile)}
  `;

  // Initialize interactive components
  initNavbar();
  initHero();
  initScrollReveal();
  initContactForm();
}

function renderContactSection(profile) {
  const linkedin = profile?.socials?.linkedin || "https://www.linkedin.com/in/pdshahidali/";
  const github = profile?.socials?.github || "https://github.com/omecreates";
  const email = profile?.socials?.email || "mailto:phenomenalonep28@gmail.com";

  return `
    <section class="slide contact-section" id="contact">
      <ContactBackground />
      <div class="contact-container reveal">
        <h2 class="section-heading">Get In Touch</h2>

        <p class="contact-subtitle">
          Have a project, internship opportunity, or collaboration in mind?
          I'd love to hear from you.
        </p>

        <div class="contact-grid">

          <!-- Contact Form -->
          <div class="contact-form-wrapper">
            <form id="contact-form" class="contact-form">

              <div class="form-row">
                <div class="form-group">
                  <label for="name" class="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    class="form-control"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="email" class="form-label">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    class="form-control"
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>

              <div class="form-group">
  <label for="subject" class="form-label">Subject</label>
  <input
    type="text"
    id="subject"
    name="subject"
    class="form-control"
    placeholder="What's this regarding?"
    required
  />
</div>

<div class="form-group">
  <label for="message" class="form-label">Message</label>
  <textarea
    id="message"
    name="message"
    class="form-control"
    placeholder="Tell me about your project, opportunity, or message..."
    required
  ></textarea>
</div>

              <button type="submit" class="btn btn-cta">
                Send Message â†’
              </button>

            </form>
          </div>

          <!-- Contact Cards -->
          <div class="contact-cards">

            <!-- LinkedIn -->
            <a
              href="${linkedin}"
              target="_blank"
              rel="noopener noreferrer"
              class="social-contact-card linkedin-card"
            >
              <div class="card-icon">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>

              <div class="card-details">
                <span class="card-tag">Connect</span>
                <h3>LinkedIn â†—</h3>
                <p>Connect with me and explore my professional journey.</p>
              </div>
            </a>

            <!-- GitHub -->
            <a
              href="${github}"
              target="_blank"
              rel="noopener noreferrer"
              class="social-contact-card github-card"
            >
              <div class="card-icon">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>

              <div class="card-details">
                <span class="card-tag">Projects</span>
                <h3>GitHub â†—</h3>
                <p>Browse my AI, Full-Stack, Java, and Embedded Systems projects.</p>
              </div>
            </a>

            <!-- Email -->
            <a
              href="${email}"
              class="social-contact-card email-card"
            >
              <div class="card-icon">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M12 12.713l11.985-8.713h-23.97l11.985 8.713zm0 2.574l-12-8.727v11.44h24v-11.44l-12 8.727z"/></svg>
              </div>

              <div class="card-details">
                <span class="card-tag">Direct Contact</span>
                <h3>Email â†—</h3>
                <p>Reach out directly for internships, opportunities, and collaborations.</p>
              </div>
            </a>

          </div>
        </div>
      </div>
    </section>
  `;
}

function renderFooter(profile) {
  const currentYear = new Date().getFullYear();
  const name = profile?.name || "PD Shaheed Ali";
  const tagline = profile?.tagline || "Building intelligent software, AI-powered solutions, and innovative technology.";
  const linkedin = profile?.socials?.linkedin || "https://www.linkedin.com/in/pdshahidali/";
  const github = profile?.socials?.github || "https://github.com/omecreates";
  const email = profile?.socials?.email || "mailto:phenomenalonep28@gmail.com";

  return `
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-top">
          <p class="footer-name">${name}</p>
          <p class="footer-tagline">${tagline}</p>
        </div>
        <div class="footer-bottom">
          <div class="footer-left">
            <span>&copy; ${currentYear} ${name}. All Rights Reserved.</span>
          </div>
          <div class="footer-right">
            <a href="${github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a href="${linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="${email}" aria-label="Email">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 12.713l11.985-8.713h-23.97l11.985 8.713zm0 2.574l-12-8.727v11.44h24v-11.44l-12 8.727z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  `;
}

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  
  const revealOnScroll = () => {
    reveals.forEach(el => {
      const windowHeight = window.innerHeight;
      const elementTop = el.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < windowHeight - elementVisible) {
        el.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  // Run once to show items already in view
  revealOnScroll();
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value
    };

    // Submitting state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        showToast(result.success || "Message sent successfully!", "success");
        form.reset();
      } else {
        showToast(result.error || "Submission failed.", "error");
      }
    } catch (err) {
      console.error("Contact form post error:", err);
      showToast("Could not reach the server. Message not saved.", "error");
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}
