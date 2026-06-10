// =============================================
// NAVBAR — agrega clase "scrolled" al hacer scroll
// =============================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// =============================================
// CERRAR MENÚ MOBILE al hacer clic en un enlace
// =============================================
document.querySelectorAll('#navMenu .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const collapse = document.getElementById('navMenu');
    const bsCollapse = bootstrap.Collapse.getInstance(collapse);
    if (bsCollapse) bsCollapse.hide();
  });
});

// =============================================
// BOTÓN VOLVER ARRIBA
// =============================================
const backBtn = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  backBtn.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });
backBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// =============================================
// INTERSECTION OBSERVER — anima .reveal al entrar
// en el viewport
// =============================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// =============================================
// BARRAS DE HABILIDADES
// =============================================
const skillsSection = document.getElementById('skills-bars');
let skillsAnimated = false;

if (skillsSection) {
  const skillsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !skillsAnimated) {
      skillsAnimated = true;
      document.querySelectorAll('.skill-bar-wrapper').forEach(wrapper => {
        const level = wrapper.dataset.level;
        const fill = wrapper.querySelector('.skill-fill');
        setTimeout(() => {
          fill.style.width = level + '%';
        }, 200);
      });
    }
  }, { threshold: 0.3 });

  skillsObserver.observe(skillsSection);
}

// =============================================
// CONTADORES ANIMADOS
// =============================================
const statsSection = document.getElementById('stats');
let statsAnimated = false;

function animateCounter(el, target, duration = 1500) {
  const start = performance.now();
  const update = (timestamp) => {
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  };
  requestAnimationFrame(update);
}

if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !statsAnimated) {
      statsAnimated = true;
      document.querySelectorAll('.counter').forEach(counter => {
        animateCounter(counter, parseInt(counter.dataset.target, 10));
      });
    }
  }, { threshold: 0.4 });

  statsObserver.observe(statsSection);
}

// =============================================
// FORMULARIO DE CONTACTO
// =============================================
const contactForm = document.getElementById('contact-form');
const formFeedback = document.getElementById('form-feedback');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = document.getElementById('contact-name').value.trim();
    const email   = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-msg').value.trim();
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    formFeedback.className = '';
    formFeedback.style.display = 'none';

    if (!name || !email || !message) {
      formFeedback.textContent = 'Por favor completá todos los campos obligatorios.';
      formFeedback.className = 'error';
      return;
    }

    if (!emailRe.test(email)) {
      formFeedback.textContent = 'El correo electrónico no tiene un formato válido.';
      formFeedback.className = 'error';
      return;
    }

    // TODO: reemplazar por integración real (Formspree, EmailJS, etc.)
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Enviando...';

    setTimeout(() => {
      formFeedback.textContent = '✓ ¡Mensaje enviado! Te respondo en menos de 24 horas.';
      formFeedback.className = 'success';
      contactForm.reset();
      btn.disabled = false;
      btn.innerHTML = '<i class="bi bi-send"></i> Enviar mensaje';
    }, 1400);
  });
}

// =============================================
// ACTIVE NAV LINK según sección visible
// =============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#navMenu .nav-link');

const activeLinkObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--color-accent)';
        }
      });
    }
  });
}, { threshold: 0.4, rootMargin: '-80px 0px -50% 0px' });

sections.forEach(section => activeLinkObserver.observe(section));
