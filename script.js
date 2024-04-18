gsap.registerPlugin(ScrollTrigger);

gsap.config({
  nullTargetWarn: false,
  trialWarn: false,
});

// RELOAD AT THE TOP
$(window).on("beforeunload", function () {
  history.scrollRestoration = "manual";
});

// --- GLOBAL - SPLIT TEXT
let splitText;

function runSplit() {
  splitText = new SplitType("[split-text]", {
    types: "words, chars",
  });
}

// FADE
// function fade() {
//   gsap.set("[fade]", { autoAlpha: 0, y: "12em" });

//   ScrollTrigger.batch("[fade]", {
//     once: true,
//     onEnter: (batch) =>
//       gsap.to(batch, {
//         autoAlpha: 1,
//         y: 0,
//         duration: 1.6,
//         ease: "power3.out",
//         stagger: 0.1,
//       }),
//   });
// }

function fade() {
  const fadeElements = document.querySelectorAll("[fade]");
  fadeElements.forEach((element) => {
    gsap.set(element, {
      autoAlpha: 0,
      y: element.getAttribute("data-y") || "4em",
    });
  });

  ScrollTrigger.batch("[fade]", {
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        autoAlpha: 1,
        y: 0,
        duration: 1.6,
        ease: "power3.out",
        stagger: 0.1,
      }),
  });
}

function fadeHero() {
  gsap.set("[fade-hero]", { autoAlpha: 0, y: "4em" });

  gsap.to("[fade-hero]", {
    autoAlpha: 1,
    y: 0,
    duration: 1.2,
    ease: "power3.out",
  });
}

// --- GLOBAL - LINE ANIMATION
function drawLine() {
  // Draw line
  gsap.set("[draw-line]", {
    autoAlpha: 1,
    scaleX: 0,
    transformOrigin: "top left",
  });

  ScrollTrigger.batch("[draw-line]", {
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        scaleX: 1,
        delay: 0.1,
        duration: 2,
        ease: "power3.out",
        stagger: 0.1,
        markers: true,
      }),
  });
}

// --- GLOBAL - VERTICAL LINE ANIMATION
function drawVerticalLine() {
  // Draw line
  gsap.set("[draw-vertical-line]", {
    autoAlpha: 1,
    scaleY: 0,
    transformOrigin: "top top",
  });

  ScrollTrigger.batch("[draw-vertical-line]", {
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        scaleY: 1,
        delay: 0.2,
        duration: 2,
        ease: "power3.out",
        stagger: 0.2,
      }),
  });
}

function parallax() {
  $("[parallax]").each(function (index) {
    let tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: $(this),
        scrub: true,
        start: "top bottom",
        end: "bottom top",
      },
    });

    tl.fromTo($(this).find(".c-img"), { y: -60 }, { y: 60 });
  });
}

function swipe() {
  gsap.set("[data-swipe]", { clipPath: "inset(100% 0% 0% 0%)" });

  ScrollTrigger.batch("[data-swipe]", {
    once: true,
    start: "top bottom",
    onEnter: (batch) =>
      gsap.to(batch, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.2,
      }),
  });
}

function faqAccordion() {
  $(".c-accordion").each(function () {
    let tl = gsap.timeline({
      paused: true,
      defaults: { duration: 0.6, ease: "power2.inOut" },
    });

    let accordionResponse = $(this).find(".c-accordion_bt");
    let accordionArrow = $(this).find(".c-accordion-icon");

    tl.to(accordionResponse, { height: "auto" });
    tl.to(accordionArrow, { rotation: 45, opacity: 1 }, 0);

    $(this).on("click", function () {
      $(".c-accordion.is-open").not($(this)).click();
      $(this).toggleClass("is-open");
      if ($(this).hasClass("is-open")) {
        tl.restart();
      } else {
        tl.reverse();
      }
    });
  });

  if ($(".c-faq-item").length > 0) {
    $(".c-faq-item")[0].click();
  }
}

// --- HEADER SCROLL
function headerScroll() {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".c-body",
      start: "50 top",
      end: "+=1",
      onEnter: () => {
        tl.play();
      },
      onLeaveBack: () => {
        tl.reverse();
      },
    },
    defaults: {
      ease: "power3.inOut",
      duration: 0.4,
    },
  });

  tl.to(".c-logo", { autoAlpha: 1 }, 0);
}

let pageApply = document.querySelector("[page-apply]");
let pageHire = document.querySelector("[page-hire]");
let pageAbout = document.querySelector("[page-about]");
let pageHome = document.querySelector("[page-home]");

// --- APPLY AND HIRE LOADER
function applyLoader() {
  let tl = gsap.timeline({
    defaults: { ease: "power3.out", duration: 1.2 },
    delay: 0.2,
  });

  gsap.set(".apply-title path", { y: "5em", autoAlpha: 0 });
  gsap.set(".c-line.apply-info", { scaleX: 0, transformOrigin: "top left" });
  gsap.set(".c-img-contain.hire-hero", { clipPath: "inset(100% 0% 0% 0%)" });
  gsap.set(".c-img-contain.apply-hero-bg", { autoAlpha: 0 });

  tl.to(".apply-title path", {
    y: 0,
    autoAlpha: 1,
    stagger: { each: 0.05, from: "end" },
  });
  tl.to(".c-img-contain.apply-hero-bg", { autoAlpha: 1, duration: 3 }, 0);
  tl.to(
    ".c-img-contain.hire-hero",
    { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6 },
    0,
  );
  tl.to(".c-img-contain.apply-hero", { y: 0, autoAlpha: 1 }, 0.6);
  tl.to(".c-apply-info", { y: 0, autoAlpha: 1 }, ">-0.8");
  tl.to(".c-line.apply-info", { scaleX: 1 }, "<0.2");
}

// --- ABOUT LOADER
function aboutLoader() {
  let tl = gsap.timeline({
    defaults: { ease: "power3.out", duration: 1.2 },
  });

  gsap.set(".apply-title path", { y: "5em", autoAlpha: 0 });
  gsap.set("[about-sub]", { y: "5em", autoAlpha: 0 });
  gsap.set(".o-row.about-subnav .c-txt-link", { y: "5em", autoAlpha: 0 });

  tl.to(".apply-title path", {
    y: 0,
    autoAlpha: 1,
    stagger: { each: 0.05, from: "end" },
  });
  tl.to("[about-sub]", { y: 0, autoAlpha: 1 }, 0.6);
  tl.to(
    ".o-row.about-subnav .c-txt-link",
    { y: 0, autoAlpha: 1, stagger: 0.05 },
    0.8,
  );
}

// --- HOME LOADER
function homeLoader() {
  let tl = gsap.timeline({
    defaults: { ease: "power3.out", duration: 1.2 },
    delay: 0.2,
  });

  gsap.set(".apply-title path", { y: "5em", autoAlpha: 0 });
  gsap.set("[home-sub]", { y: "5em", autoAlpha: 0 });
  gsap.set(".c-img-contain.hm-hero-bg", { autoAlpha: 0 });
  gsap.set(".c-subnav .c-txt-link", { y: "5em", autoAlpha: 0 });

  tl.to(".apply-title path", {
    y: 0,
    autoAlpha: 1,
    stagger: { each: 0.05, from: "end" },
  });
  tl.to(".c-img-contain.hm-hero-bg", { autoAlpha: 1, duration: 3 }, 0);
  tl.to("[home-sub]", { y: 0, autoAlpha: 1 }, 0.4);
  tl.to(".c-subnav .c-txt-link", { y: 0, autoAlpha: 1, stagger: 0.1 }, "<0.2");
}

//
////
//////
////
//

// --- INIT
function init() {
  fade();
  drawLine();
  drawVerticalLine();
  parallax();
  fadeHero();
  faqAccordion();
  // headerScroll();
  swipe();
  if (pageApply || pageHire) {
    applyLoader();
  }
  if (pageAbout) {
    aboutLoader();
  }
  if (pageHome) {
    homeLoader();
  }
  // runSplit();
}
init();