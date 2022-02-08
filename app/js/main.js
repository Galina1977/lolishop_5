$(function () {
   // Для СИСТЕМЫ...........................
   var ua = window.navigator.userAgent;
   var msie = ua.indexOf("MSIE ");
   var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };

   function isIE() {
      ua = navigator.userAgent;
      var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
      return is_ie;
   }

   if (isIE()) {
      document.querySelector('html').classList.add('ie');
   }

   if (isMobile.any()) {
      document.querySelector('html').classList.add('_touch');
   }
   //..............................
   // Липкая кнопка
   $('body').append('<div class="upbtn"></div>');
   $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
         $('.upbtn').css({
            bottom: '15px'
         });
      } else {
         $('.upbtn').css({
            bottom: '-80px'
         });
      }
   });
   $('.upbtn').on('click', function () {
      $('html, body').animate({
         scrollTop: 0
      }, 500);
      return false;
   });

   // Меню-Бургер
   $(".header__burger").click(function (event) {
      $(".header__burger, .menu__body").toggleClass("active");
      $("body").toggleClass("lock");
   });

   window.onload = function () {
      document.addEventListener("click", documentActions);
      function documentActions(e) {
         const targetElement = e.target;
         if (targetElement.classList.contains('search-form__icon')) {
            document.querySelector('.search-form').classList.toggle('_active');
         } else if (!targetElement.closest('.search-form') && document.querySelector('.search-form._active')) {
            document.querySelector('.search-form').classList.remove('_active');
         }
      }
   }

   //Бургер для выпадающего списка
   $(".burger__btn, .burger__title").click(function (event) {
      $(".burger__btn, .catalog-nav__body").toggleClass("active");
   });

   //Выпадающий список при клике на бургер
   var catalognavHover = function () {
      $(".catalog-nav__item").hover(
         function () {
            var catalognavBody = $(this).closest(".catalog-nav__body");
            catalognavBody.css("width", "auto");
         },
         function () {
            var catalognavBody = $(this).closest(".catalog-nav__body");
            catalognavBody.css("width", "auto");
         }
      );
   };
   catalognavHover();

   // В каком городе вы находитесь
   var locationChoose = function () {
      $(document).on("click", ".location-question__btn", function () {
         var answer = $(this).data("location");
         $(this).closest(".location-question").hide();
         if (answer === "no") {
            $(this).closest(".location__body").addClass("is-location-choose");
         }
      });

      $(document).on("click", ".location-choose__item", function () {
         $(this).closest(".location__body").removeClass("is-location-choose");
      });

      $(document).on("click", ".location__header", function () {
         $(this).siblings(".location__body").addClass("is-location-choose");
      });
   };
   locationChoose();


   //Звездный рейтинг
   $(".card-product__star").rateYo({
      starWidth: "17px",
      normalFill: "#ccccce",
      ratedFill: "#ffc35b",
      readOnly: true,
      starSvg:
         '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="19pt" height="18pt" viewBox="0 0 19 18" version="1.1"><g id="surface1"><path style=" stroke:none;" d="M 8.554688 0.625 L 6.398438 5.28125 L 1.578125 6.03125 C 0.714844 6.164062 0.371094 7.296875 0.996094 7.949219 L 4.484375 11.570312 L 3.65625 16.683594 C 3.507812 17.609375 4.421875 18.300781 5.1875 17.871094 L 9.5 15.453125 L 13.8125 17.871094 C 14.578125 18.296875 15.492188 17.609375 15.34375 16.683594 L 14.515625 11.570312 L 18.003906 7.949219 C 18.628906 7.296875 18.285156 6.164062 17.421875 6.03125 L 12.601562 5.28125 L 10.445312 0.625 C 10.0625 -0.203125 8.941406 -0.214844 8.554688 0.625 Z M 8.554688 0.625 " /></g></svg>',
   });

   // Картинки
   // function ibg() {
   //    $.each($('._ibg'), function (index, val) {
   //       if ($(this).find('img').length > 0) {
   //          $(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
   //       }
   //    });
   // }
   // ibg();

   //Пупап user Вход-Регистрация
   var popupLink = function () {
      $(".js-popup__link").magnificPopup({
         showCloseBtn: false,
      });
      $(document).on("click", ".popup__close", function () {
         $.magnificPopup.close();
      });
   };
   popupLink();

   // Валидация форм
   var formValidate = function () {
      $("form").each(function () {
         $(this).on("submit", function () {
            $(this).validate({
               rules: {
                  name: "required",
                  tel: "required",
                  email: "required",
                  password: "required",
                  "req-textarea": "required",
               },
               messages: {
                  name: "Введите корректное имя",
                  tel: "Введите корректный номер",
                  email: "Введите корректный email",
                  password: "Введите корректный пароль",
                  "req-textarea": "Заполните поле",
               },
               errorPlacement: function (error, element) {
                  element.attr("placeholder", error[0].outerText);
               },
            });
            if ($(this).valid()) {
               var wrap = $(this)[0].closest(".hide-on-success");
               if (wrap) {
                  $(wrap).siblings(".show-on-success").show();
                  $(wrap).hide();
               }
            }
            return false;
         });
      });
   };
   formValidate();

   // Цена диапазон
   $(".filter-price__input").ionRangeSlider({
      type: "double",
      grid: true,
      onStart: function (data) {
         $(".filter-price__from").text(data.from);
         $(".filter-price__to").text(data.to);
      },
      onChange: function (data) {
         $(".filter-price__from").text(data.from);
         $(".filter-price__to").text(data.to);
      },
   });

   // Кнопка для фильтров в мобильной версии
   $(".shop__btn-mobile").on("click", function () {
      $(this).toggleClass("shop__btn-mobile--active");
      $(this).next().slideToggle(500);
   });

   // По популярности По бренду
   $(".select-style").styler();
   $(this).next().slideToggle(200);

   // Кнопки Грид и Лист 
   $(".content-header__btn-grid").on("click", function () {
      $(this).addClass("content-header__btn--active");
      $(".content-header__btn-line").removeClass("content-header__btn--active");
      $(".card-product").removeClass("card-product--list");
   });

   $(".content-header__btn-line").on("click", function () {
      $(this).addClass("content-header__btn--active");
      $(".content-header__btn-grid").removeClass("content-header__btn--active");
      $(".card-product").addClass("card-product--list");
   });

   // Кликаем иджеты-фильтры сворачиваються
   const widgets = document.querySelectorAll('.widget');
   widgets.forEach(function (widget) {
      widget.addEventListener('click', function (e) {
         if (e.target.classList.contains('filter__title')) {
            e.target.classList.toggle('filter__title--active');
            e.target.nextElementSibling.classList.toggle('filter__body--hidden');
         }
      });
   });


   // + - Добавить в корзину
   $(".digital-selector__num").styler();

   // 1 слайдер с Product page
   $(".product-slide-card__thumb").slick({
      asNavFor: ".product-slide-card__big",
      focusOnSelect: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      vertical: true,
      draggable: false,
   });

   $(".product-slide-card__big").slick({
      asNavFor: ".product-slide-card__thumb",
      draggable: false,
      arrows: false,
      fade: true,
      responsive: [
         {
            breakpoint: 1200,
            settings: {
               dots: true,
               draggable: true,
               fade: false,
               autoplay: true,
               autoplaySpead: 2000,
            }
         },
      ]
   });

   // Табы
   $(".tab").on("click", function (e) {
      e.preventDefault();

      $($(this).siblings()).removeClass("tab--active");
      $($(this).closest(".tabs-wrapper").siblings().find("div")).removeClass(
         "tabs-content--active"
      );

      $(this).addClass("tab--active");
      $($(this).attr("href")).addClass("tabs-content--active");
   });

   // Рейтинг коментариев
   $(".comments__star").rateYo({
      starWidth: "17px",
      normalFill: "#ccccce",
      ratedFill: "#f5ba26",
      readOnly: true,
   });

   //BildSlider
   let sliders = document.querySelectorAll('._swiper');
   if (sliders) {
      for (let index = 0; index < sliders.length; index++) {
         let slider = sliders[index];
         if (!slider.classList.contains('swiper-bild')) {
            let slider_items = slider.children;
            if (slider_items) {
               for (let index = 0; index < slider_items.length; index++) {
                  let el = slider_items[index];
                  el.classList.add('swiper-slide');
               }
            }
            let slider_content = slider.innerHTML;
            let slider_wrapper = document.createElement('div');
            slider_wrapper.classList.add('swiper-wrapper');
            slider_wrapper.innerHTML = slider_content;
            slider.innerHTML = '';
            slider.appendChild(slider_wrapper);
            slider.classList.add('swiper-bild');

            if (slider.classList.contains('_swiper_scroll')) {
               let sliderScroll = document.createElement('div');
               sliderScroll.classList.add('swiper-scrollbar');
               slider.appendChild(sliderScroll);
            }
         }
         if (slider.classList.contains('_gallery')) {
            //slider.data('lightGallery').destroy(true);
         }
      }
      sliders_bild_callback();
   }
   function sliders_bild_callback(params) { }

   if (document.querySelector('.slider-main__body')) {
      new Swiper('.slider-main__body', {
         observer: true,
         observeParents: true,
         slidesPerView: 1,
         spaceBetween: 32,
         watchOverflow: true,
         speed: 800,
         loop: true,
         loopAdditionalSlides: 5,
         preloadImages: false,
         parallax: true,
         grabCursor: true,
         keyboard: {
            enabled: true,
            onlyInViewport: true,
            pageUpDown: true,
         },
         mousewheel: {
            sensitivity: 1,
            eventsTarget: ".slider-main__body"
         },
         pagination: {
            el: '.controls-slider-main__dotts',
            clickable: true,
         },
         navigation: {
            nextEl: '.slider-main .slider-arrow_next',
            prevEl: '.slider-main .slider-arrow_prev',
         }
      });
   }

   // Табы
   $(".tab").on("click", function (e) {
      e.preventDefault();
      $($(this).siblings()).removeClass("tab--active");
      $($(this).closest(".tabs-wrapper").siblings().find("div")).removeClass(
         "tabs-content--active"
      );
      $(this).addClass("tab--active");
      $($(this).attr("href")).addClass("tabs-content--active");

      $(".products-slider__inner").slick("setPosition");
   });

   //Звездный рейтинг
   $(".card-product__star").rateYo({
      starWidth: "17px",
      normalFill: "#ccccce",
      ratedFill: "#ffc35b",
      readOnly: true,
      starSvg:
         '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="19pt" height="18pt" viewBox="0 0 19 18" version="1.1"><g id="surface1"><path style=" stroke:none;" d="M 8.554688 0.625 L 6.398438 5.28125 L 1.578125 6.03125 C 0.714844 6.164062 0.371094 7.296875 0.996094 7.949219 L 4.484375 11.570312 L 3.65625 16.683594 C 3.507812 17.609375 4.421875 18.300781 5.1875 17.871094 L 9.5 15.453125 L 13.8125 17.871094 C 14.578125 18.296875 15.492188 17.609375 15.34375 16.683594 L 14.515625 11.570312 L 18.003906 7.949219 C 18.628906 7.296875 18.285156 6.164062 17.421875 6.03125 L 12.601562 5.28125 L 10.445312 0.625 C 10.0625 -0.203125 8.941406 -0.214844 8.554688 0.625 Z M 8.554688 0.625 " /></g></svg>',
   });

   // Слайдер
   $(".products-slider__inner").slick({
      dots: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      dots: true,
      infinite: false,
      prevArrow:
         '<button class="products-slider__slider-btn products-slider__slider-btnprev"><img src="images/arrow-left.svg" alt=""></button>',
      nextArrow:
         '<button class="products-slider__slider-btn products-slider__slider-btnnext"><img src="images/arrow-right.svg" alt=""></button>',
      responsive: [
         {
            breakpoint: 1200,
            settings: {
               slidesToShow: 2,
               arrows: false,
            },
         },
         {
            breakpoint: 768,
            settings: {
               slidesToShow: 1,
               draggable: true,
               arrows: false,
               autoplay: true,
               autoplaySpead: 2000,
            },
         },
      ],
   });


   // SPOLLERS
   const spollersArray = document.querySelectorAll('[data-spollers]');
   if (spollersArray.length > 0) {
      // Получение обычных слойлеров
      const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
         return !item.dataset.spollers.split(",")[0];
      });
      // Инициализация обычных слойлеров
      if (spollersRegular.length > 0) {
         initSpollers(spollersRegular);
      }

      // Получение слойлеров с медиа запросами
      const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
         return item.dataset.spollers.split(",")[0];
      });

      // Инициализация слойлеров с медиа запросами
      if (spollersMedia.length > 0) {
         const breakpointsArray = [];
         spollersMedia.forEach(item => {
            const params = item.dataset.spollers;
            const breakpoint = {};
            const paramsArray = params.split(",");
            breakpoint.value = paramsArray[0];
            breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
            breakpoint.item = item;
            breakpointsArray.push(breakpoint);
         });

         // Получаем уникальные брейкпоинты
         let mediaQueries = breakpointsArray.map(function (item) {
            return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
         });
         mediaQueries = mediaQueries.filter(function (item, index, self) {
            return self.indexOf(item) === index;
         });

         // Работаем с каждым брейкпоинтом
         mediaQueries.forEach(breakpoint => {
            const paramsArray = breakpoint.split(",");
            const mediaBreakpoint = paramsArray[1];
            const mediaType = paramsArray[2];
            const matchMedia = window.matchMedia(paramsArray[0]);

            // Объекты с нужными условиями
            const spollersArray = breakpointsArray.filter(function (item) {
               if (item.value === mediaBreakpoint && item.type === mediaType) {
                  return true;
               }
            });
            // Событие
            matchMedia.addListener(function () {
               initSpollers(spollersArray, matchMedia);
            });
            initSpollers(spollersArray, matchMedia);
         });
      }
      // Инициализация
      function initSpollers(spollersArray, matchMedia = false) {
         spollersArray.forEach(spollersBlock => {
            spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
            if (matchMedia.matches || !matchMedia) {
               spollersBlock.classList.add('_init');
               initSpollerBody(spollersBlock);
               spollersBlock.addEventListener("click", setSpollerAction);
            } else {
               spollersBlock.classList.remove('_init');
               initSpollerBody(spollersBlock, false);
               spollersBlock.removeEventListener("click", setSpollerAction);
            }
         });
      }
      // Работа с контентом
      function initSpollerBody(spollersBlock, hideSpollerBody = true) {
         const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
         if (spollerTitles.length > 0) {
            spollerTitles.forEach(spollerTitle => {
               if (hideSpollerBody) {
                  spollerTitle.removeAttribute('tabindex');
                  if (!spollerTitle.classList.contains('_active')) {
                     spollerTitle.nextElementSibling.hidden = true;
                  }
               } else {
                  spollerTitle.setAttribute('tabindex', '-1');
                  spollerTitle.nextElementSibling.hidden = false;
               }
            });
         }
      }
      function setSpollerAction(e) {
         const el = e.target;
         if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
            const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
            const spollersBlock = spollerTitle.closest('[data-spollers]');
            const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
            if (!spollersBlock.querySelectorAll('._slide').length) {
               if (oneSpoller && !spollerTitle.classList.contains('_active')) {
                  hideSpollersBody(spollersBlock);
               }
               spollerTitle.classList.toggle('_active');
               _slideToggle(spollerTitle.nextElementSibling, 500);
            }
            e.preventDefault();
         }
      }
      function hideSpollersBody(spollersBlock) {
         const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
         if (spollerActiveTitle) {
            spollerActiveTitle.classList.remove('_active');
            _slideUp(spollerActiveTitle.nextElementSibling, 500);
         }
      }
   }

   //SlideToggle связь с SPOLLERS
   let _slideUp = (target, duration = 500) => {
      if (!target.classList.contains('_slide')) {
         target.classList.add('_slide');
         target.style.transitionProperty = 'height, margin, padding';
         target.style.transitionDuration = duration + 'ms';
         target.style.height = target.offsetHeight + 'px';
         target.offsetHeight;
         target.style.overflow = 'hidden';
         target.style.height = 0;
         target.style.paddingTop = 0;
         target.style.paddingBottom = 0;
         target.style.marginTop = 0;
         target.style.marginBottom = 0;
         window.setTimeout(() => {
            target.hidden = true;
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
         }, duration);
      }
   }
   let _slideDown = (target, duration = 500) => {
      if (!target.classList.contains('_slide')) {
         target.classList.add('_slide');
         if (target.hidden) {
            target.hidden = false;
         }
         let height = target.offsetHeight;
         target.style.overflow = 'hidden';
         target.style.height = 0;
         target.style.paddingTop = 0;
         target.style.paddingBottom = 0;
         target.style.marginTop = 0;
         target.style.marginBottom = 0;
         target.offsetHeight;
         target.style.transitionProperty = "height, margin, padding";
         target.style.transitionDuration = duration + 'ms';
         target.style.height = height + 'px';
         target.style.removeProperty('padding-top');
         target.style.removeProperty('padding-bottom');
         target.style.removeProperty('margin-top');
         target.style.removeProperty('margin-bottom');
         window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
         }, duration);
      }
   }
   let _slideToggle = (target, duration = 500) => {
      if (target.hidden) {
         return _slideDown(target, duration);
      } else {
         return _slideUp(target, duration);
      }
   }

});
