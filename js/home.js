$(function () {
  "use strict";

  // Trigger LazyLoad
  const lazyLoadInstance = new LazyLoad();

  // Trigger Swiper
  const swiperWrapper = $("#homeSwiper"),
    nextBtn = $("#nextSlide"),
    prevBtn = $("#prevSlide");

  if (swiperWrapper.length !== 0) {
    const swiper = new Swiper("#homeSwiper", {
      initialSlide: 1,
      effect: "coverflow",
      coverflowEffect: {
        rotate: 50,
        depth: 150,
      },
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      speed: 1500,
      autoplay: {
        delay: 5000,
      },
      breakpoints: {
        768: {
          autoplay: false,
          effect: "slide",
          slidesPerView: 2.25,
          spaceBetween: 30,
        },
        1200: {
          autoplay: false,
          effect: "slide",
          slidesPerView: 3,
          spaceBetween: 50,
        },
      },
      on: {
        init: (sw) => handleChangeTheme(sw),
        // Handle Slide Change and Change Theme
        slideChange: (sw) => handleChangeTheme(sw),
      },
    });

    // Next Slide Action
    nextBtn.on("click", () => swiper.slideNext(1500));

    // Previous Slide Action
    prevBtn.on("click", () => swiper.slidePrev(1500));
  }

  function handleChangeTheme(sw) {
    const currentSlideTheme = sw.slides[sw.activeIndex].dataset.theme;
    $("body").attr("data-current-theme", currentSlideTheme);

    const selectBg = sw.slides[sw.activeIndex].dataset.image;
    const bgWrapper = $("#pageBgWrapper");
    bgWrapper.animate(
      {
        width: 0,
        height: 0,
      },
      500,
      function () {
        bgWrapper.css("background-image", `url("${selectBg}")`);
        bgWrapper.animate(
          {
            width: "100%",
            height: "100%",
          },
          500
        );
      }
    );

    const totalSlides = sw.slides.length;
    const activeIndex = sw.activeIndex;

    if (activeIndex === totalSlides - 1) {
      nextBtn.addClass("disabled").attr("disabled", true);
    } else {
      nextBtn.hasClass("disabled") &&
        nextBtn.removeClass("disabled").attr("disabled", null);
    }

    if (activeIndex === 0) {
      prevBtn.addClass("disabled").attr("disabled", true);
    } else {
      prevBtn.hasClass("disabled") &&
        prevBtn.removeClass("disabled").attr("disabled", null);
    }
  }
});
