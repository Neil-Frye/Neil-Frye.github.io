/**
 * Enhanced navigation for mobile, tablet, and smaller laptop screens
 * Provides a responsive and professional navigation experience
 */
(function() {
  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', function() {
    const $nav = document.querySelector('#site-nav');
    const $btn = document.querySelector('#site-nav button');
    const $vlinks = document.querySelector('#site-nav .visible-links');
    const $hlinks = document.querySelector('#site-nav .hidden-links');
    
    if (!$nav || !$btn || !$vlinks || !$hlinks) return;
    
    let numOfItems = 0;
    let totalSpace = 0;
    let breakWidths = [];
    let availableSpace, numOfVisibleItems, requiredSpace;
    
    // Breakpoints for different device sizes
    const MOBILE_BREAKPOINT = 600;
    const TABLET_BREAKPOINT = 900;
    
    // Get initial state
    numOfItems = $vlinks.children.length;
    
    // Function to check if menu needs to be adjusted
    function checkNavigation() {
      // Get available space
      availableSpace = $nav.clientWidth - 30; // Account for padding
      
      // For mobile and tablet screens, use hamburger menu
      if (window.innerWidth <= TABLET_BREAKPOINT) {
        $btn.classList.remove('hidden');
        
        // On smaller screens, we want to show all items in the dropdown
        // except for the site title
        if (breakWidths.length === 0) {
          // Save all non-title items to the hidden links
          const items = Array.from($vlinks.children);
          items.forEach(item => {
            if (!item.classList.contains('masthead__menu-item--lg')) {
              breakWidths.push($vlinks.clientWidth);
              $hlinks.insertBefore(item, $hlinks.firstChild);
            }
          });
        }
        
        // Add tablet class for styling differences between mobile and tablet
        if (window.innerWidth > MOBILE_BREAKPOINT) {
          document.body.classList.add('tablet-view');
        } else {
          document.body.classList.remove('tablet-view');
        }
        
        return;
      }
      
      // Reset for desktop if we're coming from smaller screens
      if (window.innerWidth > TABLET_BREAKPOINT && breakWidths.length > 0 && $hlinks.children.length === numOfItems - 1) {
        // Move all items back to visible links
        while ($hlinks.children.length) {
          $vlinks.appendChild($hlinks.firstChild);
        }
        breakWidths = [];
        document.body.classList.remove('tablet-view');
      }
      
      // The visible list is overflowing the nav
      if($vlinks.clientWidth > availableSpace) {
        // Record the width of the list
        breakWidths.push($vlinks.clientWidth);
        
        // Move item to the hidden list
        const lastItem = $vlinks.children[$vlinks.children.length - 1];
        if (lastItem && !lastItem.classList.contains('masthead__menu-item--lg')) {
          $hlinks.insertBefore(lastItem, $hlinks.firstChild);
          numOfVisibleItems = $vlinks.children.length;
        }
        
        // Show the dropdown btn
        if($btn.classList.contains('hidden')) {
          $btn.classList.remove('hidden');
        }
      
      // The visible list is not overflowing
      } else {
        // There is space for another item in the nav
        if(breakWidths.length > 0 && availableSpace > breakWidths[breakWidths.length-1]) {
          // Move the item to the visible list
          $vlinks.appendChild($hlinks.firstChild);
          breakWidths.pop();
        }
        
        // Hide the dropdown btn if hidden list is empty
        if(breakWidths.length < 1) {
          $btn.classList.add('hidden');
          $hlinks.classList.add('hidden');
        }
      }
      
      // Keep counter updated
      $btn.setAttribute('count', breakWidths.length);
      
      // Recur if the visible list is still overflowing the nav
      if($vlinks.clientWidth > availableSpace) {
        checkNavigation();
      }
    }
    
    // Window listeners
    window.addEventListener('resize', checkNavigation);
    window.addEventListener('orientationchange', checkNavigation);
    
    // Button click event with smooth animation
    $btn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Toggle animation classes
      if ($hlinks.classList.contains('hidden')) {
        $hlinks.classList.remove('hidden');
        $hlinks.classList.add('menu-entering');
        this.classList.add('close');
        
        // Use setTimeout to ensure animation plays
        setTimeout(() => {
          $hlinks.classList.remove('menu-entering');
          $hlinks.classList.add('menu-visible');
        }, 10);
      } else {
        $hlinks.classList.remove('menu-visible');
        $hlinks.classList.add('menu-exiting');
        this.classList.remove('close');
        
        // Wait for animation to complete before hiding
        setTimeout(() => {
          $hlinks.classList.add('hidden');
          $hlinks.classList.remove('menu-exiting');
        }, 300); // Match this with CSS transition duration
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!$nav.contains(e.target) && !$hlinks.classList.contains('hidden')) {
        $hlinks.classList.remove('menu-visible');
        $hlinks.classList.add('menu-exiting');
        $btn.classList.remove('close');
        
        // Wait for animation to complete before hiding
        setTimeout(() => {
          $hlinks.classList.add('hidden');
          $hlinks.classList.remove('menu-exiting');
        }, 300); // Match this with CSS transition duration
      }
    });
    
    // Initial check
    checkNavigation();
  });
})();
