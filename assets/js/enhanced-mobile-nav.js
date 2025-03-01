/**
 * Enhanced mobile navigation
 * Improves the mobile menu experience with animations and scroll detection
 */
(function() {
  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const $nav = document.querySelector('#site-nav');
    const $btn = document.querySelector('#site-nav button');
    const $hlinks = document.querySelector('#site-nav .hidden-links');
    const $masthead = document.querySelector('.masthead');
    
    if (!$nav || !$btn || !$hlinks || !$masthead) return;
    
    // Replace the "Menu" text with a hamburger icon
    if ($btn) {
      // Hide the text
      $btn.innerHTML = '<span class="navicon"></span>';
      $btn.style.fontSize = '0';
      $btn.style.color = 'transparent';
      $btn.style.width = '44px';
      $btn.style.height = '44px';
      $btn.style.position = 'relative';
      $btn.style.padding = '0.75rem';
    }
    
    // Add scroll shadow effect to masthead
    window.addEventListener('scroll', function() {
      if (window.scrollY > 10) {
        $masthead.classList.add('is-scrolled');
      } else {
        $masthead.classList.remove('is-scrolled');
      }
    });
    
    // Enhance the mobile menu toggle behavior
    $btn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Toggle body class to prevent scrolling when menu is open
      if ($hlinks.classList.contains('hidden')) {
        document.body.classList.add('menu-open');
      } else {
        document.body.classList.remove('menu-open');
      }
    });
    
    // Close menu when clicking on a link
    const menuLinks = $hlinks.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 900) {
          $btn.click(); // Trigger the button click to close the menu
        }
      });
    });
    
    // Close menu when pressing Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && !$hlinks.classList.contains('hidden')) {
        $btn.click(); // Trigger the button click to close the menu
      }
    });
  });
})();
