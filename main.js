document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            
            // Toggle icon
            const icon = mobileMenu.classList.contains('active') 
                ? '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>' 
                : '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>';
            
            menuToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${icon}</svg>`;
        });

        // Close menu on link click
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                menuToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
            });
        });
    }

    // --- Before/After Slider Logic ---
    const sliderContainer = document.querySelector('.ba-slider');
    const afterImage = document.getElementById('baAfterImage');
    const handle = document.getElementById('baHandle');

    if (sliderContainer && afterImage && handle) {
        let isSliding = false;

        const slide = (e) => {
            if (!isSliding) return;
            
            // Get position
            let x;
            if (e.type === 'touchmove') {
                x = e.touches[0].clientX - sliderContainer.getBoundingClientRect().left;
            } else {
                x = e.clientX - sliderContainer.getBoundingClientRect().left;
            }
            
            // Bound constraints
            const width = sliderContainer.offsetWidth;
            if (x < 0) x = 0;
            if (x > width) x = width;
            
            // Calculate percentage
            const percentage = (x / width) * 100;
            
            // Apply widths
            afterImage.style.width = `${percentage}%`;
            handle.style.left = `${percentage}%`;
        };

        // Mouse Events
        handle.addEventListener('mousedown', () => {
            isSliding = true;
        });
        
        document.addEventListener('mouseup', () => {
            isSliding = false;
        });
        
        document.addEventListener('mousemove', slide);

        // Touch Events
        handle.addEventListener('touchstart', (e) => {
            isSliding = true;
            // Prevent scrolling while dragging
            e.preventDefault();
        });
        
        document.addEventListener('touchend', () => {
            isSliding = false;
        });
        
        document.addEventListener('touchmove', slide);

        // Responsive fix: Keep the inside actual image width equal to container width
        const updateImageWidths = () => {
            const containerWidth = sliderContainer.offsetWidth;
            const innerImg = afterImage.querySelector('.actual-img');
            if(innerImg) {
                innerImg.style.width = `${containerWidth}px`;
            }
        };

        window.addEventListener('resize', updateImageWidths);
        updateImageWidths(); // Initial call
    }

    // --- Smooth Scrolling for Anchor Links (safeguard) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                // Account for fixed header height
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                });
            }
        });
    });
});
