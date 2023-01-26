class Sound {
    sound: HTMLAudioElement;
    constructor(src: string, pbr: number, vol: number, loop: boolean) {
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
    play(): void {
        this.sound.play();
    }
    stop(): void {
        this.sound.pause();
    }
}