   // Remplace ces chemins par tes vraies images !
    const pages = [
      'image/guide/guide_00.jpg',
      'image/guide/guide_01.jpg',
      'image/guide/guide_02.jpg',
      'image/guide/guide_03.jpg',
      'image/guide/guide_04.jpg',
      'image/guide/guide_05.jpg',
      'image/guide/guide_06.jpg',
      'image/guide/guide_07.jpg',
      'image/guide/guide_08.jpg',
      'image/guide/guide_09.jpg',
      'image/guide/guide_10.jpg',
      'image/guide/guide_11.jpg',
      'image/guide/guide_12.jpg',
      'image/guide/guide_13.jpg',
      'image/guide/guide_14.jpg'
    ];

    // Indices pour le flipbook (page seule, paires, page seule)
    let flipIndexes = [0];
    for(let i=1; i<pages.length-1; i+=2) { flipIndexes.push(i); }
    flipIndexes.push(pages.length-1);

    let indexPos = 0;

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
      if (idx === 0) {
        staticPages.appendChild(renderStaticPage("left", "", true));
        staticPages.appendChild(renderStaticPage("right", pages[0]));
      }
      else if (idx === pages.length - 1) {
        staticPages.appendChild(renderStaticPage("left", pages[idx]));
        staticPages.appendChild(renderStaticPage("right", "", true));
      } else {
        staticPages.appendChild(renderStaticPage("left", pages[idx]));
        staticPages.appendChild(renderStaticPage("right", pages[idx+1]));
      }
      prevBtn.disabled = (indexPos === 0);
      nextBtn.disabled = (indexPos === flipIndexes.length - 1);
    }

    function turnPage(forward = true) {
      let turningContent, turningClass;
      const idx = flipIndexes[indexPos];
      if (forward && idx !== 0 && idx !== pages.length - 1) {
        turningContent = pages[idx+1];
        turningClass = "turning-page turning";
      } else if (!forward && idx !== 0 && idx !== pages.length - 1) {
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

    window.addEventListener('resize', () => {
      updateStaticPages();
    });