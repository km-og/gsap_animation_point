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

// extensions. gsap snippets (зеленый человечек)
function animation() {
  // Метод .to движение/изменение стилей от верстки к другой точке
  // сниппет .to
  // selector: тэг, id, класс. одинарные кавычки
  // toVars, //стили, которые меняем
  // единицы измерения не пишем
  //   gsap.to(".promo__text", {
  //     duration: 1, //секунды
  //     x: -150,
  //     opacity: 0.5,
  //     delay: 1,
  //     xPercent: -50,
  //     color: "red",
  //     rotation: 180,
  //   });
  //-------------------------------------------------------------
  // Метод .from движение/изменение стилей от точки к верстке
  //   gsap.from(".promo__text", {
  //     duration: 2,
  //     color: "red",
  //     xPercent: -50,
  //   });
  //-------------------------------------------------------------
  // Метод .fromTo движение/изменение стилей от точки к другой точке, минуя верстку
  //   gsap.fromTo(
  //     ".promo__text",
  //     { x: -200 },
  //     {
  //       duration: 1,
  //       x: 200,
  //     }
  //   );
  //-------------------------------------------------------------
  //   Несколько последовательных анимаций
  //   Timeline - выстроенный порядок различных частей анимация
  // сниппет tl
  //   рекомендация: называть правильно, чтоб понимать, с какими таймлайнами работаем
  //   const tlPromo = gsap.timeline({});
  //   tlPromo
  //     .to(".promo__text", {
  //       duration: 3,
  //       xPercent: -50,
  //       color: "red",
  //     })
  //     .to(
  //       ".promo__text",
  //       {
  //         duration: 1,
  //         rotation: 180,
  //       },
  //       //   "-=1" // вместо delay
  //       //   "+=1"
  //       "<" // начало одновременно, но заканчиваются в соотв. с duration
  //     ); //чтобы начать анимацию, когда предыдущая еще не закончилась, в секундах
  //-------------------------------------------------------------
  // регистрация плагина гринсок, который нужно подключить к проекту
  //   gsap.registerPlugin(ScrollTrigger);
  //   //без анимации задаются свойства
  //   //установили прозрачность, чтоб отработать pin: true
  //   gsap.set(".rates__card", {
  //     opacity: 0,
  //   });
  //   gsap.to(".rates__card", {
  //     opacity: 1,
  //     //для одинаковых элементов, которые хотим анимировать по порядку (не одновременно)
  //     //время показа
  //     // stagger: 0.3,
  //     scrollTrigger: {
  //       trigger: ".rates", //элемент триггер
  //       start: "top top",
  //       //1 - к какой части тригера будет привязан
  //       //2 - часть самого экрана
  //       //   end: "bottom top",
  //       end: "+=200", //закончим через 200 пикселей
  //       scrub: true, //при обратном скролле возвращаются начальные свойства
  //       //   toggleClass: "active",
  //       //   pin: true, //скролла нет, но прокрутка блоков идет
  //       markers: true,
  //     },
  //   });
  //-------------------------------------------------------------

  //   let end = "";
  //   let start = "";
  //   ScrollTrigger.matchMedia({
  //     "(min-width: 768px)": function () {
  //       start = "top center";
  //       end = "bottom 20%";
  //       createScrollTriggers();
  //     },

  //     "(max-width:767px)": function () {
  //       start = "top 95%";
  //       end = "bottom center";
  //       createScrollTriggers();
  //     },
  //   });

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

  mediaAnimation.add("(max-width: 1024px)", () => {
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
}
