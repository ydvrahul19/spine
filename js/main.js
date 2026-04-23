// ===== PAGE NAVIGATION =====
function showPage(id) {
  document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('page-' + id);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  const activeLink = document.querySelector(`.nav-links a[data-page="${id}"]`);
  if (activeLink) activeLink.classList.add('active');
  document.getElementById('mainNav')?.classList.remove('mobile-open');
  setTimeout(() => observeAnimations(), 100);
}

// ===== NAV SCROLL EFFECT =====
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 30);
});

// ===== HAMBURGER =====
function toggleMobileNav() {
  document.getElementById('mainNav')?.classList.toggle('mobile-open');
}

// ===== SCROLL ANIMATIONS =====
function observeAnimations() {
  const animEls = document.querySelectorAll('.anim-fade-up, .anim-fade-left, .anim-fade-right, .anim-scale, .anim-tilt');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('anim-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  animEls.forEach(el => observer.observe(el));
}
document.addEventListener('DOMContentLoaded', observeAnimations);

// ===== COUNTER ANIMATION =====
function animateCounters() {
  document.querySelectorAll('[data-counter]').forEach(el => {
    const target = parseInt(el.dataset.counter);
    const suffix = el.dataset.suffix || '';
    const duration = 2200;
    const start = performance.now();
    function update(time) {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target).toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}
let countersStarted = false;
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && !countersStarted) {
      countersStarted = true;
      animateCounters();
    }
  });
}, { threshold: 0.3 });
document.addEventListener('DOMContentLoaded', () => {
  const statsEl = document.querySelector('[data-counter]');
  if (statsEl) counterObserver.observe(statsEl);
});

// ===== TOAST =====
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = '✓ ' + msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 4000);
}

// ===== BOOKING =====
function submitBooking() {
  const name = document.getElementById('f-name')?.value.trim();
  const phone = document.getElementById('f-phone')?.value.trim();
  const service = document.getElementById('f-service')?.value;
  if (!name || !phone || !service) {
    showToast('Please fill in your name, phone, and service.');
    return;
  }
  const msg = `Hello PhysioPlus! I'd like to book an appointment.%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AService: ${encodeURIComponent(service)}`;
  window.open(`https://wa.me/919712155905?text=${msg}`, '_blank');
  showToast('Booking sent via WhatsApp!');
}

// ===== HOVER PARALLAX ON HERO =====
document.addEventListener('mousemove', (e) => {
  const blob = document.querySelector('.hero-blob');
  if (blob) {
    const x = (e.clientX / window.innerWidth - 0.5) * 24;
    const y = (e.clientY / window.innerHeight - 0.5) * 24;
    blob.style.transform = `translate(${x}px, ${y}px)`;
  }
  // Subtle tilt effect on hero images
  document.querySelectorAll('.hero-img').forEach((img, i) => {
    const factor = i === 0 ? 0.008 : -0.006;
    const rx = (e.clientY / window.innerHeight - 0.5) * factor * 180;
    const ry = (e.clientX / window.innerWidth - 0.5) * factor * 180;
    img.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
});

// ===== STAGGERED REVEAL ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', () => {
  // Particle dots background for hero
  const hero = document.querySelector('.hero');
  if (hero) {
    for (let i = 0; i < 18; i++) {
      const dot = document.createElement('div');
      dot.style.cssText = `
        position:absolute; border-radius:50%;
        width:${Math.random()*6+3}px; height:${Math.random()*6+3}px;
        background:rgba(61,140,110,${Math.random()*0.25+0.05});
        top:${Math.random()*100}%; left:${Math.random()*100}%;
        animation: float ${Math.random()*4+4}s ease-in-out ${Math.random()*3}s infinite;
        pointer-events:none; z-index:0;
      `;
      hero.appendChild(dot);
    }
  }
});

// ===== SMOOTH CARD REVEAL ON SCROLL =====
function setupReveal() {
  const cards = document.querySelectorAll('.home-service-card, .testimonial-card, .benefit-card, .mvc-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) scale(1)';
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px) scale(0.97)';
    card.style.transition = 'opacity .6s cubic-bezier(.22,1,.36,1), transform .6s cubic-bezier(.22,1,.36,1)';
    observer.observe(card);
  });
}
document.addEventListener('DOMContentLoaded', () => setTimeout(setupReveal, 200));
