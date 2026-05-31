

export function renderProjects(projects) {
  if (!projects || projects.length === 0) {
    return `<p class="no-projects">No projects loaded.</p>`;
  }

  const projectCards = projects.map(project => {
    const featuredBadge = project.featured 
      ? `<span class="project-badge-featured">Featured</span>` 
      : '';
      
    const badges = project.techBadges.map(tech => 
      `<span class="tech-badge">${tech}</span>`
    ).join('');

    const githubLink = project.githubUrl 
      ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-github-link" aria-label="GitHub Repository">
          <svg class="github-icon" viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
          </svg> 
          <span class="github-text">Source</span>
         </a>`
      : '';

    const imageHtml = project.imageUrl 
      ? `<img src="${project.imageUrl}" alt="${project.title} Preview" class="project-thumbnail">`
      : `<div class="project-thumbnail placeholder">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline>
          </svg>
         </div>`;

    return `
      <div class="project-card ${project.featured ? 'featured' : ''}">
        <div class="project-image-wrapper">
          ${imageHtml}
        </div>
        <div class="project-card-content">
          <div class="project-card-header">
            ${featuredBadge}
            <h3 class="project-title">${project.title}</h3>
          </div>
          <p class="project-desc">${project.description}</p>
          <div class="project-tech-badges">
            ${badges}
          </div>
          <div class="project-card-footer">
            ${githubLink}
          </div>
        </div>
      </div>
    `;
  }).join('');

  return `
    <section class="slide projects-section" id="projects">
      <div class="projects-container reveal">
        <h2 class="section-heading">Projects</h2>
        <div class="projects-grid">
          ${projectCards}
        </div>
      </div>
    </section>
  `;
}
