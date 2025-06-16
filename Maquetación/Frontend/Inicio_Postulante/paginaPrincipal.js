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

    // ...existing code...
    document.querySelectorAll('.ofertaCard').forEach(elemento=>{
      elemento.addEventListener('click', function() {
        elemento.classList.add('animada');
        setTimeout(() => elemento.classList.remove('animada'), 200); // Duración igual a la transición
        const ventana = document.getElementById('infoVentana');
        ventana.classList.toggle('activa');
      });
    })
  // ...existing code...

    window.addEventListener('resize', updateCarousel);
