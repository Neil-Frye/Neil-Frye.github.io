document.addEventListener('DOMContentLoaded', function() {
    // Initialize Glide Carousel
    new Glide('.endorsements__carousel', {
        type: 'carousel',
        perView: 1,
        focusAt: 'center',
        gap: 0,
        autoplay: 3000,
        hoverpause: true
    }).mount();
});
