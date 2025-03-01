/**
 * Hamburger Menu Implementation
 * Directly manipulates the menu button to create a hamburger icon
 */
document.addEventListener('DOMContentLoaded', function() {
  // Get the menu button
  const menuButton = document.querySelector('#site-nav button');
  
  if (menuButton) {
    // Replace the text content with a hamburger icon
    menuButton.innerHTML = '<span class="navicon"></span>';
    
    // Apply inline styles to ensure the button is styled correctly
    menuButton.style.fontSize = '0';
    menuButton.style.color = 'transparent';
    menuButton.style.width = '44px';
    menuButton.style.height = '44px';
    menuButton.style.padding = '0.75rem';
    menuButton.style.position = 'relative';
    menuButton.style.display = 'flex';
    menuButton.style.alignItems = 'center';
    menuButton.style.justifyContent = 'center';
    menuButton.style.background = 'transparent';
    menuButton.style.border = 'none';
    menuButton.style.outline = 'none';
    menuButton.style.cursor = 'pointer';
    
    // Create and style the hamburger icon
    const navicon = menuButton.querySelector('.navicon');
    if (navicon) {
      navicon.style.width = '24px';
      navicon.style.height = '2px';
      navicon.style.backgroundColor = '#333';
      navicon.style.position = 'relative';
      navicon.style.transition = 'background-color 0.3s ease';
      
      // Create before pseudo-element
      const before = document.createElement('span');
      before.style.content = '""';
      before.style.display = 'block';
      before.style.width = '24px';
      before.style.height = '2px';
      before.style.backgroundColor = '#333';
      before.style.position = 'absolute';
      before.style.left = '0';
      before.style.top = '-7px';
      before.style.transition = 'all 0.3s ease';
      
      // Create after pseudo-element
      const after = document.createElement('span');
      after.style.content = '""';
      after.style.display = 'block';
      after.style.width = '24px';
      after.style.height = '2px';
      after.style.backgroundColor = '#333';
      after.style.position = 'absolute';
      after.style.left = '0';
      after.style.bottom = '-7px';
      after.style.transition = 'all 0.3s ease';
      
      // Append pseudo-elements to navicon
      navicon.appendChild(before);
      navicon.appendChild(after);
      
      // Add event listener to animate the icon when clicked
      menuButton.addEventListener('click', function() {
        if (menuButton.classList.contains('close')) {
          // Menu is closing
          navicon.style.backgroundColor = '#333';
          before.style.transform = 'none';
          before.style.top = '-7px';
          after.style.transform = 'none';
          after.style.bottom = '-7px';
        } else {
          // Menu is opening
          navicon.style.backgroundColor = 'transparent';
          before.style.transform = 'rotate(45deg)';
          before.style.top = '0';
          after.style.transform = 'rotate(-45deg)';
          after.style.bottom = '0';
        }
      });
    }
    
    // Style the hidden links for mobile
    const hiddenLinks = document.querySelector('.hidden-links');
    if (hiddenLinks) {
      hiddenLinks.style.transition = 'all 0.3s ease';
    }
  }
});
