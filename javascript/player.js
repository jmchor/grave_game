class Player extends Template {

    constructor(x,y,w,h,color) {
        super(x,y,w,h,color);

        this.velocity = {x: 0, y: 0}


    }



    update() {
        this.draw()
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }

    moveUp() {
        this.velocity.y = -5;
    }
    moveDown() {
        this.velocity.y = 5;

    }
    moveLeft() {
       this.velocity.x = -5;

    }
    moveRight() {

        this.velocity.x = 5;

    }

    detectCollision(target) {
        if (this.y + this.velocity.y <= target.y + target.h  &&
            this.x + this.w + this.velocity.x >= target.x &&
            this.y + this.h + this.velocity.y >= target.y &&
            this.x + this.velocity.x <= target.x + target.w)
            {
                return true

    }

}
}