"use strict";
class Player extends Template {
    constructor(x, y, w, h, color) {
        super(x, y, w, h);
        this.ctx = canvas.getContext('2d');
        this.velocity = { x: 0, y: 0 };
        this.img = new Image();
        this.img.src = 'img/main_sprite.png';
        this.source = { x: 0, y: 96, w: 96, h: 32 };
        this.currentFrame = 0;
        this.frameCount = 0;
        this.stepCount = 0;
    }
    draw() {
        ctx.drawImage(this.img, this.source.w * this.currentFrame / 3, this.source.y, this.source.w / 3, this.source.h, this.x, this.y, this.w, this.h);
    }
    animate() {
        this.frameCount++;
        if (this.frameCount % 7 === 0 && this.velocity.x !== 0 || this.frameCount % 5 === 0 && this.velocity.y !== 0)
            this.currentFrame++;
        this.stepCount++;
        if (this.stepCount % 15 === 0 && this.velocity.x !== 0 || this.stepCount % 10 === 0 && this.velocity.y !== 0) {
            characterSteps.play();
        }
        if (this.currentFrame > 2)
            this.currentFrame = 0;
    }
    update() {
        this.draw();
        this.animate();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
    moveUp() {
        this.velocity.y = -5;
        this.source = { x: 0, y: 96, w: 96, h: 32 };
    }
    moveDown() {
        this.velocity.y = 5;
        this.source = { x: 0, y: 0, w: 96, h: 32 };
    }
    moveLeft() {
        this.velocity.x = -5;
        this.source = { x: 0, y: 32, w: 96, h: 32 };
    }
    moveRight() {
        this.velocity.x = 5;
        this.source = { x: 0, y: 64, w: 96, h: 32 };
    }
    detectCollision(target) {
        if (this.y + this.velocity.y + 15 <= target.y + target.h &&
            this.x + this.w + this.velocity.x - 15 >= target.x &&
            this.y + this.h + this.velocity.y - 15 >= target.y &&
            this.x + this.velocity.x + 15 <= target.x + target.w) {
            return true;
        }
        ;
    }
    ;
    doorCollision(target) {
        if (this.y <= target.y + target.h &&
            this.x + this.w >= target.x &&
            this.y + this.h >= target.y &&
            this.x <= target.x + target.w) {
            return true;
        }
        ;
    }
    ;
}
