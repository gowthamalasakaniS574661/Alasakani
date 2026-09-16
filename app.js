(() => {
  'use strict';
  const root = document.documentElement;
  root.classList.add('js');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const pointer = matchMedia('(hover: hover) and (pointer: fine)');
  let paused = reduced.matches;
  try { paused = paused || localStorage.getItem('ga-motion-paused') === 'true'; } catch {}
  const motionButton = document.querySelector('.motion-toggle');
  function syncMotion() {
    root.classList.toggle('motion-paused', paused || reduced.matches);
    if (motionButton) {
      motionButton.hidden = reduced.matches;
      motionButton.setAttribute('aria-pressed', String(paused));
      motionButton.textContent = paused ? 'Resume motion' : 'Pause motion';
    }
  }
  motionButton?.addEventListener('click', () => {
    paused = !paused;
    try { localStorage.setItem('ga-motion-paused', String(paused)); } catch {}
    syncMotion();
  });
  reduced.addEventListener('change', syncMotion);
  syncMotion();

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');
  const mobile = matchMedia('(max-width: 600px)');
  if (menuButton && nav) {
    menuButton.hidden = false;
    const setMenu = (open, focus = false) => {
      nav.classList.toggle('is-open', open);
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.querySelector('.menu-text').textContent = open ? 'Close' : 'Menu';
      if (focus) menuButton.focus();
    };
    menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
    nav.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) setMenu(false, true);
    });
    document.addEventListener('click', event => {
      if (!event.target.closest('.header')) setMenu(false);
    });
    document.querySelector('.header').addEventListener('focusout', () => {
      requestAnimationFrame(() => { if (!document.activeElement.closest('.header')) setMenu(false); });
    });
    mobile.addEventListener('change', () => setMenu(false));
  }

  const focus = {
  "data": [
    "Raw data.\nReal insight.",
    "Python and SQL. From datasets to decisions."
  ],
  "analytics": [
    "Clear metrics.\nBetter decisions.",
    "Operational dashboards, validation, and stakeholder reporting."
  ],
  "pipelines": [
    "Reliable data.\nFrom the start.",
    "Spark, Airflow, and AWS. From ingestion to analysis."
  ]
};
  document.querySelectorAll('[data-focus]').forEach(button => {
    button.addEventListener('click', () => {
      const [title, description] = focus[button.dataset.focus];
      const titleNode = document.querySelector('#focus-title');
      titleNode.replaceChildren(...title.split('\n').flatMap((line, i) => i ? [document.createElement('br'), document.createTextNode(line)] : [document.createTextNode(line)]));
      document.querySelector('#focus-description').textContent = description;
      document.querySelectorAll('[data-focus]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    });
  });
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('pointermove', event => {
      if (paused || reduced.matches || !pointer.matches) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--ry', `${((event.clientX - rect.left) / rect.width - .5) * 5}deg`);
      card.style.setProperty('--rx', `${-((event.clientY - rect.top) / rect.height - .5) * 5}deg`);
    });
    card.addEventListener('pointerleave', () => { card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg'); });
  });

  const filters = document.querySelector('.filters');
  if (filters) {
    filters.hidden = false;
    filters.querySelectorAll('button').forEach(button => {
      button.addEventListener('click', () => {
        let count = 0;
        document.querySelectorAll('[data-category]').forEach(card => {
          card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
          if (!card.hidden) count++;
        });
        filters.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
        document.querySelector('.work-count').textContent = `${String(count).padStart(2, '0')} SELECTED ${count === 1 ? 'STORY' : 'STORIES'}`;
      });
    });
  }

  const stories = {
  "plant": {
    "type": "ACADEMIC PROJECT / MACHINE LEARNING",
    "title": "Plant Disease Detection",
    "subtitle": "Northwest Missouri State University \u00b7 May \u2013 June 2025",
    "bullets": [
      "Built a plant disease classification solution using Python, TensorFlow, and OpenCV, applying image preprocessing and augmentation to improve model robustness.",
      "Engineered features from image data using Pandas and NumPy, covering data preparation, feature engineering, model training, and validation.",
      "Collected and organized a labeled image dataset across multiple plant disease categories to support supervised model training.",
      "Trained and tuned convolutional neural network models, adjusting hyperparameters to improve classification accuracy.",
      "Applied data augmentation techniques (rotation, flipping, scaling) to increase training data diversity and reduce overfitting.",
      "Built a reproducible preprocessing-to-evaluation pipeline to streamline experimentation and speed up iteration cycles.",
      "Evaluated classification results and optimized data-processing workflows to improve model performance and processing efficiency.",
      "Compared performance across baseline and tuned model architectures to select the best-performing approach.",
      "Used structured dataset expansion and validation to strengthen classification accuracy across plant disease categories.",
      "Analyzed misclassified samples to identify weak points in the model and guide further preprocessing improvements.",
      "Visualized model performance (accuracy/loss curves, confusion matrix) to communicate results clearly.",
      "Documented experimental results and performance comparisons across model iterations to guide further improvements."
    ],
    "tools": "Python \u00b7 TensorFlow \u00b7 OpenCV \u00b7 Pandas \u00b7 NumPy"
  },
  "pipeline": {
    "type": "PROFESSIONAL WORK / DATA ENGINEERING",
    "title": "Industrial Data Pipelines",
    "subtitle": "Millennium Intech Private Limited \u00b7 June 2023 \u2013 July 2024",
    "bullets": [
      "Developed ETL pipelines using Python, SQL, Apache Spark, Apache Airflow, and AWS (S3, EC2, RDS) to ingest and process 1M+ daily industrial sensor records from manufacturing equipment.",
      "Reduced end-to-end pipeline latency by roughly 30\u201340% through workflow optimization and orchestration improvements in Airflow.",
      "Transformed time-series records into analytics-ready datasets supporting real-time operational monitoring, diagnostics, and performance analysis.",
      "Applied Pandas, NumPy, and statistical techniques to identify trends and anomalies in industrial automation datasets, flagging deviations for engineering review.",
      "Performed data-quality checks and maintained validation documentation to support reliable dashboards and decision-support reporting.",
      "Monitored pipeline health using AWS CloudWatch and managed access controls via IAM to ensure secure, reliable data operations.",
      "Documented pipeline architecture and data lineage using dbt to support onboarding, auditability, and cross-team knowledge sharing."
    ],
    "tools": "Python \u00b7 SQL \u00b7 Spark \u00b7 Airflow \u00b7 AWS \u00b7 dbt"
  },
  "operations": {
    "type": "PROFESSIONAL WORK / OPERATIONAL ANALYTICS",
    "title": "Infrastructure Analytics",
    "subtitle": "Fluidstack \u00b7 October 2025 \u2013 Present",
    "bullets": [
      "Analyze infrastructure and operational datasets using SQL and Python to identify utilization trends, reporting discrepancies, and opportunities to improve resource efficiency.",
      "Clean, transform, and validate data from multiple sources, checking for missing values, duplicate records, and inconsistent reporting to maintain data integrity.",
      "Develop recurring, near-real-time reports and dashboards to track resource utilization, service availability, and operational performance.",
      "Investigate unusual changes in operational metrics and collaborate with technical teams to distinguish data-quality issues from underlying infrastructure problems.",
      "Automate recurring data preparation and reporting workflows using Python and Pandas, cutting manual reporting effort and improving turnaround for stakeholders.",
      "Translate findings into stakeholder summaries and document metric definitions, validation procedures, and reporting logic to standardize analysis across teams.",
      "Partner with engineering and operations teams to define new tracking metrics and refine existing dashboards based on evolving business needs.",
      "Present recurring findings and recommendations to technical stakeholders to support data-driven infrastructure decisions."
    ],
    "tools": "SQL \u00b7 Python \u00b7 Pandas \u00b7 Operational dashboards"
  }
};
  const dialog = document.querySelector('.story-dialog');
  let lastTrigger = null;
  if (dialog && typeof dialog.showModal === 'function') {
    document.querySelectorAll('.no-script-story').forEach(el => el.hidden = true);
    document.querySelectorAll('[data-story]').forEach(button => {
      button.hidden = false;
      button.addEventListener('click', () => {
        const story = stories[button.dataset.story];
        document.querySelector('#story-type').textContent = story.type;
        document.querySelector('#story-title').textContent = story.title;
        document.querySelector('#story-subtitle').textContent = story.subtitle;
        const list = document.createElement('ul');
        story.bullets.forEach(text => { const item = document.createElement('li'); item.textContent = text; list.append(item); });
        document.querySelector('#story-body').replaceChildren(list);
        document.querySelector('#story-tags').textContent = story.tools;
        lastTrigger = button;
        dialog.showModal();
        document.body.style.overflow = 'hidden';
      });
    });
    dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      const r = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom)) dialog.close();
    });
    dialog.addEventListener('close', () => { document.body.style.overflow = ''; lastTrigger?.focus(); });
  }

  const copyButton = document.querySelector('.copy-email');
  if (copyButton && navigator.clipboard?.writeText) {
    copyButton.hidden = false;
    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText('Gowthamalasakani20@gmail.com');
        document.querySelector('.copy-status').textContent = 'Email copied. Let’s connect.';
      } catch {
        document.querySelector('.copy-status').textContent = 'Copy unavailable. Use the email link below.';
      }
    });
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!paused && !reduced.matches) entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    }), {threshold: .1});
    document.querySelectorAll('.project-card, .about-intro, .contact').forEach(el => observer.observe(el));
  }
  const sections = ['projects', 'about', 'contact'].map(id => document.getElementById(id)).filter(Boolean);
  let queued = false;
  function updateScroll() {
    const max = root.scrollHeight - innerHeight;
    root.style.setProperty('--progress', String(max > 0 ? Math.max(0, Math.min(1, scrollY / max)) : 0));
    let current = '';
    sections.forEach(section => { if (section.getBoundingClientRect().top < innerHeight * .4) current = section.id; });
    document.querySelectorAll('[data-nav]').forEach(a => {
      if (a.dataset.nav === current) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
    });
    queued = false;
  }
  function queueScroll() { if (!queued) { queued = true; requestAnimationFrame(updateScroll); } }
  addEventListener('scroll', queueScroll, {passive: true});
  addEventListener('resize', queueScroll);
  updateScroll();
})();
