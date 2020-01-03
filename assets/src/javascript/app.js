/* ========================================================================
 * # Main JS file
 *    Docs:
 *    http://api.jquery.com/
 *    https://github.com/AllThingsSmitty/jquery-tips-everyone-should-know
 *    https://github.com/peterkokot/awesome-jquery
 ========================================================================*/

(() => {
  // Utils
  const PATH = themePath;
  const $html = $("html");
  const $body = $("body");
  const $loader = $(".loader");
  const $header = $(".page-header");
  const settings = {
    aos: {
      // Global settings:
      // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
      disable: "mobile", // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
      offset: 100, // offset (in px) from the original trigger point
      duration: 600, // values from 0 to 3000, with step 50ms
      easing: "ease-out-quart", // default easing for AOS animations
      once: false, // whether animation should happen only once - while scrolling down
      anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
      debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
      throttleDelay: 99 // the delay on throttle used while scrolling the page (advanced)
    },
    smoothscroll: {
      // Scrolling Core
      animationTime: 900, // [ms]
      stepSize: 60, // [px]

      // Acceleration
      accelerationDelta: 30, // 50
      accelerationMax: 3, // 3

      // Keyboard Settings
      keyboardSupport: true, // option
      arrowScroll: 60, // [px]

      // Pulse (less tweakable)
      // ratio of "tail" to "acceleration"
      pulseAlgorithm: true,
      pulseScale: 6,
      pulseNormalize: 1,

      // Other
      touchpadSupport: false, // ignore touchpad by default
      fixedBackground: true,
      excluded: ""
    },
    mediumZoom: {
      background: "rgba(33, 33, 33, 0.5)",
      scrollOffset: 0
    },
    datePicker: {
      autoClose: true,
      minDate: (() => {
        let currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1);
        return currentDate;
      })()
    },
    flickity: {
      sliderFunctions: {
        pageDots: true,
        imagesLoaded: true,
        percentPosition: false,
        prevNextButtons: false,
        contain: true
      },
      sliderGuide: {
        autoPlay: 5000,
        pageDots: false,
        pauseAutoPlayOnHover: false,
        wrapAround: true,
        imagesLoaded: true,
        percentPosition: false,
        prevNextButtons: true,
        contain: true,
        arrowShape: {
          x0: 10,
          x1: 60,
          y1: 50,
          x2: 65,
          y2: 45,
          x3: 20
        }
      },
      sliderGuideText: {
        wrapAround: true,
        fade: true,
        asNavFor: ".slider-guide",
        draggable: false,
        pageDots: false,
        percentPosition: false,
        prevNextButtons: false,
        contain: true
      },
      sliderPrezi: {
        wrapAround: true,
        fullscreen: true,
        lazyLoad: 1,
        asNavFor: ".slider-prezi",
        pageDots: false,
        percentPosition: false,
        prevNextButtons: true,
        adaptiveHeight: true,
        contain: true,
        arrowShape: {
          x0: 10,
          x1: 60,
          y1: 50,
          x2: 65,
          y2: 45,
          x3: 20
        }
      },
      sliderEvents: {
        cellAlign: 'left',
        wrapAround: true,
        pageDots: false,
        percentPosition: false,
        prevNextButtons: true,
        contain: true,
        arrowShape: {
          x0: 10,
          x1: 60,
          y1: 50,
          x2: 65,
          y2: 45,
          x3: 20
        }
      },
      sliderPartners: {
        wrapAround: true,
        pageDots: false,
        groupCells: true,
        percentPosition: false,
        prevNextButtons: true,
        contain: true,
        arrowShape: {
          x0: 10,
          x1: 60,
          y1: 50,
          x2: 65,
          y2: 45,
          x3: 20
        }
      }
    }
  };

  // load sprite on page
  $("#svg-sprites").load(
    PATH + "/assets/dist/images/svg/sprite.symbol.svg",
    r => r.data
  );

  // Zoom auto set
  function setZoomClass() {
    if (window.devicePixelRatio === 1.25 || window.devicePixelRatio === 1.5) {
      // document.documentElement.classList.add("zoom125");
      settings.aos.disable = true;
    }
  }
  // Zoom img irticle
  mediumZoom("article img", settings.mediumZoom);

  // Obj fit
  objectFitImages($(".img-fit"));

  // Full height fix on mobile
  // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/

  function setFullHeight() {
    let vh = $(window).innerHeight() * 0.01;
    $("html").attr("style", `--vh: ${vh}px`);
  }

  function isMobile() {
    let mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
      navigator.userAgent
    );
    return mobile || document.documentElement.clientWidth <= 768 ? true : false;
  }

  // Overflow
  function getScrollbarWidth() {
    let outer = document.createElement("div");
    inner = document.createElement("div");

    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    inner.style.width = "100%";

    outer.appendChild(inner);
    document.body.appendChild(outer);

    let widthWithoutScrollbar = outer.offsetWidth;

    outer.style.overflow = "scroll";

    let widthWithScrollbar = inner.offsetWidth;

    document.body.removeChild(outer);

    return widthWithoutScrollbar - widthWithScrollbar;
  }

  function blockGlobalScroll() {
    $body.css("overflow", "hidden");
    $body.css("padding-right", getScrollbarWidth() + "px");
  }

  function unBlockGlobalScroll() {
    $body.css("overflow", "");
    $body.css("padding-right", 0);
  }
  // Smooth scroll
  SmoothScroll(settings.smoothscroll);

  // Particles init
  const $particles = $(".particles");
  $particles.each((i, el) => {
    particlesJS.load(el.id, `${PATH}/particles.json`);
  });

  // Wrapper top
  function wrapperOffset() {
    $(".wrapper").css("margin-top", $header.outerHeight());
  }
  // Radio
  $("input[type='radio']").each((i, el) => {
    $(el).on("mousedown", () => {
      if (el.checked) {
        el.onclick = () => {
          el.checked = false;
        }
      } else {
        el.onclick = null;
      }
    });
  });
  // Menu
  $(".burger").click(() => {
    $body.css("overflow") === "hidden"
      ? unBlockGlobalScroll()
      : blockGlobalScroll();
    $header.toggleClass("is-open");
    $(".page-aside").toggleClass("is-show");
  });
  function moveBorderSlide() {
    if (isMobile()) return;
    $pos = $(this).position();
    $(".slide-border")
      .stop()
      .css({
        left: $pos.left,
        width: $(this).width()
      });
  }
  function moveBorderSlideToActive() {
    if (isMobile()) return;
    if ($(".page-header__menu .active").length) {
      $activeEl = $(".page-header__menu .active");
      if (!$activeEl.hasClass("py-lg-3"))
        $activeEl = $activeEl.closest("li.py-lg-3");
      $(".slide-border")
        .stop()
        .css({
          left: $activeEl.first().position().left,
          width: $activeEl.width()
        });
    } else $(".slide-border").remove();
  }
  $(".page-header__menu li").on("mouseover", moveBorderSlide);
  $(".page-header__menu li").on("mouseout", moveBorderSlideToActive);

  // Footer menu
  const $footerMenu = $(".page-footer ul");
  function closeFooterMenu() {
    isMobile() ? $footerMenu.slideUp() : $footerMenu.slideDown();
  }
  closeFooterMenu();

  $(".footer-toggler").click(() => {
    $(".page-footer ul").slideToggle();
  });

  // Modal
  $(".open-modal").on("click", () => $(".modal").toggleClass("is-open"));
  $(".cross").on("click", () => $(".modal").toggleClass("is-open"));

  // to-top button
  const $toTopBtn = $(".btn-to-top");
  $toTopBtn.click(() => {
    $html.animate({ scrollTop: 0 }, 500);
    return false;
  });

  // Smooth scroll
  $("[data-hash]").click(() => {
    let target = $(event.currentTarget).data("hash"),
      aosGap = 100; // 100 - aos translate in px
    if (isMobile()) aosGap = 0;
    $html.animate(
      {
        scrollTop: $(target).offset().top - $header.innerHeight() * 1.5 - aosGap
      },
      1000
    );
    return false;
  });

  // Data
  $(".form-date").datepicker(settings.datePicker);
  let disabledDays = [0];
  $(".form-date").datepicker({
    onRenderCell: (date, cellType) => {
      if (cellType == "day") {
        let day = date.getDay(),
          isDisabled = !!~disabledDays.indexOf(day);
        return {
          disabled: isDisabled
        };
      }
    }
  });

  // Sliders
  $(".slider-functions").flickity(settings.flickity.sliderFunctions);
  $(".slider-guide").flickity(settings.flickity.sliderGuide);
  $(".slider-guide-text").flickity(settings.flickity.sliderGuideText);
  $(".slider-prezi").flickity(settings.flickity.sliderPrezi);
  $(".slider-partners").flickity(settings.flickity.sliderPartners);
  let $eventSlider = $(".slider-events").flickity(settings.flickity.sliderEvents),
      flkty = $eventSlider.data('flickity');
  if ($eventSlider.length) {
    if (flkty.cells.length < 4 && !isMobile()) {
      $eventSlider.data('destroy');
      settings.flickity.sliderEvents.wrapAround = false;
      $eventSlider.flickity(settings.flickity.sliderEvents);
    }
  }

  // Tabs
  function openTab(e) {
    e.preventDefault();
    let i,
      id = e.currentTarget.dataset.target;
    $(".tab__content").each((i, el) => {
      $(el).attr("visibility", "hidden");
      $(el).removeClass("active");
    });
    $(".tab__item").each((i, el) => {
      $(el).removeClass("active");
    });
    $(id).attr("visibility", "");
    $(id).addClass("active");
    $(e.currentTarget).addClass("active");
  }
  $(".tab__item").each((i, el) => el.addEventListener("click", openTab));

  // Scripts that will run after the whole page is loaded (images, videos, iframes. etc)
  $(window).on("load", () => {
    setFullHeight();
    wrapperOffset();
    setZoomClass();
    moveBorderSlideToActive();
    setTimeout(() => {
      $loader.addClass("is-load");
      AOS.init(settings.aos);
      unBlockGlobalScroll();
    }, 300);
    // SVG FF & IE gradient fix
    $("#svg-sprites svg").each(function(i, el) {
      let svg = $(el),
        symbols = svg.find("symbol");
      svg.append(
        $.merge(
          symbols.find("radialGradient"),
          symbols.find("linearGradient")
        ).detach()
      );
    });
  });

  // Scripts that will run on window resize
  $(window).on("resize", () => {
    wrapperOffset();
    closeFooterMenu();
  });

  // Scripts that will run on window scroll
  let currentScroll = 0;
  $(window).on("scroll", ev => {
    // menu anim
    const $nextScrollPos = $(ev.currentTarget).scrollTop();
    $nextScrollPos > currentScroll
      ? $header.addClass("is-scroll")
      : $header.removeClass("is-scroll");
    currentScroll = $nextScrollPos; //Updates current scroll position

    // btn to top
    $nextScrollPos >= $(ev.currentTarget).height() / 2
      ? $toTopBtn.addClass("is-show")
      : $toTopBtn.removeClass("is-show");
  });
})();
