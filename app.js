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
    "PySpark, Prefect, and AWS. From ingestion to analysis."
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
    "subtitle": "Northwest Missouri State University \u00b7 2025",
    "bullets": [
      "Built a plant disease classification solution using Python, TensorFlow, OpenCV, Pandas, and NumPy, performing image collection, dataset organization, preprocessing, feature engineering, and supervised model development across multiple plant disease categories.",
      "Developed and trained convolutional neural network models, tuning hyperparameters and comparing baseline and optimized architectures to improve classification accuracy, robustness, and overall model performance.",
      "Applied image augmentation techniques including rotation, flipping, and scaling to expand training data diversity, reduce overfitting, and strengthen model generalization across disease categories.",
      "Built a reproducible preprocessing-to-evaluation pipeline and optimized data-processing workflows to streamline experimentation, improve processing efficiency, validate structured dataset expansion, and accelerate model iteration.",
      "Evaluated and analyzed model results using accuracy, loss curves, confusion matrices, and misclassified samples, identifying performance gaps and guiding preprocessing and model improvements; documented experimental results and performance comparisons across iterations."
    ],
    "tools": "Python \u00b7 TensorFlow \u00b7 OpenCV \u00b7 Pandas \u00b7 NumPy"
  },
  "pipeline": {
    "type": "PROFESSIONAL WORK / DATA ENGINEERING",
    "title": "ETL/ELT & Data Quality",
    "subtitle": "Indegene \u00b7 June 2023 \u2013 July 2024",
    "bullets": [
      "Designed, developed, and optimized scalable ETL and ELT pipelines using Dataiku, Python, SQL, and Snowflake to transform complex datasets into reliable, analytics-ready data products that supported business reporting and daily data operations.",
      "Wrote and optimized advanced Snowflake SQL queries, including complex joins, CTEs, window functions, aggregations, subqueries, and analytical transformations, improving query performance and supporting data analysis, reporting, and downstream business intelligence workloads.",
      "Built automated data processing and validation workflows using Python, Pandas, NumPy, Dataiku, and SQL, applying data quality checks, reconciliation rules, exception handling, and monitoring to detect data issues, support corrective actions, and improve pipeline reliability.",
      "Established and maintained data governance frameworks, data quality standards, metadata management practices, validation procedures, and operational controls, partnering with Data and Analytics Leads, business units, IT, and offshore teams to translate business requirements into reliable technical solutions and improve data accuracy, consistency, and usability.",
      "Managed data engineering delivery across Agile and DevOps environments by coordinating data analysts and engineers, tracking SLAs, milestones, risks, and dependencies, maintaining status reports, and collaborating with onshore and offshore stakeholders to manage delivery and resolve project risks.",
      "Improved ETL processes, Snowflake workloads, Dataiku flows, and operational procedures through data profiling, validation, and process testing, reducing processing time and operational risk while supporting dashboard and reporting teams with reliable datasets, decision-ready analysis, governance updates, and executive project status reports."
    ],
    "tools": "Dataiku \u00b7 Python \u00b7 SQL \u00b7 Snowflake"
  },
  "operations": {
    "type": "PROFESSIONAL WORK / AWS DATA ENGINEERING",
    "title": "Cloud Data Platforms",
    "subtitle": "Astir IT Solution\u2019s \u00b7 October 2025 \u2013 Present",
    "bullets": [
      "Designed, built, and operated AWS data engineering solutions with Python, PySpark, SparkSQL, Amazon S3, Databricks, Snowflake, dbt, and Airbyte, developing scalable ingestion and transformation pipelines that integrated APIs, databases, files, and enterprise source systems into analytics-ready data platforms.",
      "Developed and maintained Prefect workflows with reusable flows and tasks, scheduled and parameterized deployments, retry logic, failure handling, and recovery strategies monitored production runs through Prefect UI and Cloud to troubleshoot failed workflows and maintain reliable data delivery.",
      "Built data quality and validation processes using Python, PySpark, SQL, and dbt tests to detect schema changes, missing records, duplicates, invalid values, and reconciliation issues, improving the reliability of downstream datasets for analytics and reporting.",
      "Implemented cloud infrastructure and DevOps practices using Terraform, Docker, GitHub Actions, AWS CodePipeline, AWS CodeBuild, AWS CodeDeploy, and Amazon EKS, automating infrastructure provisioning, application builds, testing, deployments, environment promotion, and controlled production releases.",
      "Secured and monitored production data platforms using AWS IAM, AWS Secrets Manager, Amazon CloudWatch, S3 security controls, metrics, dashboards, alarms, and centralized logging, applying least-privilege access and proactive monitoring to improve pipeline observability and operational reliability.",
      "Partnered with onshore and offshore data engineers, cloud engineers, application teams, and business stakeholders to analyze source systems, assess analytics use cases, integrate data, design scalable solutions, translate business requirements into technical solutions, and troubleshoot production issues across development, test, and production environments.",
      "Integrated cloud-native services, including AWS Lambda, SQS, SNS, EventBridge, REST APIs, Snowpark, and AWS Step Functions, to enable event-driven data ingestion and distributed data workflows while strengthening data governance, cataloging, technical documentation, and reusable engineering standards for more consistent development and production delivery."
    ],
    "tools": "AWS \u00b7 PySpark \u00b7 Databricks \u00b7 Snowflake \u00b7 Prefect \u00b7 dbt \u00b7 Airbyte"
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

