const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
const motionButton = document.querySelector('.motion-toggle');
let paused = reducedMotion.matches;
function syncMotion() {
  document.documentElement.classList.toggle('motion-paused', paused);
  motionButton.setAttribute('aria-pressed', String(paused));
  motionButton.textContent = paused ? 'Resume motion' : 'Pause motion';
  motionButton.hidden = reducedMotion.matches;
}
motionButton.addEventListener('click', () => { paused = !paused; syncMotion(); });
reducedMotion.addEventListener('change', () => { paused = reducedMotion.matches; syncMotion(); });
syncMotion();

const focusContent = {
  data: { title: 'Data into\ndecisions.', description: 'Python and SQL pipelines that turn raw data into useful reporting.', tools: 'Python · SQL · ETL', symbol: '{ / }', number: '01 / 03' },
  cloud: { title: 'Built for\nthe cloud.', description: 'AWS infrastructure, production monitoring, and troubleshooting across application and database layers.', tools: 'AWS · EC2 · CloudWatch', symbol: '[ ~ ]', number: '02 / 03' },
  deploy: { title: 'Code into\nproduction.', description: 'Containerized workloads and repeatable releases across development, staging, and production.', tools: 'Docker · CI/CD · Git', symbol: '< / >', number: '03 / 03' }
};
const focusCard = document.querySelector('.focus-card');
document.querySelectorAll('[data-focus]').forEach(button => {
  button.addEventListener('click', () => {
    const content = focusContent[button.dataset.focus];
    document.querySelector('#focus-title').textContent = content.title;
    document.querySelector('#focus-description').textContent = content.description;
    document.querySelector('#focus-tools').textContent = content.tools;
    document.querySelector('.focus-symbol').textContent = content.symbol;
    document.querySelector('.focus-top span:last-child').textContent = content.number;
    document.querySelectorAll('[data-focus]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  });
});
focusCard.addEventListener('pointermove', event => {
  if (paused || reducedMotion.matches || !finePointer.matches) return;
  const rect = focusCard.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;
  focusCard.style.setProperty('--tilt-x', `${-y * 8}deg`);
  focusCard.style.setProperty('--tilt-y', `${x * 8}deg`);
});
focusCard.addEventListener('pointerleave', () => {
  focusCard.style.setProperty('--tilt-x', '0deg');
  focusCard.style.setProperty('--tilt-y', '0deg');
});

const skillFilters = document.querySelector('.skill-filters');
skillFilters.hidden = false;
skillFilters.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.skillFilter;
    document.querySelectorAll('[data-skill]').forEach(card => {
      card.hidden = category !== 'all' && !card.dataset.skill.split(' ').includes(category);
    });
    skillFilters.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  });
});

if ('IntersectionObserver' in window) {
  const reveals = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      if (!paused) entry.target.classList.add('is-visible');
      reveals.unobserve(entry.target);
    });
  }, { threshold: 0.05 });
  document.querySelectorAll('.card, .timeline-item, .section-head').forEach(target => {
    target.classList.add('reveal-ready');
    reveals.observe(target);
  });
}
const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
const sections = navLinks.map(link => document.querySelector(link.getAttribute('href')));
let scrollQueued = false;
function updateScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  document.documentElement.style.setProperty('--read-progress', String(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0));
  let current = sections[0];
  sections.forEach(section => { if (section.getBoundingClientRect().top <= 180) current = section; });
  navLinks.forEach(link => {
    if (link.hash === `#${current.id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  scrollQueued = false;
}
function queueScroll() { if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateScroll); } }
window.addEventListener('scroll', queueScroll, { passive: true });
window.addEventListener('resize', queueScroll);
updateScroll();
