class Template {
    constructor (x, y, w, h, color, img) {

        this.x = x
        this.y = y
        this.w = w
        this.h = h
        if (color) this.color = color
        if (img) this.img = img
    }

    draw () {

        if (this.img) {
            ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
        }
        else if (this.color) {
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.w, this.h)
        }
    }

    clear() {
        clearRect(this.x, this.y, this.w, this.h)
    }

    detectCollision (target1, target2) {

    }




}