export function renderSkills(skillCategories) {
  if (!skillCategories || skillCategories.length === 0) {
    return `<p class="no-skills">No skills loaded.</p>`;
  }

  const categoryBlocks = skillCategories.map(cat => {
    const skillPills = cat.items.map(skill => 
      `<div class="skill-pill">${skill}</div>`
    ).join('');

    return `
      <div class="skills-category-group">
        <h3 class="skills-category-title">${cat.category}</h3>
        <div class="skills-pills-container">
          ${skillPills}
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
