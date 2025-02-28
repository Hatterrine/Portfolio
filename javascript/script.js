let video = document.getElementById("myvideo");

        function playLoop() {
            video.loop = true; // Active la lecture en boucle
            video.play(); // Joue la vidéo
        }

        function stopLoop() {
            video.loop = false; // Désactive la lecture en boucle
            video.pause(); // Met la vidéo en pause
            video.currentTime = 0; // Remet la vidéo au début
        }