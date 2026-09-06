/* =========================================================
   RAIZ CAFÉ
   JavaScript principal
   ========================================================= */


/* =========================================================
   1. MENU MOBILE
   ========================================================= */

const navToggle = document.getElementById("nav-toggle");
const mainNav = document.getElementById("main-nav");


if (navToggle && mainNav) {

  function openMenu() {

    mainNav.classList.add("main-nav--open");

    navToggle.classList.add("nav-toggle--open");

    navToggle.setAttribute(
      "aria-expanded",
      "true"
    );

    navToggle.setAttribute(
      "aria-label",
      "Fechar menu de navegação"
    );
  }


  function closeMenu() {

    mainNav.classList.remove("main-nav--open");

    navToggle.classList.remove("nav-toggle--open");

    navToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    navToggle.setAttribute(
      "aria-label",
      "Abrir menu de navegação"
    );
  }


  navToggle.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

      const isOpen =
        mainNav.classList.contains(
          "main-nav--open"
        );

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }

    }
  );


  /* Fecha quando clicar em um link */

  mainNav
    .querySelectorAll(".main-nav__link")
    .forEach((link) => {

      link.addEventListener(
        "click",
        () => {
          closeMenu();
        }
      );

    });


  /* Fecha com ESC */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape" &&
        mainNav.classList.contains(
          "main-nav--open"
        )
      ) {

        closeMenu();

        navToggle.focus();

      }

    }
  );


  /* Fecha clicando fora */

  document.addEventListener(
    "click",
    (event) => {

      const clickedOutside =
        !mainNav.contains(event.target) &&
        !navToggle.contains(event.target);

      if (
        clickedOutside &&
        mainNav.classList.contains(
          "main-nav--open"
        )
      ) {

        closeMenu();

      }

    }
  );

}


/* =========================================================
   2. ANIMAÇÕES DE ENTRADA
   ========================================================= */

const revealElements =
  document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "is-visible"
            );

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach(
    (element) => {

      revealObserver.observe(
        element
      );

    }
  );

} else {

  /* Fallback para navegadores antigos */

  revealElements.forEach(
    (element) => {

      element.classList.add(
        "is-visible"
      );

    }
  );

}


/* =========================================================
   3. HEADER AO ROLAR
   ========================================================= */

const header =
  document.querySelector(".site-header");


let lastScrollY = window.scrollY;


window.addEventListener(
  "scroll",
  () => {

    const currentScrollY =
      window.scrollY;


    if (!header) {
      return;
    }


    if (
      currentScrollY > 20
    ) {

      header.classList.add(
        "site-header--scrolled"
      );

    } else {

      header.classList.remove(
        "site-header--scrolled"
      );

    }


    lastScrollY =
      currentScrollY;

  },
  {
    passive: true
  }
);


/* =========================================================
   4. FECHAR MENU AO REDIMENSIONAR
   ========================================================= */

window.addEventListener(
  "resize",
  () => {

    if (
      window.innerWidth > 760 &&
      mainNav
    ) {

      mainNav.classList.remove(
        "main-nav--open"
      );

      if (navToggle) {

        navToggle.classList.remove(
          "nav-toggle--open"
        );

        navToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        navToggle.setAttribute(
          "aria-label",
          "Abrir menu de navegação"
        );

      }

    }

  }
);