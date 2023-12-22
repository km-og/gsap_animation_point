"use strict";

window.addEventListener("DOMContentLoaded", () => {
  fix100vh();
  findHeight();
  animation();
  window.addEventListener("resize", () => {
    fix100vh();
    findHeight();
  });
});

let promo = document.querySelector(".promo");

function fix100vh() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

function findHeight() {
  let fullHeight = document.documentElement.clientHeight,
    fullWidth = document.documentElement.clientWidth;
  if (fullWidth > 768 && fullWidth <= 1024) {
    if (fullHeight < 730) {
      promo.classList.add("no-full");
    } else {
      if (promo.classList.contains("no-full")) {
        promo.classList.remove("no-full");
      }
    }
  } else if (fullWidth > 576 && fullWidth <= 768) {
    if (fullHeight < 700) {
      promo.classList.add("no-full");
    } else {
      if (promo.classList.contains("no-full")) {
        promo.classList.remove("no-full");
      }
    }
  } else if (fullWidth <= 576) {
    if (fullHeight < 700) {
      promo.classList.add("no-full");
    } else {
      if (promo.classList.contains("no-full")) {
        promo.classList.remove("no-full");
      }
    }
  }
}

function animation() {
  function animSmall() {
    gsap.registerPlugin(ScrollTrigger);
    const tlPromo = gsap.timeline({});
    tlPromo
      .to(".promo__title span:first-child", {
        duration: 1.2,
        x: 0,
        ease: "back.out(1.2)",
      })
      .to(
        ".promo__title span:last-child",
        {
          duration: 1.2,
          x: 0,
          ease: "back.out(1.2)",
        },
        "<"
      );

    const tlImages = gsap.timeline({
      scrollTrigger: {
        trigger: ".promo",
        start: "top top",
        pin: true,
        scrub: 1,
        end: "+=50%",
      },
    });

    tlImages
      .to(".promo__bottom", {
        opacity: 1,
        y: 0,
      })
      .fromTo(
        ".promo__bottom img",
        { y: -80 },
        {
          y: 40,
        },
        "<"
      );

    const tlLines = gsap.timeline({
      scrollTrigger: {
        trigger: ".choose__wrap",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
    tlLines
      .to(".choose__wrap .top", {
        xPercent: -60,
      })
      .to(
        ".choose__wrap .bottom",
        {
          xPercent: 12,
        },
        "<"
      );

    gsap.from(".rates__wrap", {
      yPercent: 50,
      scrollTrigger: {
        trigger: ".rates",
        start: "top 80%",
        end: "bottom bottom",
        scrub: true,
      },
    });

    const tlPoint = gsap.timeline({
      scrollTrigger: {
        trigger: ".point",
        start: "top center",
        toggleActions: "play reverse play reverse  ",
        end: "bottom bottom",
      },
    });

    tlPoint
      .to(".point", {
        duration: 1,
        backgroundColor: "#000",
      })
      .to(
        ".point__title",
        {
          duration: 1,
          color: "#fff",
        },
        "<"
      )
      .to(
        ".point__descr",
        {
          duration: 1,
          color: "#fff",
        },
        "<"
      );

    const tlImg = gsap.timeline({
      scrollTrigger: {
        trigger: ".point__wrapper",
        pin: true,
        scrub: true,
        start: "top top",
      },
    });
    tlImg
      .to(".point__img:first-child img", {
        duration: 1,
        scale: 1,
      })
      .to(
        ".point__img:last-child img",
        {
          duration: 1,
          scale: 0,
        },
        "<"
      );

    gsap.to(".footer__point", {
      y: 0,
      scrollTrigger: {
        trigger: ".main",
        start: "top top",
        end: "bottom 70%",
        scrub: true,
      },
    });

    const tlFooter = gsap.timeline({
      scrollTrigger: {
        trigger: ".footer",
        start: "top 70%",
        end: "bottom bottom",
        scrub: true,
      },
    });
    tlFooter
      .to(".footer__point ", {
        scale: 1,
      })
      .to(
        ".footer__point svg path",
        {
          fill: "#ff0027",
          opacity: 1,
        },
        "<"
      );
  }
  //   ----------------------------------
  let mediaAnimation = gsap.matchMedia();

  mediaAnimation.add("(min-width: 1025px)", () => {
    gsap.registerPlugin(ScrollTrigger);
    const tlPromo = gsap.timeline({});
    tlPromo
      .to(".promo__title span:first-child", {
        duration: 1.2,
        x: 0,
        ease: "back.out(1.2)",
      })
      .to(
        ".promo__title span:last-child",
        {
          duration: 1.2,
          x: 0,
          ease: "back.out(1.2)",
        },
        "<"
      );
    const tlImages = gsap.timeline({
      scrollTrigger: {
        trigger: ".promo",
        start: "top top",
        pin: true,
        scrub: 1,
        end: "+=50%",
      },
    });

    tlImages
      .to(".promo__bottom", {
        opacity: 1,
        y: 0,
      })
      .fromTo(
        ".promo__bottom img",
        { y: -80 },
        {
          y: 40,
        },
        "<"
      );

    const tlLines = gsap.timeline({
      scrollTrigger: {
        trigger: ".choose__wrap",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
    tlLines
      .to(".choose__wrap .top", {
        xPercent: -60,
      })
      .to(
        ".choose__wrap .bottom",
        {
          xPercent: 20,
        },
        "<"
      );

    gsap.from(".rates__card", {
      duration: 1,
      opacity: 0,
      yPercent: 100,
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".rates",
        start: "top 20%",
        //   scrub: true,
        toggleActions: "play none none reverse",
        // 1 - что произойдет, когда start и scroller-start пересекутся в 1 раз
        // 2 - что произойдет, когда end и scroller-end
        // 3 - что произойдет, когда end и scroller-end повторно пересекутся
        // 4 - что произойдет, когда start и scroller-start
      },
    });

    let section = gsap.utils.toArray(".plus__block");
    console.log(section);
    gsap.to(section, {
      delay: 0.5,
      xPercent: -100 * (section.length - 1),
      scrollTrigger: {
        trigger: ".plus",
        start: "top top",
        end: `+=${section.length * 1000}`,
        pin: true,
        scrub: true,
        snap: 1 / (section.length - 1), //докручивается. можно задать delay
      },
    });

    const tlPoint = gsap.timeline({
      scrollTrigger: {
        trigger: ".point",
        start: "top center",
        toggleActions: "play reverse play reverse  ",
        end: "bottom bottom",
        //   toggleClass: "black",
      },
    });

    tlPoint
      .to(".point", {
        duration: 1,
        backgroundColor: "#000",
      })
      .to(
        ".point__title",
        {
          duration: 1,
          color: "#fff",
        },
        "<"
      )
      .to(
        ".point__descr",
        {
          duration: 1,
          color: "#fff",
        },
        "<"
      );

    const tlImg = gsap.timeline({
      scrollTrigger: {
        trigger: ".point__wrapper",
        pin: true,
        scrub: 1,
        start: "top top",
      },
    });
    tlImg
      .to(".point__img:first-child img", {
        duration: 1,
        scale: 1,
      })
      .to(
        ".point__img:last-child img",
        {
          duration: 1,
          scale: 0,
        },
        "<"
      );

    gsap.to(".footer__point", {
      y: 0,
      scrollTrigger: {
        trigger: ".main",
        start: "top top",
        end: "bottom 70%",
        scrub: true,
      },
    });

    const tlFooter = gsap.timeline({
      scrollTrigger: {
        trigger: ".footer",
        start: "top 70%",
        end: "bottom bottom",
        scrub: true,
      },
    });
    tlFooter
      .to(".footer__point ", {
        scale: 1,
      })
      .to(
        ".footer__point svg path",
        {
          fill: "#ff0027",
          opacity: 1,
        },
        "<"
      );
  });

  // --------------------------------------

  mediaAnimation.add("(min-width: 577px) and (max-width: 1024px)", () => {
    animSmall();
  });
  // --------------------------------------

  mediaAnimation.add("(max-width: 576px)", () => {
    animSmall();
  });
}
