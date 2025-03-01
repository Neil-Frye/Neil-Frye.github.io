/**
 * Responsive Navigation System
 * Dynamically adapts the navigation menu based on screen size
 * Provides smooth transitions between desktop and mobile views
 */
(function() {
  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const $nav = document.querySelector('#site-nav');
    const $toggleBtn = document.querySelector('.mobile-menu-toggle');
    const $mobileOverlay = document.querySelector('.mobile-nav-overlay');
    const $visibleLinks = document.querySelector('.visible-links');
    const $masthead = document.querySelector('.masthead');
    const $mobileNavContainer = document.querySelector('.mobile-nav-container');
    const $mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    
    // Breakpoints for different device sizes
    const MOBILE_BREAKPOINT = 600;
    const TABLET_BREAKPOINT = 900;
    
    // Check if required elements exist
    if (!$nav || !$toggleBtn || !$mobileOverlay || !$visibleLinks) return;
    
    // Function to check if menu items fit in the available space
    function checkMenuOverflow() {
      // Get the available width for the menu
      const navWidth = $nav.clientWidth;
      const logoWidth = $nav.querySelector('.site-title').offsetWidth;
      const toggleBtnWidth = $toggleBtn.offsetWidth;
      const availableWidth = navWidth - logoWidth - toggleBtnWidth - 20; // 20px buffer
      
      // Calculate the width of all menu items
      let menuItemsWidth = 0;
      const menuItems = $visibleLinks.querySelectorAll('li');
      menuItems.forEach(item => {
        menuItemsWidth += item.offsetWidth;
      });
      
      // Determine if menu items fit
      const menuOverflows = menuItemsWidth > availableWidth;
      
      // Update the UI based on overflow status
      if (menuOverflows || window.innerWidth <= TABLET_BREAKPOINT) {
        // Switch to mobile menu
        document.body.classList.add('mobile-menu-active');
        $toggleBtn.style.display = 'flex';
      } else {
        // Switch to desktop menu
        document.body.classList.remove('mobile-menu-active');
        $toggleBtn.style.display = 'none';
        
        // Ensure mobile menu is closed
        if ($mobileOverlay.classList.contains('is-visible')) {
          toggleMobileMenu();
        }
      }
    }
    
    // Function to toggle mobile menu
    function toggleMobileMenu() {
      const isExpanded = $toggleBtn.getAttribute('aria-expanded') === 'true';
      
      if (!isExpanded) {
        // Open menu
        $toggleBtn.setAttribute('aria-expanded', 'true');
        $toggleBtn.classList.add('is-active');
        $mobileOverlay.classList.add('is-visible');
        document.body.classList.add('menu-open');
        
        // Animate mobile nav container
        if ($mobileNavContainer) {
          $mobileNavContainer.style.transform = 'translateY(0)';
          $mobileNavContainer.style.opacity = '1';
        }
        
        // Animate mobile nav items with staggered delay
        if ($mobileNavItems) {
          $mobileNavItems.forEach((item, index) => {
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateX(0)';
            }, 50 + (index * 50));
          });
        }
        
        // Prevent background scrolling
        document.body.style.overflow = 'hidden';
      } else {
        // Close menu
        $toggleBtn.setAttribute('aria-expanded', 'false');
        $toggleBtn.classList.remove('is-active');
        $mobileOverlay.classList.remove('is-visible');
        document.body.classList.remove('menu-open');
        
        // Reset mobile nav container animation
        if ($mobileNavContainer) {
          $mobileNavContainer.style.transform = 'translateY(20px)';
          $mobileNavContainer.style.opacity = '0';
        }
        
        // Reset mobile nav items animation
        if ($mobileNavItems) {
          $mobileNavItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-10px)';
          });
        }
        
        // Restore scrolling
        document.body.style.overflow = '';
      }
    }
    
    // Toggle menu when button is clicked
    $toggleBtn.addEventListener('click', function(e) {
      e.preventDefault();
      toggleMobileMenu();
    });
    
    // Close menu when clicking on a link in mobile view
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-item a');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (document.body.classList.contains('mobile-menu-active')) {
          toggleMobileMenu();
        }
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (
        $mobileOverlay.classList.contains('is-visible') && 
        !$nav.contains(e.target)
      ) {
        toggleMobileMenu();
      }
    });
    
    // Close menu when pressing Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && $mobileOverlay.classList.contains('is-visible')) {
        toggleMobileMenu();
      }
    });
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
      // Debounce the resize event
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function() {
        checkMenuOverflow();
      }, 100);
    });
    
    // Handle orientation change
    window.addEventListener('orientationchange', function() {
      setTimeout(checkMenuOverflow, 100);
    });
    
    // Add scroll shadow effect to masthead
    if ($masthead) {
      window.addEventListener('scroll', function() {
        if (window.scrollY > 10) {
          $masthead.classList.add('is-scrolled');
        } else {
          $masthead.classList.remove('is-scrolled');
        }
      });
    }
    
    // Initial setup
    checkMenuOverflow();
    
    // Set initial styles for mobile nav container and items
    if ($mobileNavContainer) {
      $mobileNavContainer.style.transform = 'translateY(20px)';
      $mobileNavContainer.style.opacity = '0';
      $mobileNavContainer.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease';
      $mobileNavContainer.style.transitionDelay = '0.1s';
    }
    
    if ($mobileNavItems) {
      $mobileNavItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-10px)';
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        item.style.transitionDelay = `${0.05 + (index * 0.05)}s`;
      });
    }
  });
})();
