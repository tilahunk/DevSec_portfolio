const contentUrl = 'content.json';

async function loadContent() {
  try {
    const response = await fetch(contentUrl);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const content = await response.json();
    applyContent(content);
  } catch (error) {
    console.error('Failed to load dynamic content:', error);
  }
}

function setText(selector, text) {
  const el = document.querySelector(selector);
  if (el && text != null) el.textContent = text;
}

function setImage(selector, src, alt) {
  const el = document.querySelector(selector);
  if (el && src != null) {
    el.src = src;
    if (alt != null) el.alt = alt;
  }
}

function renderList(containerSelector, items, renderItem) {
  const container = document.querySelector(containerSelector);
  if (!container || !Array.isArray(items)) return;
  container.innerHTML = items.map(renderItem).join('');
}

function applyContent(data) {
  if (!data) return;

  document.title = data.metadata?.title || document.title;

  setText('#brand-title', data.brand?.title);
  setText('#brand-subtitle', data.brand?.subtitle);

  setText('#hero-eyebrow', data.hero?.eyebrow);
  setText('#hero-headline', data.hero?.headline);
  setText('#hero-description', data.hero?.description);
  setImage('#hero-photo', data.hero?.photo, 'Professional Photo');
  setLink('#hero-cta', data.hero?.ctaHref, data.hero?.cta);

  setText('#about-heading', data.about?.heading);
  setText('#about-description', data.about?.description);
  setText('#about-paragraph', data.about?.paragraph);
  setText('#about-card-heading', data.about?.cardHeading);
  setText('#about-card-text', data.about?.cardText);

  renderList('#about-list', data.about?.items, item => `<li>${item}</li>`);

  setText('#skills-heading', data.skills?.heading);
  setText('#skills-description', data.skills?.description);
  renderList('#skills-grid', data.skills?.items, item => `
    <div class="skill-card">
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    </div>
  `);

  setText('#experience-heading', data.experience?.heading);
  setText('#experience-description', data.experience?.description);
  renderList('#experience-timeline', data.experience?.items, item => `
    <div class="timeline-item">
      <h3>${item.title}</h3>
      <span>${item.date}</span>
      <p>${item.details}</p>
    </div>
  `);

  setText('#projects-heading', data.projects?.heading);
  setText('#projects-description', data.projects?.description);
  renderList('#projects-grid', data.projects?.items, item => `
    <article class="project-card">
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    </article>
  `);

  setText('#contact-heading', data.contact?.heading);
  setText('#contact-description', data.contact?.description);
  setLink('#contact-email', `mailto:${data.contact?.email}`, data.contact?.email);
  setLink('#contact-linkedin', data.contact?.linkedin?.url, data.contact?.linkedin?.label);
  setLink('#contact-github', data.contact?.github?.url, data.contact?.github?.label);

  setText('#footer-text', data.footer?.text);
}

document.addEventListener('DOMContentLoaded', loadContent);
