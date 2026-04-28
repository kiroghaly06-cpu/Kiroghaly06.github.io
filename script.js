/* ── NAV SCROLL EFFECT ─────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── REVEAL ON SCROLL ──────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
);
revealEls.forEach(el => observer.observe(el));

/* ── HAMBURGER MENU ────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  const open = navLinks.style.display === 'flex';
  navLinks.style.display = open ? 'none' : 'flex';
  navLinks.style.flexDirection = 'column';
  navLinks.style.position = 'absolute';
  navLinks.style.top = '100%';
  navLinks.style.right = '0';
  navLinks.style.background = '#fff';
  navLinks.style.padding = '1.5rem 2rem';
  navLinks.style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)';
  navLinks.style.gap = '1.5rem';
  navLinks.style.minWidth = '200px';
  navLinks.style.borderRadius = '0 0 16px 16px';
  if (open) navLinks.style.display = 'none';
});

/* ── SMOOTH NAV LINK CLOSE ON MOBILE ──────────────────── */
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      navLinks.style.display = 'none';
    }
  });
});

/* ── STAT COUNTER ANIMATION ────────────────────────────── */
function animateCounter(el, target, suffix = '', duration = 1200) {
  const isFloat = String(target).includes('.');
  const increment = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = isFloat
      ? current.toFixed(1) + suffix
      : Math.floor(current) + suffix;
  }, 16);
}

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const nums = entry.target.querySelectorAll('.stat-num');
        nums.forEach(num => {
          const raw = num.textContent.trim();
          const hasPlus = raw.includes('+');
          const value   = parseFloat(raw.replace('+', ''));
          const suffix  = hasPlus ? '+' : '';
          animateCounter(num, value, suffix);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const statsSection = document.querySelector('.about-stats');
if (statsSection) statsObserver.observe(statsSection);

/* ── HERO PHOTO LOAD ───────────────────────────────────── */
// If a photo file named "photo.jpg" (or .png, .jpeg, .webp) sits
// in the same folder, it will automatically display in the hero.
const photoSlot   = document.getElementById('heroPhoto');
const extensions  = ['jpg','jpeg','png','webp'];
let   photoLoaded = false;

extensions.forEach(ext => {
  if (photoLoaded) return;
  const img = new Image();
  img.src = `photo.${ext}`;
  img.onload = () => {
    if (photoLoaded) return;
    photoLoaded = true;
    photoSlot.innerHTML = '';
    img.alt = 'Kiro Ghaly';
    img.style.cssText = 'width:100%;height:100%;object-fit:cover;border-radius:50%;';
    photoSlot.appendChild(img);
  };
});
