$(function () {
  "use strict";

  // Trigger LazyLoad
  const lazyLoadInstance = new LazyLoad();

  // Trigger Swiper
  const swiperWrapper = $("#homeSwiper"),
    nextBtn = $("#nextSlide"),
    prevBtn = $("#prevSlide"),
    commonProps = {
      grabCursor: true,
      speed: 2000,
      mousewheel: true,
      centeredSlides: true,
      autoplay: {
        delay: 5000,
      },
      on: {
        init: (sw) => {
          handleChangeTheme(sw);
        },
        // Handle Slide Change and Change Theme
        slideChange: (sw) => handleChangeTheme(sw),
      },
    };

  if (swiperWrapper.length !== 0) {
    if ($(window).width() < 768) {
      mobileSliderProps();
    } else {
      const swiper = desktopSliderProps();

      swiper.slides.forEach((el, index) => {
        el.addEventListener("mouseenter", () => {
          swiper.slideTo(index, 2000, true);
        });
      });

      // Click Next Button
      nextBtn.on("click", (e) => {
        e.preventDefault();

        swiper.slideNext(2000, true);
      });

      // Click Previous Button
      prevBtn.on("click", (e) => {
        e.preventDefault();

        swiper.slidePrev(2000, true);
      });
    }
  }

  // Trigger Mobile Swiper
  function mobileSliderProps() {
    return new Swiper("#homeSwiper", {
      direction: "vertical",
      slidesPerView: 1.5,
      ...commonProps,
    });
  }

  // Trigger Desktop Swiper
  function desktopSliderProps() {
    return new Swiper("#homeSwiper", {
      initialSlide: 1,
      effect: "coverflow",
      slidesPerView: "auto",
      coverflowEffect: {
        slideShadows: false,
      },
      spaceBetween: 20,
      ...commonProps,
    });
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
