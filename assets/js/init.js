document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper Carousel
    new Swiper('.endorsements__carousel', {
        loop: true,
        slidesPerView: 1,
        slidesPerGroup: 1,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
});
