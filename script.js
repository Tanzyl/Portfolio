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

// Three.js Background
async function initThreeBackground() {
  try {
    const THREE = await import('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js');
    const { Scene, PerspectiveCamera, WebGLRenderer, AmbientLight, PointLight, IcosahedronGeometry, Mesh, Points, BufferGeometry, Float32BufferAttribute, PointsMaterial, Color, PlaneGeometry, MeshBasicMaterial } = THREE;
    
    const container = document.getElementById('three-background');
    if (!container) return;

    const scene = new Scene();
    const camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 8;

    const renderer = new WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new PointLight(0x8B5CF6, 1);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new PointLight(0x06B6D4, 0.5);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);

    // Floating geometries
    const geometries = [
      { position: [-4, 2, -2], color: 0x8B5CF6, scale: 0.8, speed: 0.8 },
      { position: [4, -1, -3], color: 0x06B6D4, scale: 0.6, speed: 1.2 },
      { position: [2, 3, -4], color: 0xA78BFA, scale: 0.5, speed: 0.6 },
      { position: [-3, -2, -2], color: 0x22D3EE, scale: 0.4, speed: 1 }
    ];

    const meshes = geometries.map(config => {
      const geometry = new IcosahedronGeometry(1, 1);
      const material = new MeshBasicMaterial({
        color: config.color,
        transparent: true,
        opacity: 0.6,
        wireframe: false
      });
      const mesh = new Mesh(geometry, material);
      mesh.position.set(...config.position);
      mesh.scale.setScalar(config.scale);
      scene.add(mesh);
      return { mesh, ...config };
    });

    // Particle field
    const particleCount = 200;
    const particles = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    const purple = new Color(0x8B5CF6);
    const blue = new Color(0x06B6D4);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      particles[i3] = (Math.random() - 0.5) * 20;
      particles[i3 + 1] = (Math.random() - 0.5) * 20;
      particles[i3 + 2] = (Math.random() - 0.5) * 10;
      
      const mix = purple.clone().lerp(blue, Math.random());
      colors[i3] = mix.r;
      colors[i3 + 1] = mix.g;
      colors[i3 + 2] = mix.b;
    }
    
    const particleGeometry = new BufferGeometry();
    particleGeometry.setAttribute('position', new Float32BufferAttribute(particles, 3));
    particleGeometry.setAttribute('color', new Float32BufferAttribute(colors, 3));
    
    const particleMaterial = new PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    });
    
    const particleSystem = new Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // Gradient mesh
    const planeGeometry = new PlaneGeometry(30, 30, 32, 32);
    const planeMaterial = new MeshBasicMaterial({
      color: 0x1a1a2e,
      transparent: true,
      opacity: 0.3,
      wireframe: true
    });
    const plane = new Mesh(planeGeometry, planeMaterial);
    plane.position.z = -5;
    scene.add(plane);

    // Animation loop
    let clock = 0;
    function animate() {
      requestAnimationFrame(animate);
      clock += 0.01;

      // Rotate meshes
      meshes.forEach(({ mesh, speed }) => {
        mesh.rotation.x = clock * 0.2 * speed;
        mesh.rotation.y = clock * 0.3 * speed;
      });

      // Rotate particles
      particleSystem.rotation.y = clock * 0.02;
      particleSystem.rotation.x = Math.sin(clock * 0.1) * 0.1;

      // Rotate plane
      plane.rotation.z = clock * 0.05;
      const scale = 1 + Math.sin(clock * 0.5) * 0.1;
      plane.scale.set(scale, scale, 1);

      renderer.render(scene, camera);
    }

    // Handle resize
    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', handleResize);

    animate();
  } catch (error) {
    console.warn('Three.js not available, skipping 3D background:', error);
  }
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
  initThreeBackground();
});

