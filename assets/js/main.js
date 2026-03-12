document.addEventListener('DOMContentLoaded', () => {
    // Determine the current slide index from the URL
    const currentPath = window.location.pathname;
    let currentSlide = 1;

    // Extract number from slideX.html
    const match = currentPath.match(/slide(\d+)\.html/);
    if (match) {
        currentSlide = parseInt(match[1]);
    }

    const totalSlides = 10;

    // Set progress bar width based on current slide
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        const progressPercentage = (currentSlide / totalSlides) * 100;
        progressBar.style.width = `${progressPercentage}%`;
    }

    // Navigation function
    const navigateToSlide = (direction) => {
        let targetSlide = currentSlide;

        if (direction === 'next' && currentSlide < totalSlides) {
            targetSlide++;
        } else if (direction === 'prev' && currentSlide > 1) {
            targetSlide--;
        }

        if (targetSlide !== currentSlide) {
            // Add exit animation class
            document.body.classList.add('fade-out');

            // Wait for animation to finish before navigating
            setTimeout(() => {
                const targetUrl = (currentSlide === 2 && direction === "prev") ? "index.html" : `slide${targetSlide}.html`;
                // Try relative path first
                window.location.href = targetUrl;
            }, 300); // matches the CSS transition time
        }
    };

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'Space' || e.key === ' ') {
            navigateToSlide('next');
        } else if (e.key === 'ArrowLeft') {
            navigateToSlide('prev');
        }
    });

    // Touch navigation (swipe)
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    const handleSwipe = () => {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left (next)
            navigateToSlide('next');
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right (prev)
            navigateToSlide('prev');
        }
    };
});
