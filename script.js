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

// Hide cursor on touch devices
if ('ontouchstart' in window) {
  cursor.style.display = 'none';
  cursorFollower.style.display = 'none';
  document.body.style.cursor = 'auto';
}

// ===========================
// NAVIGATION SCROLL
// ===========================
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ===========================
// HAMBURGER / MOBILE MENU
// ===========================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', (e) => {
  e.stopPropagation();
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  }
});

// ===========================
// RESUME PDF MODAL
// ===========================
const resumeModal = document.getElementById('resumeModal');
const resumeCloseBtn = document.getElementById('resumeCloseBtn');

function openResumeModal() {
  resumeModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeResumeModal() {
  resumeModal.classList.remove('open');
  document.body.style.overflow = '';
}

// Buttons that open the modal
const openBtns = [
  document.getElementById('navResumeBtn'),
  document.getElementById('mobileResumeBtn'),
  document.getElementById('contactResumeViewBtn'),
  document.getElementById('footerResumeViewBtn'),
];

openBtns.forEach(btn => {
  if (btn) btn.addEventListener('click', openResumeModal);
});

// Close on X button
if (resumeCloseBtn) resumeCloseBtn.addEventListener('click', closeResumeModal);

// Close on overlay click (outside modal box)
resumeModal.addEventListener('click', (e) => {
  if (e.target === resumeModal) closeResumeModal();
});

// Close on ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && resumeModal.classList.contains('open')) {
    closeResumeModal();
  }
});

// ===========================
// SCROLL REVEAL
// ===========================
const revealElements = document.querySelectorAll(
  '.about-grid, .timeline-item, .skill-group, .project-card, .edu-card, .contact-item, .resume-cta, .cert-card'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const siblings = Array.from(entry.target.parentElement.children);
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${idx * 80}ms`;
      entry.target.classList.add('reveal', 'visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

revealElements.forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ===========================
// ACTIVE NAV LINK
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--accent)' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ===========================
// HERO NAME FADE ON SCROLL
// ===========================
const heroName = document.querySelector('.hero-name');
window.addEventListener('scroll', () => {
  if (heroName) {
    heroName.style.opacity = Math.max(0, 1 - window.scrollY / 400);
  }
});

// ===========================
// SMOOTH SCROLL FOR ANCHORS
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
function animateCounter(el, target) {
  let current = 0;
  const step = target / (1500 / 16);
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current);
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(el => {
        const text = el.textContent.trim();
        if (text === '44') animateCounter(el, 44);
        else if (text === '3+') {
          let n = 0;
          const t = setInterval(() => { n++; el.textContent = n + '+'; if (n >= 3) clearInterval(t); }, 400);
        }
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ===========================
// SKILL TAG CLICK RIPPLE
// ===========================
document.querySelectorAll('.tag').forEach(tag => {
  tag.addEventListener('click', function () {
    this.style.transform = 'scale(0.95)';
    setTimeout(() => { this.style.transform = ''; }, 150);
  });
});

// ===========================
// TIMELINE DOT HOVER GLOW
// ===========================
document.querySelectorAll('.timeline-item').forEach(item => {
  const dot = item.querySelector('.timeline-dot');
  item.addEventListener('mouseenter', () => {
    dot.style.boxShadow = '0 0 16px rgba(0,229,255,0.6)';
    dot.style.borderColor = 'var(--accent)';
  });
  item.addEventListener('mouseleave', () => {
    if (!item.classList.contains('active')) {
      dot.style.boxShadow = '';
      dot.style.borderColor = '';
    }
  });
});

// ===========================
// PAGE LOAD FADE IN
// ===========================
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  setTimeout(() => { document.body.style.opacity = '1'; }, 50);
});

console.log('%c[AAP] Portfolio loaded successfully', 'color: #00e5ff; font-family: monospace; font-size: 14px;');
