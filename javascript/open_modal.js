   function openModal(element) {
        const modal = document.querySelector(".modal");
        const modalImage = document.querySelector(".modal-image");
        modalImage.src = element.querySelector('img').src;
        modal.style.display = "flex";   }

    function closeModal() {
        const modal = document.querySelector(".modal");
        modal.style.display = "none";
    }