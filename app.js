const portfolioData = {

  skills: {
    programming: ['Python', 'SQL', 'Java', 'JavaScript', 'C', 'C++'],
    web: ['React', 'Node.js', 'Express.js', 'HTML', 'CSS', 'Bootstrap'],
    data: [
      'ETL Pipeline Development',
      'Data Modelling',
      'Time-Series Data Processing',
      'Data Warehousing',
      'Data Quality & Validation',
      'Performance Optimization'
    ],
    tools: [
      'AWS (EC2, S3, RDS)',
      'Docker',
      'Jenkins',
      'GitHub Actions',
      'Git',
      'Jira'
    ]
  },

  projects: [
    {
      title: 'Plant Disease Detection (Machine Learning)',
      duration: 'May 2025 – Jun 2025',
      description: 'Built an end-to-end ML pipeline using Python, TensorFlow, OpenCV, and Pandas.',
      achievements: [
        'Improved disease classification accuracy by 25%',
        'Reduced data processing latency by 40%',
        'Deployed solution across 50+ farms'
      ]
    }
  ],

  experience: [
    {
      title: 'Data Engineer',
      company: 'Millennium Intech Private Limited',
      location: 'Chennai, India',
      duration: 'Jan 2024 – Dec 2024',
      points: [
        'Engineered scalable ETL pipelines using Python, SQL, and AWS',
        'Processed high-volume time-series sensor data',
        'Improved ML accuracy by 25% and reduced latency by 40%',
        'Implemented data validation and quality standards'
      ]
    },
    {
      title: 'Software Development Intern',
      company: 'InternPe',
      location: 'Bangalore, India',
      duration: 'Jan 2023 – Jul 2023',
      points: [
        'Developed RESTful APIs using Node.js and Express',
        'Improved reliability through debugging and testing',
        'Worked in Agile-based development cycles'
      ]
    },
    {
      title: 'Data Analyst – Machine Learning',
      company: 'Phoenix Global',
      location: 'Hyderabad, India',
      duration: 'Apr 2023 – Jun 2023',
      points: [
        'Improved predictive model accuracy by 8%',
        'Performed feature engineering and EDA',
        'Used Python, Pandas, Scikit-learn, AWS EC2'
      ]
    }
  ],

  certifications: [
    'Python for Data Science and AI – Coursera',
    'Introduction to Software Testing – University of Minnesota',
    'Technical Support Fundamentals – Google',
    'Fundamentals of Network Communication – University of Colorado'
  ]
};

/* ===== RENDER FUNCTIONS ===== */

function renderSkills() {
  const grid = document.getElementById('skillsGrid');
  Object.entries(portfolioData.skills).forEach(([key, values]) => {
    const div = document.createElement('div');
    div.className = 'skill-category';
    div.innerHTML = `<h3>${key.toUpperCase()}</h3>
      <div class="skill-tags">${values.map(v => `<span class="skill-tag">${v}</span>`).join('')}</div>`;
    grid.appendChild(div);
  });
}

function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  portfolioData.projects.forEach(p => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <ul>${p.achievements.map(a => `<li>${a}</li>`).join('')}</ul>
    `;
    grid.appendChild(card);
  });
}

function renderExperience() {
  const grid = document.getElementById('experienceTimeline');
  portfolioData.experience.forEach(e => {
    const div = document.createElement('div');
    div.className = 'experience-card';
    div.innerHTML = `
      <h3>${e.title} – ${e.company}</h3>
      <small>${e.location} | ${e.duration}</small>
      <ul>${e.points.map(p => `<li>${p}</li>`).join('')}</ul>
    `;
    grid.appendChild(div);
  });
}

function renderCertifications() {
  const grid = document.getElementById('certificationsGrid');
  portfolioData.certifications.forEach(c => {
    const div = document.createElement('div');
    div.className = 'certification-card';
    div.textContent = c;
    grid.appendChild(div);
  });
}

/* INIT */
renderSkills();
renderProjects();
renderExperience();
renderCertifications();
