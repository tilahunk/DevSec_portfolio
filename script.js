const contentUrl = 'content.json';

const selectors = {
  subtitle: '#brand-subtitle',
  hero: {
    eyebrow: '#hero-eyebrow',
    headline: '#hero-headline',
    description: '#hero-description',
    photo: '#hero-photo',
    cta: '#hero-cta',
    badges: '#hero-badges',
    stats: '#hero-stats'
  },
  about: {
    heading: '#about-heading',
    description: '#about-description',
    paragraph: '#about-paragraph',
    list: '#about-list',
    cardHeading: '#about-card-heading',
    cardText: '#about-card-text'
  },
  skills: {
    heading: '#skills-heading',
    description: '#skills-description',
    grid: '#skills-grid'
  },
  experience: {
    heading: '#experience-heading',
    description: '#experience-description',
    timeline: '#experience-timeline'
  },
  projects: {
    heading: '#projects-heading',
    description: '#projects-description',
    grid: '#projects-grid'
  },
  contact: {
    heading: '#contact-heading',
    description: '#contact-description',
    email: '#contact-email',
    linkedin: '#contact-linkedin',
    github: '#contact-github'
  },
  footer: '#footer-text'
};

async function loadContent() {
  try {
    const response = await fetch(contentUrl);
    if (!response.ok) throw new Error(`Failed to load ${contentUrl} (${response.status})`);
    const content = await response.json();
    populatePage(content);
  } catch (error) {
    console.error(error);
  }
}

function setText(selector, text) {
  const node = document.querySelector(selector);
  if (node && text != null) node.textContent = text;
}

function setAttribute(selector, name, value) {
  const node = document.querySelector(selector);
  if (node && value != null) node.setAttribute(name, value);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function isPlaceholderContactValue(value) {
  if (!value || typeof value !== 'string') return true;

  const normalizedValue = value.trim().toLowerCase();
  return normalizedValue.includes('your-profile') ||
    normalizedValue.includes('your-username') ||
    normalizedValue.includes('your.email@example.com');
}

function renderList(selector, items, renderItem) {
  const node = document.querySelector(selector);
  if (!node || !Array.isArray(items)) return;
  node.innerHTML = items.map(renderItem).join('');
}

function initializeRevealAnimation() {
  const revealNodes = document.querySelectorAll(
    '.section-heading, .hero-copy, .hero-panel, .stat-card, .story-card, .capability-card, .skill-card, .project-card, .timeline-item, .contact-card'
  );

  revealNodes.forEach(node => node.classList.add('reveal'));

  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: '0px 0px -40px 0px' }
  );

  revealNodes.forEach(node => revealObserver.observe(node));
}

function initializeActiveNav() {
  const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
  const sectionIds = navLinks
    .map(link => link.getAttribute('href'))
    .filter(href => href && href.startsWith('#'));

  const sections = sectionIds
    .map(id => document.querySelector(id))
    .filter(Boolean);

  if (!navLinks.length || !sections.length) return;

  const setActiveNav = activeId => {
    navLinks.forEach(link => {
      const isActive = link.getAttribute('href') === `#${activeId}`;
      link.classList.toggle('active', isActive);
    });
  };

  const sectionObserver = new IntersectionObserver(
    entries => {
      const visibleEntry = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visibleEntry?.target?.id) setActiveNav(visibleEntry.target.id);
    },
    { threshold: [0.2, 0.45, 0.7], rootMargin: '-25% 0px -50% 0px' }
  );

  sections.forEach(section => sectionObserver.observe(section));
}

function populatePage(data) {
  if (!data) return;

  document.title = data.metadata?.title || document.title;

  setText(selectors.subtitle, data.brand?.subtitle);

  setText(selectors.hero.eyebrow, data.hero?.eyebrow);
  setText(selectors.hero.headline, data.hero?.headline);
  setText(selectors.hero.description, data.hero?.description);

  const heroPhoto = document.querySelector(selectors.hero.photo);
  if (heroPhoto && data.hero?.photo) {
    heroPhoto.src = data.hero.photo;
    heroPhoto.alt = data.hero?.photoAlt || 'Professional portrait';
  }

  setAttribute(selectors.hero.cta, 'href', data.hero?.ctaHref || '#contact');
  setText(selectors.hero.cta, data.hero?.cta);
  renderList(selectors.hero.badges, data.hero?.badges, item => `<li>${escapeHtml(item)}</li>`);
  renderList(selectors.hero.stats, data.hero?.stats, item => `
    <article class="stat-card">
      <span class="stat-value">${escapeHtml(item.value)}</span>
      <span class="stat-label">${escapeHtml(item.label)}</span>
    </article>
  `);

  setText(selectors.about.heading, data.about?.heading);
  setText(selectors.about.description, data.about?.description);
  setText(selectors.about.paragraph, data.about?.paragraph);
  setText(selectors.about.cardHeading, data.about?.cardHeading);
  setText(selectors.about.cardText, data.about?.cardText);
  renderList(selectors.about.list, data.about?.items, item => `<li>${escapeHtml(item)}</li>`);

  setText(selectors.skills.heading, data.skills?.heading);
  setText(selectors.skills.description, data.skills?.description);
  renderList(selectors.skills.grid, data.skills?.items, item => `
    <article class="skill-card">
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.description)}</p>
    </article>
  `);

  setText(selectors.experience.heading, data.experience?.heading);
  setText(selectors.experience.description, data.experience?.description);
  renderList(selectors.experience.timeline, data.experience?.items, item => `
    <article class="timeline-item">
      <h3>${escapeHtml(item.title)}</h3>
      <span>${escapeHtml(item.date)}</span>
      <p>${escapeHtml(item.details)}</p>
    </article>
  `);

  setText(selectors.projects.heading, data.projects?.heading);
  setText(selectors.projects.description, data.projects?.description);
  renderList(selectors.projects.grid, data.projects?.items, item => `
    <article class="project-card">
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.description)}</p>
    </article>
  `);

  setText(selectors.contact.heading, data.contact?.heading);
  setText(selectors.contact.description, data.contact?.description);

  if (!isPlaceholderContactValue(data.contact?.email)) {
    setAttribute(selectors.contact.email, 'href', `mailto:${data.contact.email}`);
    setText(selectors.contact.email, data.contact.email);
  }

  if (!isPlaceholderContactValue(data.contact?.linkedin?.url) && !isPlaceholderContactValue(data.contact?.linkedin?.label)) {
    setAttribute(selectors.contact.linkedin, 'href', data.contact.linkedin.url);
    setText(selectors.contact.linkedin, data.contact.linkedin.label);
  }

  if (!isPlaceholderContactValue(data.contact?.github?.url) && !isPlaceholderContactValue(data.contact?.github?.label)) {
    setAttribute(selectors.contact.github, 'href', data.contact.github.url);
    setText(selectors.contact.github, data.contact.github.label);
  }

  setText(selectors.footer, data.footer?.text);
}

function initializeUi() {
  initializeRevealAnimation();
  initializeActiveNav();
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadContent();
  initializeUi();
});
