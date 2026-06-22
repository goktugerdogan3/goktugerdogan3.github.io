// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== TYPED EFFECT =====
const phrases = [
  'Full Stack Developer',
  'Python Geliştirici',
  'Web Uygulamaları',
  'Yazılım Mühendisi',
  'Açık İşe Alıma',
];
let pIdx = 0, cIdx = 0, deleting = false;
const typedEl = document.getElementById('typed');

function type() {
  const phrase = phrases[pIdx];
  if (!deleting) {
    typedEl.innerHTML = phrase.substring(0, cIdx + 1) + '<span class="cursor">|</span>';
    cIdx++;
    if (cIdx === phrase.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typedEl.innerHTML = phrase.substring(0, cIdx - 1) + '<span class="cursor">|</span>';
    cIdx--;
    if (cIdx === 0) {
      deleting = false;
      pIdx = (pIdx + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 60 : 100);
}
type();

// ===== INTERSECTION OBSERVER – fade-up =====
const fadeEls = document.querySelectorAll(
  '.section-header, .about-grid, .stat-card, .skill-category, ' +
  '.project-card, .timeline-item, .cert-card, .contact-item, .contact-form'
);
fadeEls.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => observer.observe(el));

// ===== SKILL BAR ANIMATION =====
const skillFills = document.querySelectorAll('.skill-fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      fill.style.width = fill.dataset.w + '%';
      barObserver.unobserve(fill);
    }
  });
}, { threshold: 0.3 });
skillFills.forEach(f => barObserver.observe(f));

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current
      ? 'var(--accent)'
      : '';
  });
});

// ===== CONTACT FORM – Formspree =====
const form = document.getElementById('contactForm');
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const btn = form.querySelector('button[type="submit"]');
  const original = btn.innerHTML;

  // Gönderiliyor durumu
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gönderiliyor...';
  btn.disabled = true;

  try {
    const response = await fetch('https://formspree.io/f/xwvdkyjz', {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      btn.innerHTML = '<i class="fas fa-check"></i> Mesajınız İletildi!';
      btn.style.background = 'var(--green)';
      form.reset();
      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.background = '';
        btn.disabled = false;
      }, 4000);
    } else {
      throw new Error('Gönderim başarısız');
    }
  } catch (err) {
    btn.innerHTML = '<i class="fas fa-times"></i> Hata oluştu, tekrar deneyin';
    btn.style.background = 'var(--accent3)';
    btn.disabled = false;
    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
    }, 3000);
  }
});

// ===== SMOOTH SCROLL (fallback) =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
