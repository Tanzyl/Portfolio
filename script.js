// Theme Management
const STORAGE_KEY = 'mobi-portfolio-theme';
const defaultTheme = 'dark';

function getTheme() {
  return localStorage.getItem(STORAGE_KEY) || defaultTheme;
}

function setTheme(theme) {
  localStorage.setItem(STORAGE_KEY, theme);
  document.documentElement.classList.remove('dark', 'light');
  if (theme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.classList.add(systemTheme);
  } else {
    document.documentElement.classList.add(theme);
  }
  updateThemeToggleIcon(theme === 'dark' ? 'dark' : 'light');
}

function updateThemeToggleIcon(theme) {
  const sunIcon = document.querySelector('.sun-icon');
  const moonIcon = document.querySelector('.moon-icon');
  if (theme === 'dark') {
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  } else {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  }
}

// Initialize theme
setTheme(getTheme());

// Theme toggle button
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = getTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });
}

// Navigation scroll effect
const header = document.getElementById('header-navigation');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Smooth scroll navigation
function setupSmoothScroll() {
  const navButtons = document.querySelectorAll('.nav-button, .mobile-nav-button');
  navButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const href = button.getAttribute('data-href');
      if (href) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          // Close mobile menu if open
          const mobileMenu = document.getElementById('mobile-menu-overlay');
          if (mobileMenu) {
            mobileMenu.classList.remove('active');
            const menuToggle = document.getElementById('mobile-menu-toggle');
            if (menuToggle) {
              menuToggle.classList.remove('active');
            }
          }
        }
      }
    });
  });

  // Logo scroll to top
  const logoLink = document.getElementById('logo-link');
  if (logoLink) {
    logoLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Hero buttons
  const heroContactBtn = document.getElementById('hero-contact-btn');
  const heroAboutBtn = document.getElementById('hero-about-btn');
  const scrollIndicator = document.getElementById('scroll-indicator');

  if (heroContactBtn) {
    heroContactBtn.addEventListener('click', () => {
      const element = document.querySelector('#contact');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (heroAboutBtn) {
    heroAboutBtn.addEventListener('click', () => {
      const element = document.querySelector('#about');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      const element = document.querySelector('#about');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

// Mobile menu toggle
function setupMobileMenu() {
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu-overlay');
  const backdrop = document.getElementById('mobile-menu-backdrop');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });

    if (backdrop) {
      backdrop.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
      });
    }
  }
}

// Animated Counter
function animateCounter(element, end, suffix = '', duration = 2000) {
  let start = 0;
  const startTime = performance.now();

  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease out quart
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const current = Math.floor(easeOutQuart * end);
    
    element.textContent = current + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}

// Intersection Observer for animations
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Animate counters
        const counters = entry.target.querySelectorAll('.counter');
        counters.forEach(counter => {
          const end = parseInt(counter.getAttribute('data-end')) || 0;
          const suffix = counter.getAttribute('data-suffix') || '';
          if (end > 0 && !counter.classList.contains('animated')) {
            counter.classList.add('animated');
            animateCounter(counter, end, suffix);
          }
        });
      }
    });
  }, observerOptions);

  // Observe sections
  const sections = document.querySelectorAll('.section, .section-header, .experience-card, .project-card, .achievement-card, .skill-category, .contact-card');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(2.5rem)';
    section.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';
    observer.observe(section);
  });

  // Add visible class to trigger animation
  const style = document.createElement('style');
  style.textContent = `
    .section.visible,
    .section-header.visible,
    .experience-card.visible,
    .project-card.visible,
    .achievement-card.visible,
    .skill-category.visible,
    .contact-card.visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
}


// Footer year
function setFooterYear() {
  const yearElement = document.getElementById('footer-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  setupSmoothScroll();
  setupMobileMenu();
  setupScrollAnimations();
  setFooterYear();
});

