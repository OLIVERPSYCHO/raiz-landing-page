/* =========================================================
   RAIZ CAFÉ
   JAVASCRIPT
   ========================================================= */


/* =========================================================
   ELEMENTOS
   ========================================================= */

const navToggle =
  document.getElementById("nav-toggle");

const mainNav =
  document.getElementById("main-nav");

const siteHeader =
  document.getElementById("site-header");

const scrollProgress =
  document.getElementById("scroll-progress");

const backToTop =
  document.getElementById("back-to-top");

const modal =
  document.getElementById("subscription-modal");

const modalClose =
  document.getElementById("modal-close");

const selectedPlan =
  document.getElementById("selected-plan");

const modalSubmit =
  document.getElementById("modal-submit");


/* =========================================================
   MENU MOBILE
   ========================================================= */

function closeMenu() {

  if (!navToggle || !mainNav) {
    return;
  }

  mainNav.classList.remove(
    "main-nav--open"
  );

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


if (navToggle && mainNav) {

  navToggle.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

      const isOpen =
        mainNav.classList.toggle(
          "main-nav--open"
        );

      navToggle.classList.toggle(
        "nav-toggle--open",
        isOpen
      );

      navToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      navToggle.setAttribute(
        "aria-label",
        isOpen
          ? "Fechar menu de navegação"
          : "Abrir menu de navegação"
      );

    }
  );


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
   ESCAPE
   ========================================================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (event.key !== "Escape") {
      return;
    }

    closeMenu();

    if (
      modal &&
      modal.classList.contains("open")
    ) {

      closeModal();

    }

  }
);


/* =========================================================
   HEADER + SCROLL
   ========================================================= */

function updateScroll() {

  const scrollTop =
    window.scrollY;

  if (siteHeader) {

    siteHeader.classList.toggle(
      "scrolled",
      scrollTop > 30
    );

  }


  /* Barra de progresso */

  if (scrollProgress) {

    const documentHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const progress =
      documentHeight > 0
        ? (scrollTop / documentHeight) * 100
        : 0;

    scrollProgress.style.width =
      `${progress}%`;

  }


  /* Botão voltar ao topo */

  if (backToTop) {

    backToTop.classList.toggle(
      "visible",
      scrollTop > 600
    );

  }

}


window.addEventListener(
  "scroll",
  updateScroll,
  { passive: true }
);

updateScroll();


/* =========================================================
   VOLTAR AO TOPO
   ========================================================= */

if (backToTop) {

  backToTop.addEventListener(
    "click",
    () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  );

}


/* =========================================================
   ANIMAÇÃO AO ENTRAR NA TELA
   ========================================================= */

const revealElements =
  document.querySelectorAll(
    ".reveal"
  );


const revealObserver =
  new IntersectionObserver(
    (entries, observer) => {

      entries.forEach(
        (entry) => {

          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add(
            "visible"
          );

          observer.unobserve(
            entry.target
          );

        }
      );

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


/* =========================================================
   NAVEGAÇÃO ATIVA
   ========================================================= */

const sections =
  document.querySelectorAll(
    "main section[id]"
  );

const navLinks =
  document.querySelectorAll(
    ".main-nav__link"
  );


const sectionObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach(
        (entry) => {

          if (!entry.isIntersecting) {
            return;
          }

          const id =
            entry.target.getAttribute(
              "id"
            );

          navLinks.forEach(
            (link) => {

              link.classList.toggle(
                "active",
                link.getAttribute("href") ===
                  `#${id}`
              );

            }
          );

        }
      );

    },
    {
      rootMargin:
        "-30% 0px -60% 0px"
    }
  );


sections.forEach(
  (section) => {

    sectionObserver.observe(
      section
    );

  }
);


/* =========================================================
   FAQ
   ========================================================= */

const faqItems =
  document.querySelectorAll(
    ".faq-item"
  );


faqItems.forEach(
  (item) => {

    const button =
      item.querySelector(
        ".faq-item__question"
      );


    button.addEventListener(
      "click",
      () => {

        const isOpen =
          item.classList.contains(
            "open"
          );


        /* Fecha os outros */

        faqItems.forEach(
          (otherItem) => {

            if (
              otherItem !== item
            ) {

              otherItem.classList.remove(
                "open"
              );

              const otherButton =
                otherItem.querySelector(
                  ".faq-item__question"
                );

              otherButton.setAttribute(
                "aria-expanded",
                "false"
              );

            }

          }
        );


        /* Alterna atual */

        item.classList.toggle(
          "open",
          !isOpen
        );

        button.setAttribute(
          "aria-expanded",
          String(!isOpen)
        );

      }
    );

  }
);


/* =========================================================
   CARROSSEL DE DEPOIMENTOS
   ========================================================= */

const testimonials =
  document.querySelectorAll(
    ".testimonial"
  );

const dotsContainer =
  document.getElementById(
    "slider-dots"
  );

const prevButton =
  document.getElementById(
    "testimonial-prev"
  );

const nextButton =
  document.getElementById(
    "testimonial-next"
  );


let currentTestimonial = 0;

let testimonialInterval;


function createSliderDots() {

  if (!dotsContainer) {
    return;
  }

  dotsContainer.innerHTML = "";


  testimonials.forEach(
    (_, index) => {

      const dot =
        document.createElement(
          "button"
        );

      dot.className =
        "slider-dot";

      dot.setAttribute(
        "aria-label",
        `Ver depoimento ${index + 1}`
      );


      dot.addEventListener(
        "click",
        () => {

          showTestimonial(
            index
          );

          restartSlider();

        }
      );


      dotsContainer.appendChild(
        dot
      );

    }
  );

}


function showTestimonial(index) {

  if (!testimonials.length) {
    return;
  }

  currentTestimonial =
    (index + testimonials.length) %
    testimonials.length;


  testimonials.forEach(
    (testimonial, i) => {

      testimonial.classList.toggle(
        "testimonial--active",
        i === currentTestimonial
      );

    }
  );


  const dots =
    dotsContainer
      ? dotsContainer.querySelectorAll(
          ".slider-dot"
        )
      : [];


  dots.forEach(
    (dot, i) => {

      dot.classList.toggle(
        "active",
        i === currentTestimonial
      );

    }
  );

}


function nextTestimonial() {

  showTestimonial(
    currentTestimonial + 1
  );

}


function previousTestimonial() {

  showTestimonial(
    currentTestimonial - 1
  );

}


function startSlider() {

  testimonialInterval =
    setInterval(
      nextTestimonial,
      6000
    );

}


function restartSlider() {

  clearInterval(
    testimonialInterval
  );

  startSlider();

}


if (testimonials.length) {

  createSliderDots();

  showTestimonial(0);

  startSlider();


  if (nextButton) {

    nextButton.addEventListener(
      "click",
      () => {

        nextTestimonial();

        restartSlider();

      }
    );

  }


  if (prevButton) {

    prevButton.addEventListener(
      "click",
      () => {

        previousTestimonial();

        restartSlider();

      }
    );

  }

}


/* =========================================================
   MODAL DE ASSINATURA
   ========================================================= */

const planButtons =
  document.querySelectorAll(
    "[data-open-modal]"
  );


function openModal(planName) {

  if (!modal) {
    return;
  }


  if (selectedPlan) {

    selectedPlan.textContent =
      planName;

  }


  modal.classList.add(
    "open"
  );

  modal.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.style.overflow =
    "hidden";


  if (modalClose) {

    setTimeout(
      () => {
        modalClose.focus();
      },
      50
    );

  }

}


function closeModal() {

  if (!modal) {
    return;
  }


  modal.classList.remove(
    "open"
  );

  modal.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.style.overflow =
    "";

}


planButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const planName =
          button.dataset.openModal;

        openModal(
          planName
        );

      }
    );

  }
);


if (modalClose) {

  modalClose.addEventListener(
    "click",
    closeModal
  );

}


if (modal) {

  const overlay =
    modal.querySelector(
      ".modal__overlay"
    );

  if (overlay) {

    overlay.addEventListener(
      "click",
      closeModal
    );

  }

}


/* =========================================================
   BOTÃO CONTINUAR
   ========================================================= */

if (modalSubmit) {

  modalSubmit.addEventListener(
    "click",
    () => {

      const frequency =
        document.getElementById(
          "delivery-frequency"
        );

      const coffeeType =
        document.getElementById(
          "coffee-type"
        );


      const frequencyText =
        frequency.options[
          frequency.selectedIndex
        ].text;


      const coffeeText =
        coffeeType.options[
          coffeeType.selectedIndex
        ].text;


      alert(
        `Ótimo! Plano ${selectedPlan.textContent} selecionado.\n\n` +
        `Entrega: ${frequencyText}\n` +
        `Formato: ${coffeeText}\n\n` +
        `A próxima etapa seria o checkout.`
      );

    }
  );

}


/* =========================================================
   PAUSA O CARROSSEL QUANDO O USUÁRIO SAI DA ABA
   ========================================================= */

document.addEventListener(
  "visibilitychange",
  () => {

    if (
      document.hidden
    ) {

      clearInterval(
        testimonialInterval
      );

    } else {

      startSlider();

    }

  }
);


/* =========================================================
   PREVENÇÃO DE LINKS "#" VAZIOS
   ========================================================= */

document
  .querySelectorAll(
    'a[href="#"]'
  )
  .forEach(
    (link) => {

      link.addEventListener(
        "click",
        (event) => {

          event.preventDefault();

        }
      );

    }
  );