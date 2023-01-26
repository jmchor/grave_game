"use strict";
class Monk extends Skeleton {
    constructor(x, y, w, h, velocity) {
        super(x, y, w, h, velocity);
        this.velocity = velocity;
        // this.img = new Image();
        // this.img.src = 'img/ghoul.png'
        this.img = new Image();
        this.img.src = './img/monk.png';
        this.source = { x: 0, y: 96, w: 96, h: 32 };
        this.currentFrame = 0;
        this.frameCount = 0;
    }
    runsAgainstWalls(wall) {
        if (this.detectCollision(wall) && this.velocity.x === -2) {
            this.velocity.x = 2;
            this.velocity.y = 0;
            this.source = { x: 0, y: 64, w: 96, h: 32 };
            this.x = this.x + this.velocity.x;
            this.y = this.y + this.velocity.y;
        }
        else if (this.detectCollision(wall) && this.velocity.x === 2) {
            this.velocity.x = -2;
            this.velocity.y = 0;
            this.source = { x: 0, y: 32, w: 96, h: 32 };
            this.x = this.x + this.velocity.x;
            this.y = this.y + this.velocity.y;
        }
        else if (this.detectCollision(wall) && this.velocity.y === -2) {
            this.velocity.x = 0;
            this.velocity.y = 2;
            this.source = { x: 0, y: 0, w: 96, h: 32 };
            this.x = this.x + this.velocity.x;
            this.y = this.y + this.velocity.y;
        }
        else if (this.detectCollision(wall) && this.velocity.y === 2) {
            this.velocity.x = 0;
            this.velocity.y = -2;
            this.source = { x: 0, y: 96, w: 96, h: 32 };
            this.x = this.x + this.velocity.x;
            this.y = this.y + this.velocity.y;
        }
    }
}
