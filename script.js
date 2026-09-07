// Menú lateral colapsable en pantallas pequeñas
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

if (menuToggle && sidebar) {
  // En móvil el menú inicia oculto
  const mq = window.matchMedia('(max-width: 720px)');
  const syncInitialState = () => {
    if (mq.matches) {
      sidebar.classList.add('is-collapsed');
      menuToggle.setAttribute('aria-expanded', 'false');
    } else {
      sidebar.classList.remove('is-collapsed');
      menuToggle.setAttribute('aria-expanded', 'true');
    }
  };
  syncInitialState();
  mq.addEventListener('change', syncInitialState);

  menuToggle.addEventListener('click', () => {
    const collapsed = sidebar.classList.toggle('is-collapsed');
    menuToggle.setAttribute('aria-expanded', String(!collapsed));
  });
}

// Pestañas de la tabla de existencias (solo visual/demostrativo)
const tabs = document.querySelectorAll('.tab');
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => {
      t.classList.remove('is-active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('is-active');
    tab.setAttribute('aria-selected', 'true');
  });
});

// Resalta el enlace de navegación activo según la sección visible
const sections = document.querySelectorAll('main section[id], footer[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  },
  { rootMargin: '-40% 0px -50% 0px' }
);

sections.forEach((section) => observer.observe(section));
