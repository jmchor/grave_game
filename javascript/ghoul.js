class Ghoul extends Template {
    constructor(x,y,w,h,color,path) {
        super(x,y,w,h,color);
        this.velocity = {x: 0, y: 0}
        // this.img = new Image();
        // this.img.src = 'img/ghoul.png'
        this.path = path

    }
    update() {
        this.draw()
        if ( this.x === this.path.x1 && this.y >= this.path.y1) {
            this.velocity.x = 0;
            this.velocity.y = 5;
            this.x = this.x + this.velocity.x;
            this.y = this.y + this.velocity.y;
        }
        if ( this.x  >= this.path.x2 && this.path.y2 === this.y) {
            this.velocity.y = 0;
            this.velocity.x = 5;
            this.x = this.x + this.velocity.x;
            this.y = this.y + this.velocity.y;
        }
        if (this.path.x3 === this.x && this.y <=  this.path.y3) {
            this.velocity.x = 0;
            this.velocity.y = -5;
            this.x = this.x + this.velocity.x;
            this.y = this.y + this.velocity.y;
        }
        if (this.x <= this.path.x4  && this.path.y4 === this.y) {
            this.velocity.x = -5;
            this.velocity.y = 0;
            this.x = this.x + this.velocity.x;
            this.y = this.y + this.velocity.y;
        }
    }
}

class Skeleton extends Ghoul {
    constructor(x,y,w,h,color, velocity) {
        super(x,y,w,h,color);
        this.velocity = velocity
        // this.img = new Image();
        // this.img.src = 'img/ghoul.png'

    }
    update() {
        this.draw()
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
            this.x = this.x + this.velocity.x;
            this.y = this.y + this.velocity.y;
        } else if (this.detectCollision(wall) && this.velocity.x === 5) {
            this.velocity.x = -5;
            this.velocity.y = 0;
            this.x = this.x + this.velocity.x;
            this.y = this.y + this.velocity.y;
        } else if (this.detectCollision(wall) && this.velocity.y === -5) {
            this.velocity.x = 0;
            this.velocity.y = 5;
            this.x = this.x + this.velocity.x;
            this.y = this.y + this.velocity.y;
        } else if (this.detectCollision(wall) && this.velocity.y === 5) {
            this.velocity.x = 0;
            this.velocity.y = -5;
            this.x = this.x + this.velocity.x;
            this.y = this.y + this.velocity.y;
        }}
    }




