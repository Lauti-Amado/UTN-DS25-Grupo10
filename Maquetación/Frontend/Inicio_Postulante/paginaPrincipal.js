    const track = document.querySelector('.carousel-track');
    const images = document.querySelectorAll('.carousel-image');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    let index = 0;

    function updateCarousel() {
      const width = images[0].clientWidth;
      track.style.transform = `translateX(-${index * width}px)`;
    }

    prevButton.addEventListener('click', () => {
      index = (index === 0) ? images.length - 1 : index - 1;
      updateCarousel();
    });

    nextButton.addEventListener('click', () => {
      index = (index === images.length - 1) ? 0 : index + 1;
      updateCarousel();
    });

    window.addEventListener('resize', updateCarousel);

    function sumar

    // Auto-reproducción (opcional)
    /*setInterval(() => {
      nextButton.click();
    }, 5000);*/