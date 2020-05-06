var menuBtn = document.querySelector('.toggle');
var menu = document.querySelector('.main-nav');

menuBtn.classList.remove('toggle--no-js');
menu.classList.remove('main-nav--no-js');

menuBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    menuBtn.classList.toggle('toggle--closed');
    menuBtn.classList.toggle('toggle--opened');
    menu.classList.toggle('main-nav--closed');
    menu.classList.toggle('main-nav--opened');
});

$(function () {
    $('.services__list').slick({
        slidesToShow: 2,
        slidesToScroll: 2,
        rows: 2,
        arrows: false,
        dots: true,
        dotsClass: 'services-dots',
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1279,
                settings: {
                    variableWidth: true,
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    rows: 2,
                    arrows: false,
                    dots: true,
                    dotsClass: 'services-dots'
                },
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    rows: 3,
                    arrows: false,
                    dots: true,
                    dotsClass: 'services-dots',
                    autoplay: false
                }
            }
        ]
    });
});