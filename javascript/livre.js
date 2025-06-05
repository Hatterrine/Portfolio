 // Remplace ces chemins par tes vraies images !
    const pages = [
      'image/CD/PAGE_1.webp', // Couverture (page 1) - droite seule au début
      'image/CD/PAGE_2.webp', // Page 2 (gauche)
      'image/CD/PAGE_3.webp', // Page 3 (droite)
      'image/CD/PAGE_4.webp', // Page 4 (gauche)
      'image/CD/PAGE_5.webp', // Page 5 (gauche)
      'image/CD/PAGE_6.webp', // Page 6 (gauche)
      'image/CD/PAGE_7.webp', // Page 7 (gauche)
      'image/CD/PAGE_8.webp'  // Quatrième de couverture (gauche seule à la fin)
    ];

      // Les indices de "double page" sont : [1,2], [3,4], [5,6]

    // index = 0 => page de droite seule (page 1)
    // index = 1 => [page 2 gauche, page 3 droite]
    // index = 3 => [page 4 gauche, page 5 droite]
    // index = 5 => [page 6 gauche, page 7 droite]
    // index = 7 => page de gauche seule (page 8)

    // index prend les valeurs 0, 1, 3, 5, 7
    const flipIndexes = [0, 1, 3, 5, 7];
    let indexPos = 0; // position dans flipIndexes

    const staticPages = document.getElementById("staticPages");
    const book = document.getElementById("book");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    function renderStaticPage(side, src, empty = false) {
      const div = document.createElement("div");
      div.className = "static-page" + (side === "right" ? " right" : "") + (empty ? " empty" : "");
      if (src && !empty) {
        const img = document.createElement("img");
        img.src = src;
        img.alt = "";
        img.className = "i";
        div.appendChild(img);
      }
      return div;
    }

    function updateStaticPages() {
      staticPages.innerHTML = "";
      const idx = flipIndexes[indexPos];
      // Début : page 1 seule à droite
      if (idx === 0) {
        staticPages.appendChild(renderStaticPage("left", "", true));
        staticPages.appendChild(renderStaticPage("right", pages[0]));
      }
      // Fin : page 8 seule à gauche
      else if (idx === 7) {
        staticPages.appendChild(renderStaticPage("left", pages[7]));
        staticPages.appendChild(renderStaticPage("right", "", true));
      }
      // Pages paires du milieu
      else {
        staticPages.appendChild(renderStaticPage("left", pages[idx]));
        staticPages.appendChild(renderStaticPage("right", pages[idx+1]));
      }
      prevBtn.disabled = (indexPos === 0);
      nextBtn.disabled = (indexPos === flipIndexes.length - 1);
    }

    function turnPage(forward = true) {
      let turningContent, turningClass;
      const idx = flipIndexes[indexPos];
      // Animation page tournante (uniquement quand double pages)
      if (forward && idx !== 0 && idx !== 7) {
        // tourner la page de droite
        turningContent = pages[idx+1];
        turningClass = "turning-page turning";
      } else if (!forward && idx !== 0 && idx !== 7) {
        // tourner la page de gauche
        turningContent = pages[idx];
        turningClass = "turning-page left turning-reverse";
      } else {
        turningContent = null;
        turningClass = null;
      }

      let turning;
      if (turningClass) {
        turning = document.createElement("div");
        turning.className = turningClass;
        if (turningContent) {
          const img = document.createElement("img");
          img.src = turningContent;
          img.alt = "";
          turning.appendChild(img);
        }
        book.appendChild(turning);
      }
      setTimeout(() => {
        if (turning && book.contains(turning)) book.removeChild(turning);
        if (forward && indexPos < flipIndexes.length - 1) indexPos += 1;
        else if (!forward && indexPos > 0) indexPos -= 1;
        updateStaticPages();
      }, 1000);
    }

    nextBtn.addEventListener("click", function() {
      if (indexPos < flipIndexes.length - 1) {
        turnPage(true);
      }
    });

    prevBtn.addEventListener("click", function() {
      if (indexPos > 0) {
        turnPage(false);
      }
    });

    // Init
    updateStaticPages();

    // Bonus : adapt height on orientation change
    window.addEventListener('resize', () => {
      updateStaticPages();
    });