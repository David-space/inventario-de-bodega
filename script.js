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

// Pestañas + buscador de la tabla de existencias — filtrado real
const tabs = document.querySelectorAll('.tab');
const searchInput = document.getElementById('searchSku');
const tableRows = document.querySelectorAll('.panel--table tbody tr');
const tableEmpty = document.getElementById('tableEmpty');

let activeFilter = 'all';

function rowMatchesFilter(row) {
  if (activeFilter === 'all') return true;
  if (activeFilter === 'low') {
    const status = row.dataset.status;
    return status === 'low' || status === 'critical';
  }
  if (activeFilter === 'none') return row.dataset.movement === 'none';
  return true;
}

function rowMatchesSearch(row, query) {
  if (!query) return true;
  return row.textContent.toLowerCase().includes(query);
}

function applyTableFilters() {
  const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
  let visibleCount = 0;

  tableRows.forEach((row) => {
    const matches = rowMatchesFilter(row) && rowMatchesSearch(row, query);
    row.hidden = !matches;
    if (matches) visibleCount += 1;
  });

  if (tableEmpty) tableEmpty.hidden = visibleCount !== 0;
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => {
      t.classList.remove('is-active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('is-active');
    tab.setAttribute('aria-selected', 'true');
    activeFilter = tab.dataset.filter || 'all';
    applyTableFilters();
  });
});

if (searchInput) {
  searchInput.addEventListener('input', applyTableFilters);
}

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
