"use strict";
class Sound {
    constructor(src, pbr, vol, loop) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.playbackRate = pbr;
        this.sound.volume = vol;
        if (loop) {
            this.sound.loop = true;
        }
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
    }
    play() {
        this.sound.play();
    }
    stop() {
        this.sound.pause();
    }
}
