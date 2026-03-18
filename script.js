/* ========================================================
   PRANATHI PORTFOLIO – script.js
   Features: Loader, Custom Cursor, Navbar, Particles,
             Typing Effect, Skill Bars, Counter Animation,
             Skill Category Filter, Contact Form, AOS Init
======================================================== */

'use strict';

// =========================================================
// 1. LOADER
// =========================================================
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = 'auto';
      // Trigger AOS after loader hides
      AOS.refresh();
    }, 1200);
  }
});

document.body.style.overflow = 'hidden'; // prevent scroll during load

// =========================================================
// 2. CUSTOM CURSOR
// =========================================================
const cursor       = document.getElementById('cursor');
const cursorFollow = document.getElementById('cursor-follower');

let mouseX = 0, mouseY = 0;
let followX = 0, followY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursor) {
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  }
});

// Smooth follower
function animateCursor() {
  followX += (mouseX - followX) * 0.12;
  followY += (mouseY - followY) * 0.12;
  if (cursorFollow) {
    cursorFollow.style.left = followX + 'px';
    cursorFollow.style.top  = followY + 'px';
  }
  requestAnimationFrame(animateCursor);
}
animateCursor();

// =========================================================
// 3. NAVBAR – Scroll & Mobile Menu
// =========================================================
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
const allNavLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }
  highlightNav();
});

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks?.classList.toggle('open');
});

// Close menu on link click
allNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger?.classList.remove('open');
    navLinks?.classList.remove('open');
  });
});

// Active nav link on scroll
function highlightNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop    = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId     = section.getAttribute('id');
    const link          = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      allNavLinks.forEach(l => l.classList.remove('active'));
      link?.classList.add('active');
    }
  });
}

// =========================================================
// 4. PARTICLE CANVAS BACKGROUND
// =========================================================
(function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(true); }

    reset(initial = false) {
      this.x  = Math.random() * W;
      this.y  = initial ? Math.random() * H : H + 10;
      this.r  = Math.random() * 1.8 + 0.4;
      this.vy = -(Math.random() * 0.5 + 0.2);
      this.vx = (Math.random() - 0.5) * 0.3;
      this.alpha = Math.random() * 0.5 + 0.1;
      // quantum green palette
      const colors = ['#00E87C', '#00BFA5', '#39FF8A', '#B5FF4C', '#7CFFC4'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.y < -10) this.reset();
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle   = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Create particles
  for (let i = 0; i < 120; i++) particles.push(new Particle());

  // Connect nearby particles
  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.save();
          ctx.globalAlpha = (1 - dist / 100) * 0.08;
          ctx.strokeStyle = '#00E87C';
          ctx.lineWidth   = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(animate);
  }
  animate();
})();

// =========================================================
// 5. TYPING EFFECT (multi-phrase loop)
// =========================================================
(function initTyping() {
  const el = document.getElementById('typingText');
  if (!el) return;

  const phrases = [
    'Web Developer',
    'Python Programmer',
    'Java Enthusiast',
    'UI/UX Designer',
    'Problem Solver',
    'CS Student (AI)'
  ];

  let phraseIndex = 0;
  let charIndex   = 0;
  let isDeleting  = false;
  const TYPING_SPEED   = 90;
  const DELETING_SPEED = 50;
  const PAUSE_END      = 1800;
  const PAUSE_START    = 400;

  function type() {
    const current = phrases[phraseIndex];

    if (isDeleting) {
      el.textContent = current.slice(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = current.slice(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? DELETING_SPEED : TYPING_SPEED;

    if (!isDeleting && charIndex === current.length) {
      delay = PAUSE_END;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting   = false;
      phraseIndex  = (phraseIndex + 1) % phrases.length;
      delay        = PAUSE_START;
    }

    setTimeout(type, delay);
  }

  setTimeout(type, 800);
})();

// =========================================================
// 6. COUNTER ANIMATION (hero stats)
// =========================================================
function animateCounter(el) {
  const target   = parseInt(el.dataset.count);
  const duration = 1500;
  const step     = target / (duration / 16);
  let current    = 0;

  const tick = () => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current);
    if (current < target) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const statNums = document.querySelectorAll('.stat-num');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(num => statsObserver.observe(num));

// =========================================================
// 7. SKILL BARS ANIMATION
// =========================================================
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.dataset.width;
      entry.target.style.width = width + '%';
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));

// =========================================================
// 8. SKILL CATEGORY FILTER
// =========================================================
const catBtns  = document.querySelectorAll('.skill-cat-btn');
const skillCards = document.querySelectorAll('.skill-card[data-cat]');

catBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    catBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cat = btn.dataset.cat;

    skillCards.forEach(card => {
      const show = cat === 'all' || card.dataset.cat === cat;
      card.style.display = show ? 'flex' : 'none';

      // Re-animate skill bars when shown
      if (show) {
        const fill = card.querySelector('.skill-fill');
        if (fill) {
          fill.style.width = '0%';
          setTimeout(() => { fill.style.width = fill.dataset.width + '%'; }, 80);
        }
      }
    });
  });
});

// =========================================================
// 9. CONTACT FORM (front-end only – simulated send)
// =========================================================
const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();

  const btnText    = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');

  btnText.style.display    = 'none';
  btnLoading.style.display = 'inline-flex';
  submitBtn.disabled       = true;

  setTimeout(() => {
    btnText.style.display    = 'inline-flex';
    btnLoading.style.display = 'none';
    submitBtn.disabled       = false;
    formSuccess.style.display = 'flex';
    contactForm.reset();

    setTimeout(() => { formSuccess.style.display = 'none'; }, 5000);
  }, 1800);
});

// =========================================================
// 10. AOS (Animate On Scroll) INIT
// =========================================================
AOS.init({
  duration: 700,
  easing:   'ease-out-cubic',
  once:     true,
  offset:   80,
});

// =========================================================
// 11. SMOOTH SCROLL for anchor links
// =========================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// =========================================================
// 12. NAVBAR overlay close on outside click (mobile)
// =========================================================
document.addEventListener('click', (e) => {
  if (
    navLinks?.classList.contains('open') &&
    !navLinks.contains(e.target) &&
    !hamburger?.contains(e.target)
  ) {
    hamburger?.classList.remove('open');
    navLinks?.classList.remove('open');
  }
});

// =========================================================
// 13. SUBTLE parallax on hero image rings (desktop)
// =========================================================
document.addEventListener('mousemove', (e) => {
  const rings = document.querySelectorAll('.hero-image-ring');
  const centerX = window.innerWidth  / 2;
  const centerY = window.innerHeight / 2;
  const moveX   = (e.clientX - centerX) / centerX;
  const moveY   = (e.clientY - centerY) / centerY;

  rings.forEach((ring, i) => {
    const factor = (i + 1) * 5;
    ring.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
  });
});

// =========================================================
// 14. SCROLL-TRIGGERED SUBTLE BACKGROUND SHIFT
// =========================================================
window.addEventListener('scroll', () => {
  const scrollPct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  document.body.style.setProperty('--scroll-pct', scrollPct);
});

console.log('%c Pranathi Portfolio ✨', 'color: #4F8EF7; font-size: 18px; font-weight: bold;');
console.log('%c Built with HTML · CSS · JavaScript', 'color: #8B5CF6; font-size: 12px;');