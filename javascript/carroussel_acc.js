const images = [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1465101178521-c1a9136a3cd7?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80"
    ];

    const track = document.querySelector('.carousel-track');
    let slides = [];
    let angleOffset = 0;
    const visibleCount = 6; // images visibles autour du cylindre
    let rotationPerStep = 360 / images.length;
    const scrollStep = 3; // combien d’images par scroll
    let scrollLock = false;

    function createCarousel() {
      track.innerHTML = '';
      slides = [];

      const slideWidth = Math.min(220, window.innerWidth / visibleCount - 16);
      const radius = (slideWidth / 2) / Math.tan(Math.PI / images.length) + 100;

      images.forEach((src, i) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.style.width = `${slideWidth}px`;
        slide.style.height = `${slideWidth * 1.3}px`;
        const img = document.createElement('img');
        img.src = src;
        slide.appendChild(img);
        track.appendChild(slide);
        slides.push({ el: slide, angle: i * rotationPerStep });
      });

      positionSlides(radius);
    }

    function positionSlides(radius) {
      slides.forEach(slide => {
        const angle = slide.angle + angleOffset;
        const rad = angle * Math.PI / 180;
        const x = Math.sin(rad) * radius;
        const z = Math.cos(rad) * radius;
        slide.el.style.transform = `
          translate(-50%, -50%)
          translateX(${x}px)
          translateZ(${z}px)
          rotateY(${angle}deg)
        `;
      });
    }

    function rotateCarousel(step) {
      angleOffset += step * rotationPerStep;
      positionSlides((slides[0].el.offsetWidth / 2) / Math.tan(Math.PI / slides.length) + 100);
    }

    // Scroll avec blocage
    window.addEventListener('wheel', e => {
      if (scrollLock) return;
      scrollLock = true;

      const dir = e.deltaY > 0 ? -1 : 1;
      rotateCarousel(dir * scrollStep);

      setTimeout(() => scrollLock = false, 800);
    }, { passive: false });

    // Swipe & Drag
    let startX = 0, isDragging = false;
    document.addEventListener('mousedown', e => {
      startX = e.clientX;
      isDragging = true;
    });
    document.addEventListener('mouseup', e => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 30) {
        rotateCarousel(Math.sign(dx) * -scrollStep);
      }
      isDragging = false;
    });

    document.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
    });
    document.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 30) {
        rotateCarousel(Math.sign(dx) * -scrollStep);
      }
    });

    window.addEventListener('resize', createCarousel);
    window.addEventListener('load', createCarousel);