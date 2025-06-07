   function openModal(element) {
        const modal = document.querySelector(".modal");
        const modalImage = document.querySelector(".modal-image");
        modalImage.src = element.querySelector('img').src;
        modal.style.display = "flex";   
        document.querySelector('.banner-construction').style.display = 'none';}

    function closeModal() {
        const modal = document.querySelector(".modal");
        modal.style.display = "none";
        document.querySelector('.banner-construction').style.display = '';
    }