$(function () {
  "use strict";

  // Trigger LazyLoad
  const lazyLoadInstance = new LazyLoad();

  // Trigger Swiper
  const swiperWrapper = $("#homeSwiper");
  const swiperSlides = $("#homeSwiper .swiper-slide");

  if (swiperWrapper.length !== 0) {
    const swiper = new Swiper("#homeSwiper", {
      effect: "coverflow",
      coverflowEffect: {
        rotate: 50,
        depth: 150,
      },
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      autoplay: {
        delay: 5000,
      },
      breakpoints: {
        768: {
          autoplay: false,
          effect: "slide",
          centeredSlides: false,
          slidesPerView: 2.25,
          spaceBetween: 30,
        },
        1200: {
          autoplay: false,
          effect: "slide",
          centeredSlides: false,
          slidesPerView: 3,
          spaceBetween: 50,
        }
      },
      on: {
        init: (sw) => handleChangeTheme(sw),
        // Handle Slide Change and Change Theme
        slideChange: (sw) => handleChangeTheme(sw),
      },
    });
  }

  function handleChangeTheme(sw) {
    const currentSlideTheme = swiperSlides?.eq(sw.activeIndex)?.data("theme");
    $("body").attr("data-current-theme", currentSlideTheme);
  }
});
