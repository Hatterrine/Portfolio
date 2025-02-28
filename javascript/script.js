// Sélection de la vidéo
let video = document.getElementById("myvideo");

// Ajoute un écouteur d'événement pour détecter quand la vidéo commence
video.addEventListener("play", function() {
    video.loop = true; // Active la boucle lorsque la vidéo est lancée
});

// Ajoute un écouteur d'événement pour détecter quand la vidéo est mise en pause
video.addEventListener("pause", function() {
    video.loop = false; // Désactive la boucle lorsque la vidéo est mise en pause
});
