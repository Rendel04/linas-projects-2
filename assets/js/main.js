/**
 * KCC page interactions adapted from the supplied Mentor Bootstrap template.
 * The page uses the template's Bootstrap navigation and AOS components.
 */
(function () {
  'use strict';

  if (window.location.hostname.endsWith('manus.computer')) {
    document.querySelectorAll('[data-manus-src]').forEach((image) => {
      image.src = image.dataset.manusSrc;
    });
  }

  const body = document.body;
  const header = document.querySelector('#header');
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  const scrollTop = document.querySelector('.scroll-top');
  const preloader = document.querySelector('#preloader');

  function toggleScrolled() {
    if (!header) return;
    if (window.scrollY > 100) body.classList.add('scrolled');
    else body.classList.remove('scrolled');
  }

  function toggleMobileNav() {
    const active = body.classList.toggle('mobile-nav-active');
    if (!mobileNavToggleBtn) return;
    mobileNavToggleBtn.classList.toggle('bi-list', !active);
    mobileNavToggleBtn.classList.toggle('bi-x', active);
    mobileNavToggleBtn.setAttribute('aria-expanded', String(active));
    mobileNavToggleBtn.setAttribute('aria-label', active ? 'Close navigation menu' : 'Open navigation menu');
  }

  if (mobileNavToggleBtn) mobileNavToggleBtn.addEventListener('click', toggleMobileNav);

  document.querySelectorAll('#navmenu a').forEach((link) => {
    link.addEventListener('click', () => {
      if (body.classList.contains('mobile-nav-active')) toggleMobileNav();
    });
  });

  function toggleScrollTop() {
    if (!scrollTop) return;
    scrollTop.classList.toggle('active', window.scrollY > 100);
  }

  if (scrollTop) {
    scrollTop.addEventListener('click', (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    });
  }

  document.addEventListener('scroll', () => {
    toggleScrolled();
    toggleScrollTop();
  }, { passive: true });

  window.addEventListener('load', () => {
    toggleScrolled();
    toggleScrollTop();
    if (preloader) preloader.remove();
  });

  if (window.AOS) {
    window.addEventListener('load', () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('[data-aos]').forEach((element) => element.removeAttribute('data-aos'));
      } else {
        window.AOS.init({ duration: 650, easing: 'ease-in-out', once: true, mirror: false });
      }
    });
  } else {
    document.querySelectorAll('[data-aos]').forEach((element) => element.removeAttribute('data-aos'));
  }

  if (window.PureCounter && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) new window.PureCounter();
})();
