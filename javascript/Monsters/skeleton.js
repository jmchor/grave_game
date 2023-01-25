class Skeleton extends Ghoul {
    constructor(x,y,w,h,img, velocity) {
        super(x,y,w,h,img);
        this.velocity = velocity
        // this.img = new Image();
        // this.img.src = 'img/ghoul.png'

        this.img = new Image();
        this.img.src = './img/skeleton.png'
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
            this.velocity.y = 3;
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