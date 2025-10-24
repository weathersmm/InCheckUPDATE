/**
* InCheck - Optimized website loading and animations
*/
(function() {
  "use strict";

  /**
   * Utility functions
   */
  const select = (el, all = false) => {
    el = el.trim();
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
  };

  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach(e => e.addEventListener(type, listener));
    } else {
      select(el, all).addEventListener(type, listener);
    }
  };

  /**
   * Early initialization - critical functionality that shouldn't wait
   */
  const earlyInit = () => {

    // Setup mobile navigation functionality
    initMobileNav();

    // Load hero background separately
    loadHeroBackground();

    // Add lazy loading to all images
    initLazyLoading();

    // Initialize AOS immediately - don't wait for images
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: "ease-in-out",
        once: true,
        mirror: false,
        startEvent: 'DOMContentLoaded' // Start animations as soon as DOM is ready
      });
    }

    // Remove loading class to enable animations
    document.documentElement.classList.remove('js-loading');
  };

  /**
   * Mobile navigation initialization
   */
  const initMobileNav = () => {
    on('click', '.mobile-nav-toggle', function(e) {
      const navbar = select('#navbar');
      const icon = this.querySelector('i');
      const isOpen = navbar.classList.toggle('navbar-mobile');
      if (icon) {
        icon.classList.toggle('bi-list', !isOpen);
        icon.classList.toggle('bi-x', isOpen);
      }
      this.setAttribute('aria-expanded', String(isOpen));
    });

    on('click', '#navbar', function(e) {
      if (e.target.classList.contains('nav-link')) {
        const toggleBtn = select('.mobile-nav-toggle');
        const navbar = select('#navbar');
        if (navbar.classList.contains('navbar-mobile') && toggleBtn) {
          navbar.classList.remove('navbar-mobile');
          toggleBtn.setAttribute('aria-expanded', 'false');
          const icon = toggleBtn.querySelector('i');
          if (icon) {
            icon.classList.add('bi-list');
            icon.classList.remove('bi-x');
          }
        }
      }
    });

    on('click', '.navbar .dropdown > a', function(e) {
      if (select('#navbar').classList.contains('navbar-mobile')) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle('dropdown-active');
      }
    }, true);
  };

  /**
 * Load hero background image based on screen size
 */
  const loadHeroBackground = () => {
    const heroElement = document.querySelector('.hero');
    if (!heroElement) return;

  // Function to determine and load the appropriate image
    const loadAppropriateImage = () => {
      const isMobile = window.innerWidth <= 1025;
      const bgImageUrl = isMobile ?
        '/assets/img/ai-ems-brain-mobile.png' :
        '/assets/img/ai-ems-brain.png';

    // Load new image
      const bgImage = new Image();

      bgImage.onerror = function() {
        console.warn("Failed to load hero background image");
        heroElement.classList.add('loaded');
        heroElement.style.backgroundColor = "#f6f7ff";
      };

      bgImage.onload = function() {
        if (isMobile) {
          heroElement.style.backgroundImage = `url('${bgImageUrl}')`;
          heroElement.style.backgroundSize = '100%';
          heroElement.style.backgroundPosition = 'bottom';
          heroElement.style.backgroundRepeat = 'no-repeat';
        } else {
          heroElement.style.backgroundImage = `
            linear-gradient(to bottom, #f6f7ff 0%, rgba(246, 247, 255, 0) 12%),
            linear-gradient(to top, #f6f7ff 0%, rgba(246, 247, 255, 0) 12%),
            url('${bgImageUrl}')
          `;
          heroElement.style.backgroundSize = 'auto 80%';
          heroElement.style.backgroundPosition = 'right';
          heroElement.style.backgroundRepeat = 'no-repeat';
        }
        heroElement.classList.add('loaded');
        heroElement.classList.remove('resizing');
      };

    // Start loading image
      bgImage.src = bgImageUrl;
    };

  // Initial load
    loadAppropriateImage();

  // Add resize listener with debounce
    let resizeTimer;
    window.addEventListener('resize', () => {
    // Hide background image during resize
      heroElement.classList.add('resizing');
      heroElement.classList.remove('loaded');

    // Debounce the resize event
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        loadAppropriateImage();
      }, 250);
    });
  };







  /**
   * Add lazy loading to images
   */
  const initLazyLoading = () => {
    const productImages = document.querySelectorAll('.image-product');
    productImages.forEach(img => {
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
    });
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    });
  };

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header');
    let offset = header.offsetHeight;

    if (!header.classList.contains('header-scrolled')) {
      offset -= 10;
    }

    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    });
  };

  /**
   * Header scroll and back-to-top functionality
   */
  const initScrollFunctions = () => {
    let selectHeader = select('#header');
    let backtotop = select('.back-to-top');

    // Header scrolled class toggle
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled');
      } else {
        selectHeader.classList.remove('header-scrolled');
      }
    };

    // Back to top button toggle
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active');
      } else {
        backtotop.classList.remove('active');
      }
    };

    // Apply initially and on scroll
    headerScrolled();
    toggleBacktotop();
    window.addEventListener('scroll', () => {
      headerScrolled();
      toggleBacktotop();
      navbarlinksActive();
    });
  };

  /**
   * Cookie Consent Functions - consolidated
   */
  const cookieManager = {
    areCookiesEnabled: () => {
      if (!navigator.cookieEnabled) {
        console.log("Cookies are disabled in your browser. Some features may not work as expected.");
        return false;
      }
      return true;
    },

    setCookie: (name, value, days) => {
      if (!cookieManager.areCookiesEnabled()) return;
      let expires = "";
      if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
    },

    getCookie: (name) => {
      const nameEQ = name + "=";
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
      }
      return null;
    },

    initConsent: () => {
      if (!cookieManager.areCookiesEnabled()) return;
      if (!cookieManager.getCookie("cookieConsent")) {
        const container = document.getElementById("cookieConsentContainer");
        if (container) container.classList.add("active");
      }
    },

    acceptCookies: () => {
      cookieManager.setCookie("cookieConsent", "accepted", 365);
      cookieManager.hideConsentBanner();
    },

    declineCookies: () => {
      cookieManager.setCookie("cookieConsent", "declined", 365);
      cookieManager.hideConsentBanner();
    },

    hideConsentBanner: () => {
      const container = document.getElementById("cookieConsentContainer");
      if (!container) return;

      container.classList.remove("active");
      setTimeout(() => {
        container.style.display = 'none';
      }, 500);
    },

    setupListeners: () => {
      const acceptBtn = document.getElementById('acceptCookiesButton');
      const declineBtn = document.getElementById('declineCookiesButton');

      if (acceptBtn) acceptBtn.addEventListener('click', cookieManager.acceptCookies);
      if (declineBtn) declineBtn.addEventListener('click', cookieManager.declineCookies);
    }
  };

  /**
   * Event Listeners
   */

  // Execute critical functions as soon as DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    // Critical functions that should run immediately
    earlyInit();

    // Cookie consent setup
    cookieManager.setupListeners();

    // Scroll functions
    initScrollFunctions();

    //customers trusted
    new Swiper('.swiper-customers', {
      slidesPerView: 'auto',
      spaceBetween: 50, 
      loop: true,
      speed: 6000,
      allowTouchMove: true,
      freeMode: true,
      freeModeMomentum: false,
      autoplay: {
        delay: 0,
        disableOnInteraction: false
      },
      breakpoints: {
        768: {
          spaceBetween: 200
        },
      }
    });

  });

  // Non-critical functions can wait for load event
  window.addEventListener('load', () => {
    // Initialize cookie consent if needed
    // cookieManager.initConsent(); // Uncomment when ready
  });

})();
