class Wall extends Template {
    constructor (x, y, w, h, img) {
        super(x, y, w, h, img)

        this.img = new Image();
        this.img.src = 'img/RockWall(orFloor)_specular.png'

    }
}

class PenetrableWall extends Wall {
    constructor (x, y, w, h, img) {
        super(x, y, w, h, img)

        this.img = new Image();
        this.img.src = 'img/Wood_12.png'

    }
}

class Dirt extends Wall {
    constructor (x, y, w, h, img) {
        super(x, y, w, h, img)

        this.img = new Image();
        this.img.src = 'img/muddy_ground.png'

    }

}

class Stairs extends Template {
    constructor (x, y, w, h, img) {
        super(x, y, w, h, img)

        this.img = new Image();
        this.img.src = 'img/moreStairsDown.png'

    }
}

class Item {
    constructor (x, y, w, h, imgSrc) {
        this.x= x;
        this.y= y;
        this.w= w;
        this.h= h;
        this.img = new Image();
        this.img.src = imgSrc

    }

    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }
}

class Door extends Template {
    constructor (x, y, w, h, img) {
        super(x, y, w, h, img)

        this.img = new Image();
        this.img.src = 'img/door.png'

    }
}

let walls = [];
let floors = [];

let mapOne = [
    ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
    ['-','0','0','0','0','-','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-','0','0','0','0','0','0','-'],
    ['-','0','0','0','0','-','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-','0','0','0','0','0','0','-'],
    ['-','0','0','0','0','-','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-','0','0','0','0','0','0','-'],
    ['-','0','0','0','0','-','-','-','-','-','-','-','-','-','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-','0','0','0','0','0','0','-'],
    ['-','0','0','0','0','0','0','0','0','0','0','0','0','-','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-','0','0','0','0','0','0','-'],
    ['-','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-','-','-','-','-','-','-','-','-','-','-','0','0','0','-','0','0','0','0','0','0','-'],
    ['-','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-','0','0','0','0','0','0','0','0','0','0','0','0','0','-','0','0','0','0','0','0','-'],
    ['-','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-','0','0','0','0','0','0','0','0','0','0','0','0','0','-','0','0','0','0','0','0','-'],
    ['-','0','0','0','0','0','0','0','0','-','-','-','-','-','-','-','-','-','-','0','0','0','0','0','0','0','-','0','0','0','0','0','0','0','0','0','0','0','0','0','-','0','0','0','0','0','0','-'],
    ['-','0','0','0','0','0','0','0','0','-','0','0','0','-','0','0','0','0','0','0','0','0','0','0','0','0','-','0','0','0','0','0','0','0','0','0','-','0','0','0','-','-','-','-','0','0','0','-'],
    ['-','0','0','0','0','0','0','0','0','-','0','0','0','-','0','0','0','0','0','0','0','0','0','0','0','0','-','0','0','0','0','0','0','0','0','0','-','0','0','0','0','0','0','-','0','0','0','-'],
    ['-','0','0','0','0','0','0','0','0','-','0','0','0','-','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-','0','0','0','0','0','0','0','0','0','0','-'],
    ['-','0','0','0','0','0','0','0','0','-','0','0','0','-','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-','0','0','0','0','0','0','0','0','0','0','-'],
    ['-','0','0','0','0','0','0','0','0','-','0','0','0','-','E','E','E','E','E','E','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-','0','0','0','0','0','0','-','0','0','0','-'],
    ['-','0','0','0','0','0','0','0','0','-','0','0','0','-','E','E','E','E','E','E','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-','-','-','0','0','0','0','-','0','0','0','-'],
    ['-','0','0','0','0','0','0','0','0','-','0','0','0','-','E','E','E','E','E','E','-','-','-','-','-','-','-','0','0','0','0','0','0','0','0','0','0','0','-','0','0','0','0','-','0','0','0','-'],
    ['-','0','0','0','0','-','-','-','-','-','0','0','0','-','E','E','E','E','E','E','-','0','0','0','0','0','-','0','0','0','0','0','0','0','0','0','0','0','-','0','0','0','0','-','0','0','0','-'],
    ['-','0','0','0','0','-','0','0','0','0','0','0','0','-','E','E','E','E','E','E','-','0','0','0','0','0','-','0','0','0','0','0','0','0','0','0','0','0','-','0','0','0','0','-','0','0','0','-'],
    ['-','0','0','0','0','-','0','0','0','0','0','0','0','-','E','E','E','E','E','E','-','-','-','-','-','-','-','0','0','0','0','0','0','0','0','0','0','0','-','0','0','0','0','-','D','D','D','-'],
    ['-','0','0','0','0','-','0','0','0','0','0','0','0','-','E','E','E','E','E','E','0','0','0','-','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-','0','0','0','0','0','0','0','0','-'],
    ['-','0','0','0','0','-','0','0','0','0','-','-','-','-','E','E','E','E','E','E','0','0','0','-','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-','0','0','0','0','0','0','0','0','-'],
    ['-','0','0','0','0','-','0','0','0','0','-','0','0','0','E','E','E','E','E','E','0','0','0','-','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-','0','0','0','0','0','0','0','0','-'],
    ['-','0','0','0','0','P','0','0','0','0','-','0','0','0','E','E','E','E','E','E','0','0','0','-','0','0','0','0','-','-','-','-','-','-','0','0','0','0','-','-','-','-','-','-','-','-','-','-'],
    ['-','0','0','0','0','P','0','0','0','0','-','-','-','-','-','-','0','0','0','-','-','-','-','-','0','0','0','0','-','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-'],
    ['-','0','0','0','0','P','0','0','0','0','0','0','T','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-'],
    ['-','0','0','0','0','-','0','0','0','0','0','0','T','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-'],
    ['-','0','S','S','0','-','0','0','0','0','0','0','T','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-'],
    ['-','-','S','S','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
    ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],

]

let mapTwo = [
    ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
    ['-','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-'],
    ['-','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-'],
    ['-','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-'],
    ['-','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-'],
    ['-','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-'],
    ['-','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-'],
    ['-','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-'],
    ['-','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-'],
    ['-','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-'],
    ['-','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-'],
    ['-','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-'],
    ['-','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-'],
    ['-','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-'],
    ['-','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-'],
    ['-','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-'],
    ['-','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-'],
    ['-','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-'],
    ['-','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-'],
    ['-','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-'],
    ['-','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-'],
    ['-','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-'],
    ['-','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-'],
    ['-','0','0','0','0','P','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-'],
    ['-','0','0','0','0','P','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-'],
    ['-','0','0','0','0','0','P','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-'],
    ['-','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-'],
    ['-','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','-'],
    ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
    ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],

]






