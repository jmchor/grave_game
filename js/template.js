"use strict";
class Template {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.currentFrame = 0;
    }
    draw() {
        if (this.img) {
            ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
        }
        else if (this.color) {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.w, this.h);
        }
    }
    clear() {
        ctx.clearRect(this.x, this.y, this.w, this.h);
    }
}
