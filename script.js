// ===========================
// CUSTOM CURSOR
// ===========================
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Cursor hover effects
document.querySelectorAll('a, button, .cert-card, .project-card, .contact-item, .skill-group').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '16px';
    cursor.style.height = '16px';
    cursorFollower.style.width = '52px';
    cursorFollower.style.height = '52px';
    cursorFollower.style.opacity = '0.4';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '10px';
    cursor.style.height = '10px';
    cursorFollower.style.width = '36px';
    cursorFollower.style.height = '36px';
    cursorFollower.style.opacity = '0.6';
  });
});

// ===========================
// NAVIGATION SCROLL EFFECT
// ===========================
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// ===========================
// HAMBURGER / MOBILE MENU
// ===========================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Close mobile menu on link click
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  }
});

// ===========================
// SCROLL REVEAL ANIMATION
// ===========================
const revealElements = document.querySelectorAll(
  '.about-grid, .timeline-item, .skill-group, .project-card, .edu-card, .contact-item, .resume-cta, .cert-card'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children in a grid
      entry.target.style.transitionDelay = `${(Array.from(entry.target.parentElement.children).indexOf(entry.target)) * 80}ms`;
      entry.target.classList.add('reveal', 'visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

revealElements.forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// ===========================
// ACTIVE NAV LINK HIGHLIGHT
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}` 
          ? 'var(--accent)' 
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));

// ===========================
// TYPEWRITER EFFECT - Hero roles
// ===========================
const roles = ['Sales Executive', 'Software Engineer', 'Data Analyst', 'CEH Certified'];
let roleIndex = 0;

// Subtle glow effect on hero name on scroll
const heroName = document.querySelector('.hero-name');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  if (heroName) {
    const opacity = Math.max(0, 1 - scrolled / 400);
    heroName.style.opacity = opacity;
  }
});

// ===========================
// SMOOTH ANCHOR SCROLL
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===========================
// STATS COUNTER ANIMATION
// ===========================
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const duration = 1500;
  const step = target / (duration / 16);

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + suffix;
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNums = entry.target.querySelectorAll('.stat-num');
      statNums.forEach(el => {
        const text = el.textContent.trim();
        if (text === '44') animateCounter(el, 44);
        else if (text === '3+') {
          el.textContent = '0+';
          let n = 0;
          const t = setInterval(() => {
            n++;
            el.textContent = n + '+';
            if (n >= 3) clearInterval(t);
          }, 400);
        }
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ===========================
// SKILL TAGS HOVER RIPPLE
// ===========================
document.querySelectorAll('.tag').forEach(tag => {
  tag.addEventListener('click', function () {
    this.style.transform = 'scale(0.95)';
    setTimeout(() => { this.style.transform = ''; }, 150);
  });
});

// ===========================
// TIMELINE ITEMS — hover line glow
// ===========================
document.querySelectorAll('.timeline-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.querySelector('.timeline-dot').style.boxShadow = '0 0 16px rgba(0,229,255,0.6)';
    item.querySelector('.timeline-dot').style.borderColor = 'var(--accent)';
  });
  item.addEventListener('mouseleave', () => {
    if (!item.classList.contains('active')) {
      item.querySelector('.timeline-dot').style.boxShadow = '';
      item.querySelector('.timeline-dot').style.borderColor = '';
    }
  });
});

// ===========================
// PAGE LOAD ANIMATION
// ===========================
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 50);
});

// ===========================
// PREVENT CURSOR ON TOUCH DEVICES
// ===========================
if ('ontouchstart' in window) {
  cursor.style.display = 'none';
  cursorFollower.style.display = 'none';
  document.body.style.cursor = 'auto';
}

console.log('%c[AAP] Portfolio loaded successfully', 'color: #00e5ff; font-family: monospace; font-size: 14px;');
