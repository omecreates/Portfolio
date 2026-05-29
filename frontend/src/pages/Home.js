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
      // AbortError or network error — try next port
    }
  }
  return false;
}

// Fallback data in case API server is not running
const FALLBACK_PROFILE = {
  name: "PD Shaheed Ali Khan",
  role: "Electrical and Computer Engineer and full-stack web developer",
  tagline: "Bridging physical circuits and low-level code to build robust hardware-software ecosystems.",
  bio: "An Electrical and Computer Science Engineering student at VIT Chennai passionate about building intelligent software and innovative technology solutions. My interests include Artificial Intelligence, Machine Learning, Full-Stack Development, Embedded Systems, IoT, and Software Engineering. I enjoy creating projects that combine modern software technologies with real-world problem solving, from AI-powered applications and data-driven platforms to embedded and hardware-integrated systems.",
  stats: {
    institution: "VIT University",
    graduationYear: "2028",
    location: "Chennai, India"
  },
  socials: {
    linkedin: "https://www.linkedin.com/in/pdshahidali/",
    github: "https://github.com/omecreates"
  }
};

const FALLBACK_PROJECTS = [
  {
    id: 1,
    title: "AI resume analyzer",
    description: "AI-powered resume analysis platform that evaluates ATS compatibility, extracts key skills from resumes, and provides actionable recommendations to improve job application success.",
    techBadges: ["React","Flask","Python","spaCy","NLTK","Scikit-Learn","NLP","PDF Processing"],
    githubUrl: "https://github.com/omecreates/ResumeAnalyser",
    featured: true
  },
  {
    id: 2,
    title: "AI Stock Analysis Dashboard",
    description: "AI-powered stock market intelligence platform that leverages machine learning and real-time market data to analyze trends, generate insights, and support informed investment decisions.",
    techBadges: [
  "React",
  "TypeScript",
  "FastAPI",
  "Python",
  "Machine Learning",
  "Stock Analytics",
  "REST API"
],
    githubUrl: "https://github.com/omecreates/maze-fpga-bot",
    featured: true
  },
  {
    id: 3,
    title: "Wearable BLE ECG Monitor",
    description: "Ultra-low power wearable ECG using ESP32-S3 and AD8232 frontend. Runs IIR filters to clean noise, and streams data over BLE to a custom mobile dashboard.",
    techBadges: ["ESP32-S3", "BLE", "AD8232", "DSP", "Mobile App"],
    githubUrl: "https://github.com/omecreates/ble-ecg-wearable",
    featured: false
  },
  {
    id: 4,
    title: "Digitally Controlled Buck-Boost Converter",
    description: "A 4-layer PCB for a 100W synchronous buck-boost converter. Closed-loop PID controller designed in STM32 to regulate output voltage with sub-millisecond response.",
    techBadges: ["KiCad", "STM32", "Power Electronics", "PID Control"],
    githubUrl: "https://github.com/omecreates/sync-buck-boost",
    featured: false
  }
];

const FALLBACK_SKILLS = [
  {
    category: "Hardware & PCB Design",
    items: ["KiCad", "Altium Designer", "High-speed Routing", "Analog Frontends", "I2C / SPI / UART / CAN"]
  },
  {
    category: "Embedded Firmware",
    items: ["Embedded C/C++", "FreeRTOS", "Verilog (FPGA)", "STM32 CubeMX", "ESP-IDF / Arduino"]
  },
  {
    category: "IoT & Networking",
    items: ["MQTT / CoAP", "BLE / Wi-Fi", "micro-ROS", "HTTP/REST APIs"]
  },
  {
    category: "Tools & Software",
    items: ["Git / GitHub", "Python", "Linux Bash", "MATLAB & Simulink"]
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
  const linkedin = profile?.socials?.linkedin || "#";
  const github = profile?.socials?.github || "#";

  return `
    <section class="slide contact-section" id="contact">
      <div class="contact-container reveal">
        <h2 class="section-heading">Let's build something.</h2>
        
        <div class="contact-grid">
          <!-- Contact Form -->
          <div class="contact-form-wrapper">
            <form id="contact-form" class="contact-form">
              <div class="form-row">
                <div class="form-group">
                  <label for="name" class="form-label">Name</label>
                  <input type="text" id="name" name="name" class="form-control" placeholder="Enter your name" required />
                </div>
                <div class="form-group">
                  <label for="email" class="form-label">Email Address</label>
                  <input type="email" id="email" name="email" class="form-control" placeholder="name@company.com" required />
                </div>
              </div>
              
              <div class="form-group">
                <label for="subject" class="form-label">Subject</label>
                <input type="text" id="subject" name="subject" class="form-control" placeholder="Project collaboration..." required />
              </div>
              
              <div class="form-group">
                <label for="message" class="form-label">Message</label>
                <textarea id="message" name="message" class="form-control" placeholder="Tell me about your hardware or firmware requirements..." required></textarea>
              </div>
              
              <button type="submit" class="btn btn-cta">Send Message</button>
            </form>
          </div>

          <!-- Contact Cards -->
          <div class="contact-cards">
            <!-- LinkedIn Card -->
            <a href="${linkedin}" target="_blank" rel="noopener noreferrer" class="social-contact-card linkedin-card">
              <div class="card-icon">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
              <div class="card-details">
                <span class="card-tag">Professional Network</span>
                <h3>LinkedIn ↗</h3>
                <p>Let's connect professionally and discuss technology.</p>
              </div>
            </a>

            <!-- GitHub Card -->
            <a href="${github}" target="_blank" rel="noopener noreferrer" class="social-contact-card github-card">
              <div class="card-icon">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <div class="card-details">
                <span class="card-tag">Code Repositories</span>
                <h3>GitHub ↗</h3>
                <p>Explore my open-source code and firmware libraries.</p>
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
  const name = profile?.name || "Shahid";
  const linkedin = profile?.socials?.linkedin || "#";
  const github = profile?.socials?.github || "#";

  return `
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-left">
          <span>&copy; ${currentYear} ${name}. All Rights Reserved.</span>
          <span class="footer-divider">|</span>
          <span>Built with ❤️ for ECE</span>
        </div>
        <div class="footer-right">
          <a href="${linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="${github}" target="_blank" rel="noopener noreferrer">GitHub</a>
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
