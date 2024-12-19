/**
* Template Name: FlexStart - v1.9.0
* Template URL: https://bootstrapmade.com/flexstart-bootstrap-startup-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach(e => e.addEventListener(type, listener));
    } else {
      select(el, all).addEventListener(type, listener);
    }
  };

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener);
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
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header');
  const headerScrolled = () => {
    if (window.scrollY > 100) {
      selectHeader.classList.add('header-scrolled');
    } else {
      selectHeader.classList.remove('header-scrolled');
    }
  };

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top');
  const toggleBacktotop = () => {
    if (window.scrollY > 100) {
      backtotop.classList.add('active');
    } else {
      backtotop.classList.remove('active');
    }
  };

  /**
   * Mobile nav toggle
   */
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

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault();
      this.nextElementSibling.classList.toggle('dropdown-active');
    }
  }, true);

  /**
   * Cookie Consent Functions
   */
  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  function areCookiesEnabled() {
    if (!navigator.cookieEnabled) {
        // Cookies are not enabled
        alert("Cookies are disabled in your browser. Please enable cookies to improve your experience.");
        return false;
    }
    return true;
  }

  function initializeCookieConsent() {
    if (!areCookiesEnabled()) return; // Stop if cookies are disabled
    if (!getCookie("cookieConsent")) {
      var consentContainer = document.getElementById("cookieConsentContainer");
        consentContainer.classList.add("active"); // Add the active class to slide in
    }
  }

  function acceptCookies() {
    if (!areCookiesEnabled()) return; // Stop if cookies are disabled
    setCookie("cookieConsent", "accepted", 365);
    hideConsentBanner();
  }

  function declineCookies() {
    if (!areCookiesEnabled()) return; // Stop if cookies are disabled
    setCookie("cookieConsent", "declined", 365);
    hideConsentBanner();
  }

  function hideConsentBanner() {
    var consentContainer = document.getElementById("cookieConsentContainer");
    consentContainer.classList.remove("active"); // Remove the active class to slide out
    // Optionally delay the actual display none to allow the animation to finish
    setTimeout(() => {
        consentContainer.style.display = 'none';
    }, 500); // Match the duration of the transition
  }

  /**
   * Initialization on page load
   */
  window.addEventListener('load', () => {
    if (!areCookiesEnabled()) {
      // Possibly disable other functionality or continue with limited functionality
      console.log("Cookies are not enabled. Some features may not work as expected.");
    }

    navbarlinksActive();
    headerScrolled();
    toggleBacktotop();
    //initializeCookieConsent();
    aos_init();
  });

  // Event listeners for cookie buttons
  document.addEventListener('DOMContentLoaded', function () {
    // Attach event listeners directly without checking for DOMContentLoaded
    //document.getElementById('acceptCookiesButton').addEventListener('click', acceptCookies);
    //document.getElementById('declineCookiesButton').addEventListener('click', declineCookies);
  });

  window.addEventListener('scroll', () => {
    headerScrolled();
    toggleBacktotop();
  });

  /**
   * Animation on scroll initialization
   */

  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  }

})();