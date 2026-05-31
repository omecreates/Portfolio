

export function renderSkills(skillCategories) {
  if (!skillCategories || skillCategories.length === 0) {
    return `<p class="no-skills">No skills loaded.</p>`;
  }

  // Predefined SVG icons mapping
  const skillIcons = {
    'html': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 2l1.6 17.6L12 22l6.4-2.4L20 2H4z"/><path d="M18 6H6.5l.3 4h10.4l-.5 5-4.2 1.5L8.3 15l-.2-2.5"/></svg>`,
    'css': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 2l1.6 17.6L12 22l6.4-2.4L20 2H4z"/><path d="M18 6H6.5l.3 4h10.4l-.5 5-4.2 1.5L8.3 15l-.2-2.5"/></svg>`,
    'javascript': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h18v18H3z"/><path d="M11 15v2a2 2 0 1 1-4 0v-1m9-4v-1a2 2 0 1 1 4 0v1a2 2 0 1 1-4 0v1a2 2 0 1 1 4 0v1"/></svg>`,
    'react': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/></svg>`,
    'python': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c-5.5 0-5.5 2.5-5.5 2.5v3h5.5V9H6s-2 0-2 2.5 0 2.5 0 2.5h2v-2h5s2 0 2-2.5V7c0-2-2.5-5-5-5z"/><path d="M12 22c5.5 0 5.5-2.5 5.5-2.5v-3h-5.5V15h6s2 0 2-2.5 0-2.5 0-2.5h-2v2h-5s-2 0-2 2.5V17c0 2 2.5 5 5 5z"/></svg>`,
    'git': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 15v-2a3 3 0 0 0-3-3H9M6 9v6"/></svg>`,
    'fastapi': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2v20"/><path d="M12 12h10"/></svg>`,
    'flask': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6v5L19 19H5L9 8z"/><path d="M5 19v2h14v-2"/></svg>`,
    'scikit': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 8V4"/><path d="M12 20v-4"/><path d="M4 12h4"/><path d="M20 12h-4"/></svg>`,
    'machine learning': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M9 14h6"/><path d="M9 10h6"/><path d="M12 14v4"/><path d="M12 6v4"/></svg>`,
    'default': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`
  };

  const getIcon = (skillName) => {
    const key = Object.keys(skillIcons).find(k => skillName.toLowerCase().includes(k));
    return key ? skillIcons[key] : skillIcons['default'];
  };

  const categoryBlocks = skillCategories.map(cat => {
    const skillCards = cat.items.map(skill => 
      `<div class="skill-card">
        <div class="skill-icon">${getIcon(skill)}</div>
        <span class="skill-name">${skill}</span>
       </div>`
    ).join('');

    return `
      <div class="skills-category-group">
        <h3 class="skills-category-title">${cat.category}</h3>
        <div class="skills-cards-container">
          ${skillCards}
        </div>
      </div>
    `;
  }).join('');

  return `
    <section class="slide skills-section" id="skills">
      <div class="skills-container reveal">
        <h2 class="section-heading">Skills</h2>
        <div class="skills-grid">
          ${categoryBlocks}
        </div>
      </div>
    </section>
  `;
}
