class Ghoul extends Template {
    constructor(x,y,w,h,img,path) {
        super(x,y,w,h,img);
        this.velocity = {x: 0, y: 0}
        // this.img = new Image();
        // this.img.src = 'img/ghoul.png'
        this.path = path
        this.img = new Image();
        this.img.src = 'img/spectre.png'
        this.source = {x: 0, y: 96, w: 96, h: 32}
        this.currentFrame = 0
        this.frameCount = 0



    }
    draw() {
        ctx.drawImage(this.img, this.source.w * this.currentFrame / 3 , this.source.y, this.source.w / 3, this.source.h, this.x, this.y, this.w, this.h)
    }

    animate () {
        this.frameCount++
        if (this.frameCount % 7 === 0 && this.velocity.x !== 0 || this.frameCount % 5 === 0 && this.velocity.y !== 0) this.currentFrame++
        if (this.currentFrame > 2) this.currentFrame = 0
    }

    update() {
        this.draw()
        this.animate()
        if (this.x === this.path.x1 && this.y >= this.path.y1) {
            this.velocity.x = 0;
            this.velocity.y = 5;
            this.source = { y: 0, w: 96, h: 32}
            this.x = this.x + this.velocity.x;
            this.y = this.y + this.velocity.y;
        }
        if (this.x >= this.path.x2 && this.path.y2 === this.y) {
            this.velocity.y = 0;
            this.velocity.x = 5;
            this.source = {y: 64, w: 96, h: 32}
            this.x = this.x + this.velocity.x;
            this.y = this.y + this.velocity.y;
        }
        if (this.path.x3 === this.x && this.y <=  this.path.y3) {
            this.velocity.x = 0;
            this.velocity.y = -5;
            this.source = {y: 96, w: 96, h: 32}
            this.x = this.x + this.velocity.x;
            this.y = this.y + this.velocity.y;
        }
        if (this.x <= this.path.x4  && this.path.y4 === this.y) {
            this.velocity.x = -5;
            this.velocity.y = 0;
            this.source = { y: 32, w: 96, h: 32}
            this.x = this.x + this.velocity.x;
            this.y = this.y + this.velocity.y;
        }
    }
    detectCollision(target) {
        if (this.y + this.velocity.y  + 15 <= target.y + target.h  &&
            this.x + this.w + this.velocity.x -15 >= target.x &&
            this.y + this.h + this.velocity.y  - 15>= target.y &&
            this.x + this.velocity.x + 15  <= target.x + target.w)
            {
                return true
            };
        };
}

class Skeleton extends Ghoul {
    constructor(x,y,w,h,img, velocity) {
        super(x,y,w,h,img);
        this.velocity = velocity
        // this.img = new Image();
        // this.img.src = 'img/ghoul.png'

        this.img = new Image();
        this.img.src = 'img/skeleton.png'
        this.source = {x: 0, y: 96, w: 96, h: 32}
        this.currentFrame = 0
        this.frameCount = 0

    }


    update() {
        this.draw()
        this.animate()
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;


    }

    detectCollision(target) {
        if (this.y + this.velocity.y <= target.y + target.h  &&
            this.x + this.w + this.velocity.x >= target.x &&
            this.y + this.h + this.velocity.y >= target.y &&
            this.x + this.velocity.x <= target.x + target.w)
            {
                return true
            };
        };


      runsAgainstWalls(wall) {

        if (this.detectCollision(wall) && this.velocity.x === -5) {
            this.velocity.x = 5;
            this.velocity.y = 0;
            this.source = {y: 64, w: 96, h: 32}
            this.x = this.x + this.velocity.x;
            this.y = this.y + this.velocity.y;
        } else if (this.detectCollision(wall) && this.velocity.x === 5) {
            this.velocity.x = -5;
            this.velocity.y = 0;
            this.source = { y: 32, w: 96, h: 32}
            this.x = this.x + this.velocity.x;
            this.y = this.y + this.velocity.y;
        } else if (this.detectCollision(wall) && this.velocity.y === -5) {
            this.velocity.x = 0;
            this.velocity.y = 5;
            this.source = { y: 0, w: 96, h: 32}
            this.x = this.x + this.velocity.x;
            this.y = this.y + this.velocity.y;
        } else if (this.detectCollision(wall) && this.velocity.y === 5) {
            this.velocity.x = 0;
            this.velocity.y = -5;
            this.source = {y: 96, w: 96, h: 32}
            this.x = this.x + this.velocity.x;
            this.y = this.y + this.velocity.y;
        }}
    }

    class Monk extends Skeleton {

        constructor(x,y,w,h,img, velocity) {
            super(x,y,w,h,img);
            this.velocity = velocity
            // this.img = new Image();
            // this.img.src = 'img/ghoul.png'

            this.img = new Image();
            this.img.src = 'img/monk.png'
            this.source = {x: 0, y: 96, w: 96, h: 32}
            this.currentFrame = 0
            this.frameCount = 0

        }

        runsAgainstWalls(wall) {

            if (this.detectCollision(wall) && this.velocity.x === -3) {
                this.velocity.x = 3;
                this.velocity.y = 0;
                this.source = {y: 64, w: 96, h: 32}
                this.x = this.x + this.velocity.x;
                this.y = this.y + this.velocity.y;
            } else if (this.detectCollision(wall) && this.velocity.x === 3) {
                this.velocity.x = -3;
                this.velocity.y = 0;
                this.source = { y: 32, w: 96, h: 32}
                this.x = this.x + this.velocity.x;
                this.y = this.y + this.velocity.y;
            } else if (this.detectCollision(wall) && this.velocity.y === -3) {
                this.velocity.x = 0;
                this.velocity.y = 3
                this.source = { y: 0, w: 96, h: 32}
                this.x = this.x + this.velocity.x;
                this.y = this.y + this.velocity.y;
            } else if (this.detectCollision(wall) && this.velocity.y === 3) {
                this.velocity.x = 0;
                this.velocity.y = -3;
                this.source = {y: 96, w: 96, h: 32}
                this.x = this.x + this.velocity.x;
                this.y = this.y + this.velocity.y;
            }}

    }




