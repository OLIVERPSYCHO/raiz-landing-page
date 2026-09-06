const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = mainNav.classList.toggle('main-nav--open');
    navToggle.classList.toggle('nav-toggle--open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute(
      'aria-label',
      isOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'
    );
  });

  // Fecha o menu ao clicar em um link (comum em navegação de uma página só)
  mainNav.querySelectorAll('.main-nav__link').forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  function closeMenu() {
    mainNav.classList.remove('main-nav--open');
    navToggle.classList.remove('nav-toggle--open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir menu de navegação');
  }

  // Fecha com a tecla Escape
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mainNav.classList.contains('main-nav--open')) {
      closeMenu();
      navToggle.focus();
    }
  });

  // Fecha ao clicar fora do menu e do botão
  document.addEventListener('click', (event) => {
    const clickedOutside =
      !mainNav.contains(event.target) && !navToggle.contains(event.target);

    if (clickedOutside && mainNav.classList.contains('main-nav--open')) {
      closeMenu();
    }
  });
}