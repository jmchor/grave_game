class Player extends Template {

    constructor(x,y,w,h,color) {
        super(x,y,w,h,color);
        this.speed = 10;
    }

    updateMovement() {
        this.clear()
        this.draw()
    }

    moveUp() {
        if(this.y <= 25) {this.y = 0}
        this.y -= this.speed;
    }
    moveDown() {
        if(this.y >= canvas.height - 25) {this.y = 0}
        this.y += this.speed;
    }
    moveLeft() {
        if(this.x <= 25) {this.x = 0}
        this.x -= this.speed;
    }
    moveRight() {
        if(this.x >= canvas.width - 25) {this.x = 0}
        this.x += this.speed;
    }


}