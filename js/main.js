/**
 * InsureWise — Main JavaScript
 * Handles: Navigation, Search, Reading Progress, Share Buttons,
 *          Newsletter, Back to Top, Active Links
 */

(function () {
  'use strict';

  /* ----------------------------------------------------------------
     DOM Ready Helper
  ---------------------------------------------------------------- */
  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  /* ----------------------------------------------------------------
     Hamburger Menu / Mobile Navigation
  ---------------------------------------------------------------- */
  function initHamburger() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const body = document.body;

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', function () {
      const isOpen = navMenu.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen.toString());
      body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
      }
    });

    // Close on ESC
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
        hamburger.focus();
      }
    });

    // Close nav on link click (mobile)
    navMenu.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
      });
    });
  }

  /* ----------------------------------------------------------------
     Active Navigation Link Detection
  ---------------------------------------------------------------- */
  function initActiveNav() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;

    navLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      if (!href) return;

      // Normalize paths for comparison
      const normalizeHref = href.replace(/^\.\.\/|^\.\//g, '/').replace(/\/index\.html$/, '/');
      const normalizePath = currentPath.replace(/\/index\.html$/, '/');

      if (
        href === currentPath ||
        currentPath.includes(href.replace(/^.*\/pages\//, '/pages/')) ||
        (href.includes('index.html') && (currentPath === '/' || currentPath.endsWith('/'))) ||
        normalizePath.endsWith(normalizeHref.split('/').pop())
      ) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  /* ----------------------------------------------------------------
     Reading Progress Bar (article pages)
  ---------------------------------------------------------------- */
  function initReadingProgress() {
    const bar = document.getElementById('reading-progress');
    const article = document.querySelector('.article-body');
    if (!bar || !article) return;

    function updateProgress() {
      const articleTop = article.getBoundingClientRect().top + window.scrollY;
      const articleBottom = articleTop + article.offsetHeight;
      const scrolled = window.scrollY + window.innerHeight;
      const total = articleBottom - articleTop;
      const progress = Math.min(Math.max((scrolled - articleTop) / total, 0), 1);
      bar.style.width = (progress * 100) + '%';
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /* ----------------------------------------------------------------
     Back to Top Button
  ---------------------------------------------------------------- */
  function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ----------------------------------------------------------------
     Smooth Scroll for CTA & anchor links
  ---------------------------------------------------------------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
          e.preventDefault();
          const navHeight = document.querySelector('.navbar')?.offsetHeight || 70;
          const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    });
  }

  /* ----------------------------------------------------------------
     Share Buttons
  ---------------------------------------------------------------- */
  function initShareButtons() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);

    // Twitter
    document.querySelectorAll('.share-btn-twitter').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        window.open(
          `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
          '_blank', 'width=600,height=400,noopener'
        );
      });
    });

    // Facebook
    document.querySelectorAll('.share-btn-facebook').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${url}`,
          '_blank', 'width=600,height=400,noopener'
        );
      });
    });

    // WhatsApp
    document.querySelectorAll('.share-btn-whatsapp').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        window.open(
          `https://wa.me/?text=${title}%20${url}`,
          '_blank', 'noopener'
        );
      });
    });

    // Copy Link
    document.querySelectorAll('.share-btn-copy').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(window.location.href).then(function () {
            const original = btn.textContent;
            btn.textContent = '✓ Copied!';
            btn.style.background = '#16a34a';
            setTimeout(function () {
              btn.textContent = original;
              btn.style.background = '';
            }, 2000);
          });
        } else {
          // Fallback
          const input = document.createElement('input');
          input.value = window.location.href;
          document.body.appendChild(input);
          input.select();
          document.execCommand('copy');
          document.body.removeChild(input);
        }
      });
    });
  }

  /* ----------------------------------------------------------------
     Newsletter Form
  ---------------------------------------------------------------- */
  function initNewsletterForm() {
    const forms = document.querySelectorAll('.newsletter-form');
    forms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const input = form.querySelector('.newsletter-input');
        const email = input ? input.value.trim() : '';

        if (!email || !isValidEmail(email)) {
          showFormMessage(form, 'Please enter a valid email address.', 'error');
          return;
        }

        // Simulate subscription (replace with real API call)
        showFormMessage(form, '🎉 Thank you! You\'re subscribed to weekly insurance tips.', 'success');
        if (input) input.value = '';
      });
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showFormMessage(form, message, type) {
    let msg = form.querySelector('.form-message');
    if (!msg) {
      msg = document.createElement('p');
      msg.className = 'form-message';
      form.after(msg);
    }
    msg.textContent = message;
    msg.style.cssText = `
      margin-top: 12px;
      font-size: 14px;
      color: ${type === 'success' ? 'rgba(255,255,255,0.9)' : '#fca5a5'};
      text-align: center;
    `;
    if (type === 'success') {
      setTimeout(function () { msg.remove(); }, 5000);
    }
  }

  /* ----------------------------------------------------------------
     Contact Form
  ---------------------------------------------------------------- */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      // Simulate API call — replace with Formspree or EmailJS
      setTimeout(function () {
        btn.textContent = '✓ Message Sent!';
        btn.style.background = 'var(--color-secondary)';
        form.reset();
        setTimeout(function () {
          btn.textContent = original;
          btn.disabled = false;
          btn.style.background = '';
        }, 3000);
      }, 1200);
    });
  }

  /* ----------------------------------------------------------------
     Sidebar Search
  ---------------------------------------------------------------- */
  function initSearch() {
    document.querySelectorAll('.sidebar-search').forEach(function (searchBox) {
      const input = searchBox.querySelector('input');
      const btn = searchBox.querySelector('button');
      if (!input || !btn) return;

      function doSearch() {
        const query = input.value.trim();
        if (query.length < 2) return;
        // Replace with your real search URL or implement client-side search
        window.location.href = `https://www.google.com/search?q=site:insureewise.com+${encodeURIComponent(query)}`;
      }

      btn.addEventListener('click', doSearch);
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') doSearch();
      });
    });
  }

  /* ----------------------------------------------------------------
     FAQ Accordion
  ---------------------------------------------------------------- */
  function initFAQ() {
    document.querySelectorAll('.faq-item').forEach(function (item) {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      if (!question || !answer) return;

      // Hide answers by default
      answer.style.display = 'none';

      const icon = document.createElement('span');
      icon.textContent = '+';
      icon.style.fontSize = '20px';
      icon.style.fontWeight = 'bold';
      icon.style.color = 'var(--color-primary)';
      icon.style.transition = 'transform 0.25s ease';
      question.appendChild(icon);

      question.addEventListener('click', function () {
        const isOpen = answer.style.display !== 'none';
        answer.style.display = isOpen ? 'none' : 'block';
        icon.textContent = isOpen ? '+' : '−';
        question.style.color = isOpen ? '' : 'var(--color-primary)';
      });
    });
  }

  /* ----------------------------------------------------------------
     Lazy Image Fade-in
  ---------------------------------------------------------------- */
  function initLazyImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(function (img) {
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.4s ease';
      img.addEventListener('load', function () {
        img.style.opacity = '1';
      });
      if (img.complete) {
        img.style.opacity = '1';
      }
    });
  }

  /* ----------------------------------------------------------------
     Card Hover Animation — Stagger on load
  ---------------------------------------------------------------- */
  function initCardAnimations() {
    const cards = document.querySelectorAll('.post-card, .category-card');
    cards.forEach(function (card, i) {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = `opacity 0.4s ease ${i * 80}ms, transform 0.4s ease ${i * 80}ms`;
      setTimeout(function () {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 50 + i * 80);
    });
  }

  /* ----------------------------------------------------------------
     Initialize All
  ---------------------------------------------------------------- */
  ready(function () {
    initHamburger();
    initActiveNav();
    initReadingProgress();
    initBackToTop();
    initSmoothScroll();
    initShareButtons();
    initNewsletterForm();
    initContactForm();
    initSearch();
    initFAQ();
    initLazyImages();
    initCardAnimations();
  });

})();
