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

    // Setup mobile navigation functionality
    initMobileNav();

    // Load hero background separately
    loadHeroBackground();

    // Add lazy loading to all images
    initLazyLoading();
  };

  /**
   * Mobile navigation initialization
   */
  const initMobileNav = () => {
    on('click', '.mobile-nav-toggle', function(e) {
      select('#navbar').classList.toggle('navbar-mobile');
      this.classList.toggle('bi-list');
      this.classList.toggle('bi-x');
    });

    on('click', '#navbar', function(e) {
      if (e.target.classList.contains('nav-link')) {
        if (select('.mobile-nav-toggle').classList.contains('bi-x')) {
          select('#navbar').classList.toggle('navbar-mobile');
          select('.mobile-nav-toggle').classList.remove('bi-x');
          select('.mobile-nav-toggle').classList.add('bi-list');
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
   * Load hero background image asynchronously
   */
  // Load hero background with fallback
  const loadHeroBackground = () => {
    const heroElement = document.querySelector('.hero');
    if (!heroElement) return;

    const isMobile = window.innerWidth <= 1025;
    const bgImageUrl = isMobile ?
      '/assets/img/ai-ems-brain-mobile.png' :
      '/assets/img/ai-ems-brain.png';

    const bgImage = new Image();

    // Add error handling
    bgImage.onerror = function() {
      console.warn("Failed to load hero background image");
      heroElement.classList.add('loaded'); // Still hide spinner
      // Apply fallback styling
      heroElement.style.backgroundColor = "#f6f7ff";
    };

    bgImage.onload = function() {
      // Apply the background image once loaded
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
    };

  // Set source after event handlers
  bgImage.src = bgImageUrl;
}


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
  });

  // Non-critical functions can wait for load event
  window.addEventListener('load', () => {
    // Initialize cookie consent if needed
    // cookieManager.initConsent(); // Uncomment when ready
  });

})();
