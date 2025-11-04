// Portfolio Data
const portfolioData = {
  contact: {
    name: 'Gowtham Alasakani',
    email: 'gowthamalasakani20@gmail.com',
    phone: '+1-704-201-3496',
    location: 'Maryville, MO',
    linkedin: 'linkedin.com/in/gowthamalasakani'
  },
  
  tagline: 'Full Stack Developer | AI/ML Enthusiast | Problem Solver',
  
  education: [
    {
      degree: 'Master of Science',
      field: 'Applied Computer Science',
      institution: 'Northwest Missouri State University',
      location: 'Maryville, MO',
      year: 'Aug 2024 - May 2026',
      gpa: '4.0/4.0'
    },
    {
      degree: 'Bachelor of Technology',
      field: 'Computer Science and Engineering',
      institution: 'Gitam University',
      location: 'Visakhapatnam, India',
      year: 'Sep 2020 - May 2024',
      gpa: '7.48/10'
    }
  ],
  
  skills: {
    programming: ['Python', 'Java', 'SQL', 'C', 'C++'],
    webDevelopment: ['HTML', 'CSS', 'PHP', 'React', 'Node.js', 'Next.js', 'Angular', 'Bootstrap', 'Figma'],
    technical: ['Data Structures', 'Algorithms', 'Relational Databases', 'REST API', 'Agile'],
    tools: ['Git', 'GitHub', 'Jira', 'Salesforce', 'Wireshark']
  },
  
  projects: [
    {
      title: 'Plant Disease Detection',
      duration: 'May 2025 - Jun 2025',
      institution: 'Northwest Missouri State University',
      location: 'Maryville, MO',
      description: 'Led the development and implementation of an AI-based solution for detecting plant diseases using advanced machine learning algorithms.',
      achievements: [
        'Optimized detection model accuracy by 25% through dataset expansion and feature engineering',
        'Reduced computational time by 40% by streamlining algorithm processes',
        'Integrated solution into farm management systems for 50+ farms'
      ]
    }
  ],
  
  experience: [
    {
      title: 'Student Worker',
      company: 'Compass Group',
      location: 'Charlotte',
      duration: 'Aug 2024 - Jan 2025',
      description: ''
    },
    {
      title: 'Software Development Intern',
      company: 'InternPe',
      location: 'Bangalore, India',
      duration: 'Jan 2023 - Jul 2023',
      description: 'Developed APIs for web applications'
    },
    {
      title: 'Data Analyst - Machine Learning',
      company: 'Phoenix Global',
      location: 'Hyderabad, India',
      duration: 'Apr 2023 - Jun 2023',
      description: 'Developed and trained machine learning models and optimized accuracy, resulting in an 8% increase in accuracy on test set'
    }
  ],
  
  certifications: [
    {
      title: 'Introduction to Software Testing',
      issuer: 'University of Minnesota',
      platform: 'Coursera',
      date: 'Jul 2023 - Oct 2023'
    },
    {
      title: 'Technical Support Fundamentals',
      issuer: 'Google',
      platform: 'Coursera',
      date: 'Aug 2021 - Dec 2021'
    },
    {
      title: 'Fundamentals of Network Communication',
      issuer: 'University of Colorado System',
      platform: 'Coursera',
      date: 'Sep 2021 - Dec 2021'
    }
  ]
};

// Theme Management
let currentTheme = 'light';

function initTheme() {
  // Check system preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    currentTheme = 'dark';
  }
  
  applyTheme(currentTheme);
  updateThemeIcon();
}

function toggleTheme() {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(currentTheme);
  updateThemeIcon();
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}

function updateThemeIcon() {
  const themeIcon = document.querySelector('.theme-icon');
  if (themeIcon) {
    themeIcon.textContent = currentTheme === 'light' ? '🌙' : '☀️';
  }
}

// Mobile Navigation
function toggleMobileMenu() {
  const navMenu = document.getElementById('navMenu');
  navMenu.classList.toggle('active');
}

// Smooth Scrolling
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetSection.offsetTop - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const navMenu = document.getElementById('navMenu');
        navMenu.classList.remove('active');
      }
    });
  });
}

// Navbar Scroll Effect
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Render Education
function renderEducation() {
  const educationGrid = document.getElementById('educationGrid');
  
  portfolioData.education.forEach(edu => {
    const eduCard = document.createElement('div');
    eduCard.className = 'education-card';
    eduCard.innerHTML = `
      <h4>${edu.degree} in ${edu.field}</h4>
      <div class="institution">${edu.institution}</div>
      <div class="details">
        <span>${edu.location}</span>
        <span>•</span>
        <span>${edu.year}</span>
        <span>•</span>
        <span>GPA: ${edu.gpa}</span>
      </div>
    `;
    educationGrid.appendChild(eduCard);
  });
}

// Render Skills
function renderSkills() {
  const skillsGrid = document.getElementById('skillsGrid');
  
  const skillCategories = [
    { name: 'Programming Languages', key: 'programming' },
    { name: 'Web Development', key: 'webDevelopment' },
    { name: 'Technical Skills', key: 'technical' },
    { name: 'Tools', key: 'tools' }
  ];
  
  skillCategories.forEach(category => {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'skill-category';
    
    const skills = portfolioData.skills[category.key];
    const skillTags = skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('');
    
    categoryDiv.innerHTML = `
      <h3>${category.name}</h3>
      <div class="skill-tags">${skillTags}</div>
    `;
    
    skillsGrid.appendChild(categoryDiv);
  });
}

// Render Projects
function renderProjects() {
  const projectsGrid = document.getElementById('projectsGrid');
  
  portfolioData.projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    
    const achievements = project.achievements
      .map(achievement => `<li>${achievement}</li>`)
      .join('');
    
    projectCard.innerHTML = `
      <h3>${project.title}</h3>
      <div class="project-duration">${project.duration}</div>
      <p class="project-description">${project.description}</p>
      <ul class="project-achievements">${achievements}</ul>
    `;
    
    projectsGrid.appendChild(projectCard);
  });
}

// Render Experience
function renderExperience() {
  const experienceTimeline = document.getElementById('experienceTimeline');
  
  portfolioData.experience.forEach(exp => {
    const expCard = document.createElement('div');
    expCard.className = 'experience-card';
    
    expCard.innerHTML = `
      <div class="experience-header">
        <h3>${exp.title}</h3>
        <div class="experience-company">${exp.company}</div>
        <div class="experience-meta">
          <span>${exp.location}</span>
          <span>•</span>
          <span>${exp.duration}</span>
        </div>
      </div>
      ${exp.description ? `<p class="experience-description">${exp.description}</p>` : ''}
    `;
    
    experienceTimeline.appendChild(expCard);
  });
}

// Render Certifications
function renderCertifications() {
  const certificationsGrid = document.getElementById('certificationsGrid');
  
  portfolioData.certifications.forEach(cert => {
    const certCard = document.createElement('div');
    certCard.className = 'certification-card';
    
    certCard.innerHTML = `
      <h3>${cert.title}</h3>
      <div class="certification-issuer">${cert.issuer}</div>
      <div class="certification-date">${cert.date}</div>
    `;
    
    certificationsGrid.appendChild(certCard);
  });
}

// Contact Form
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Store form submission in memory (simulating backend)
    const formSubmission = {
      name,
      email,
      message,
      timestamp: new Date().toISOString()
    };
    
    // Show success message
    formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
    formMessage.className = 'form-message success';
    
    // Reset form
    contactForm.reset();
    
    // Hide message after 5 seconds
    setTimeout(() => {
      formMessage.style.display = 'none';
    }, 5000);
  });
}

// Intersection Observer for Animations
function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe all cards and sections
  const animatedElements = document.querySelectorAll(
    '.education-card, .skill-category, .project-card, .experience-card, .certification-card'
  );
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Initialize Everything
function init() {
  // Initialize theme
  initTheme();
  
  // Render content
  renderEducation();
  renderSkills();
  renderProjects();
  renderExperience();
  renderCertifications();
  
  // Initialize interactions
  initSmoothScrolling();
  initNavbarScroll();
  initContactForm();
  initAnimations();
  
  // Event listeners
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
  document.getElementById('mobileToggle').addEventListener('click', toggleMobileMenu);
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    const navMenu = document.getElementById('navMenu');
    const mobileToggle = document.getElementById('mobileToggle');
    
    if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
      navMenu.classList.remove('active');
    }
  });
}

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}