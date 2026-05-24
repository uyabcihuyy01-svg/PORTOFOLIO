// ===========================
// NAVBAR SCROLL + ACTIVE LINK
// ===========================
const navbar   = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  // Scrolled class
  navbar.classList.toggle('scrolled', window.scrollY > 20);

  // Active nav highlight
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 90) current = sec.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--accent)' : '';
  });
});


// ===========================
// HAMBURGER MENU
// ===========================
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger?.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu?.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => mobileMenu.classList.remove('open'))
);


// ===========================
// UNIFIED INTERSECTION OBSERVER
// ===========================
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;

    if (el.classList.contains('skill-card')) {
      const delay = parseInt(el.dataset.delay) || 0;
      setTimeout(() => {
        el.classList.add('visible');
        const fill = el.querySelector('.skill-fill');
        if (fill) fill.style.width = fill.dataset.width + '%';
      }, delay);

    } else if (el.classList.contains('project-card')) {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, i * 120);

    } else if (el.classList.contains('edu-item')) {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateX(0)';
      }, i * 150);

    } else if (el.classList.contains('reveal')) {
      el.classList.add('visible');

    } else if (el.classList.contains('stat-num')) {
      const target = parseInt(el.textContent);
      const suffix = el.textContent.replace(/\d/g, '');
      let count = 0;
      const step = Math.ceil(target / 30);
      const ticker = setInterval(() => {
        count = Math.min(count + step, target);
        el.textContent = count + suffix;
        if (count >= target) clearInterval(ticker);
      }, 40);
    }

    observer.unobserve(el);
  });
}, { threshold: 0.15 });

// Scroll reveal targets
document.querySelectorAll('.about-grid, .edu-card, .contact-grid, footer, .section-title, .section-desc')
  .forEach(el => { el.classList.add('reveal'); observer.observe(el); });

// Skill cards
document.querySelectorAll('.skill-card').forEach(el => observer.observe(el));

// Project cards
document.querySelectorAll('.project-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease, box-shadow .25s';
  observer.observe(el);
});

// Education items
document.querySelectorAll('.edu-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateX(-20px)';
  el.style.transition = 'opacity .55s ease, transform .55s ease';
  observer.observe(el);
});

// Stat counters
document.querySelectorAll('.stat-num').forEach(el => observer.observe(el));


// ===========================
// TYPING EFFECT
// ===========================
const heroSub = document.querySelector('.hero-sub');
if (heroSub) {
  const texts = [
    'Siswa RPL · Web Developer Pemula · Penggemar Kode',
    'Kelas 10 · SMKN 2 Kota Mojokerto',
    'HTML · CSS · JS · Bootstrap · Python'
  ];
  let tIdx = 0, cIdx = 0, deleting = false;

  function type() {
    const cur = texts[tIdx];
    heroSub.textContent = cur.substring(0, deleting ? --cIdx : ++cIdx);

    if (!deleting && cIdx === cur.length) { deleting = true; return setTimeout(type, 2400); }
    if (deleting && cIdx === 0)           { deleting = false; tIdx = (tIdx + 1) % texts.length; }

    setTimeout(type, deleting ? 40 : 60);
  }

  setTimeout(type, 1200);
}


// ===========================
// CONTACT FORM
// ===========================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm?.addEventListener('submit', function (e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  btn.textContent = 'Mengirim...';
  btn.disabled = true;

  setTimeout(() => {
    formSuccess.classList.add('show');
    this.reset();
    btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Kirim Pesan';
    btn.disabled = false;
    setTimeout(() => formSuccess.classList.remove('show'), 4000);
  }, 1200);
});