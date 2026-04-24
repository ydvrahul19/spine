/* ===== SPINE CENTRE WEBSITE — script.js ===== */

// ===== PAGE NAVIGATION =====
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + id);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  // Update active nav link
  document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
  // close mobile menu
  document.getElementById('navLinks').classList.remove('open');
  // trigger AOS for new page
  setTimeout(initAOS, 100);
}

// ===== MOBILE MENU =====
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

// ===== FORM SUBMISSION =====
function submitBooking() {
  const name    = document.getElementById('f-name').value.trim();
  const phone   = document.getElementById('f-phone').value.trim();
  const service = document.getElementById('f-service').value;
  const slot    = document.getElementById('f-slot').value;

  if (!name || !phone || !service) {
    showToast('Please fill in Name, Phone & Service ✍️');
    return;
  }
  const msg = `Hello The Spine Centre!%0AI'd like to book an appointment.%0A%0A👤 Name: ${encodeURIComponent(name)}%0A📞 Phone: ${encodeURIComponent(phone)}%0A💊 Service: ${encodeURIComponent(service)}%0A⏰ Slot: ${encodeURIComponent(slot)}`;
  window.open(`https://wa.me/919712155905?text=${msg}`, '_blank');
  showToast('Booking sent via WhatsApp! We\'ll confirm shortly ✅');
}

// ===== TOAST =====
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 4000);
}

// ===== NAVBAR SCROLL SHADOW =====
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 30) {
    nav.style.boxShadow = '0 4px 30px rgba(26,46,74,.15)';
  } else {
    nav.style.boxShadow = '0 2px 20px rgba(26,46,74,.07)';
  }
  // trigger AOS on scroll
  checkAOS();
});

// ===== SIMPLE AOS (Animate On Scroll) =====
function initAOS() {
  const elements = document.querySelectorAll('.page.active [data-aos]');
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.classList.add('aos-animate');
    }
  });
  // Also animate hero elements immediately
  document.querySelectorAll('.hero-left, .hero-right').forEach(el => {
    setTimeout(() => el.classList.add('aos-animate'), 100);
  });
}

function checkAOS() {
  const elements = document.querySelectorAll('.page.active [data-aos]');
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.classList.add('aos-animate');
    }
  });
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
  document.querySelectorAll('.stat-n, .qbs-n, .qsf-n, .sb-num, .fb-num').forEach(el => {
    const text = el.textContent;
    const num = parseInt(text.replace(/\D/g, ''));
    if (!num || el.dataset.animated) return;
    el.dataset.animated = 'true';
    const suffix = text.replace(/[\d]/g, '');
    let start = 0;
    const duration = 1800;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * num) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

// ===== TYPING EFFECT for hero =====
function typeEffect() {
  const texts = ['Relieve Pain.', 'Restore Motion.', 'Reclaim Life.'];
  const title = document.querySelector('.hero-title');
  if (!title) return;
}

// ===== HOVER PARALLAX on hero orbs =====
document.addEventListener('mousemove', (e) => {
  const orbs = document.querySelectorAll('.hero-bg-orb');
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  orbs.forEach((orb, i) => {
    const factor = (i + 1) * 0.4;
    orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
});

// ===== TESTI CARD HOVER TILT =====
document.querySelectorAll('.testi-card, .mva-card, .benefit-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    card.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== SERVICE CARD HOVER =====
document.querySelectorAll('.sh-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.querySelector('.shc-overlay').style.background =
      'linear-gradient(to top,rgba(10,20,40,.92) 0%,rgba(10,20,40,.5) 50%,rgba(10,20,40,.3) 100%)';
  });
  card.addEventListener('mouseleave', () => {
    card.querySelector('.shc-overlay').style.background = '';
  });
});

// ===== STAGGERED ENTRY for process steps =====
function animateProcessSteps() {
  const steps = document.querySelectorAll('.ps-step');
  steps.forEach((step, i) => {
    step.style.opacity = '0';
    step.style.transform = 'translateY(40px)';
    step.style.transition = `opacity .5s ease ${i * 0.15}s, transform .5s ease ${i * 0.15}s`;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });
    observer.observe(step);
  });
}

// ===== DROPDOWN KEYBOARD =====
document.querySelectorAll('.has-dropdown').forEach(item => {
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      item.querySelector('.dropdown-menu').style.visibility = 'visible';
      item.querySelector('.dropdown-menu').style.opacity = '1';
    }
    if (e.key === 'Escape') {
      item.querySelector('.dropdown-menu').style.visibility = '';
      item.querySelector('.dropdown-menu').style.opacity = '';
    }
  });
});

// ===== INTERSECTION OBSERVER for counters =====
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.hero-stats, .quality-bottom-stats').forEach(el => {
  counterObserver.observe(el);
});

// ===== RIPPLE EFFECT on buttons =====
document.querySelectorAll('.btn-primary, .btn-book, .booking-submit-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position:absolute; border-radius:50%;
      background:rgba(255,255,255,.3);
      width:10px; height:10px;
      animation:rippleAnim .6s ease-out forwards;
      left:${e.offsetX - 5}px; top:${e.offsetY - 5}px;
      pointer-events:none;
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple keyframe
const style = document.createElement('style');
style.textContent = `
  @keyframes rippleAnim {
    0% { transform:scale(0); opacity:1; }
    100% { transform:scale(30); opacity:0; }
  }
`;
document.head.appendChild(style);

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initAOS();
  animateProcessSteps();
  // Trigger hero animation
  setTimeout(() => {
    document.querySelectorAll('.hero-left, .hero-right').forEach(el => {
      el.classList.add('aos-animate');
    });
  }, 200);
  // Page scroll AOS
  document.addEventListener('scroll', checkAOS, { passive: true });
  // Initial counter check
  setTimeout(animateCounters, 800);
});
