"use strict";
class Wall {
    x: number
    y: number
    w: number
    h: number
    img: any


    constructor(x: number, y: number, w: number, h: number) {

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = new Image();
        this.img.src = 'img/RockWall(orFloor)_specular.png';
    }

    draw(): void {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);

    }
}
class PenetrableWall extends Wall {
    constructor(x: number, y: number, w: number, h: number) {
        super(x, y, w, h);
        this.img = new Image();
        this.img.src = 'img/Wood_12.png';
    }
}

class Barrier extends Wall {
    constructor(x: number, y: number, w: number, h: number) {
        super(x, y, w, h);
        this.img = new Image();
        this.img.src = 'img/rock_pickaxe.png';
    }
}
class Dirt extends Wall {
    constructor(x: number, y: number, w: number, h: number) {
        super(x, y, w, h);
        this.img = new Image();
        this.img.src = 'img/muddy_ground.png';
    }
}
class Stairs extends Wall {
    constructor(x: number, y: number, w: number, h: number) {
        super(x, y, w, h);
        this.img = new Image();
        this.img.src = 'img/moreStairsDown.png';
    }
}
class Item {
    x: number
    y: number
    w: number
    h: number
    img: any
    imgSrc: string | undefined

    constructor(x: number, y: number, w: number, h: number, imgSrc: string | undefined) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = new Image();
        this.img.src = imgSrc;
    }
    draw(): void {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }
}
class Door extends Wall {
    constructor(x: number, y: number, w: number, h: number) {
        super(x, y, w, h);
        this.img = new Image();
        this.img.src = 'img/door.png';
    }
}

let map: object;
let walls: Wall[] = [];
let floors: Dirt[] = [];
let barriers: Barrier[] = [];
let mapOne: string[][] = [
    ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
    ['-', '0', '0', '0', '0', '-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-', '0', '0', '0', '0', '0', '0', '-'],
    ['-', '0', '0', '0', '0', '-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-', '0', '0', '0', '0', '0', '0', '-'],
    ['-', '0', '0', '0', '0', '-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-', '0', '0', '0', '0', '0', '0', '-'],
    ['-', '0', '0', '0', '0', '-', '-', '-', '-', '-', '-', '-', '-', '-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-', '0', '0', '0', '0', '0', '0', '-'],
    ['-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-', '0', '0', '0', '0', '0', '0', '-'],
    ['-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '0', '0', '0', '-', '0', '0', '0', '0', '0', '0', '-'],
    ['-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-', '0', '0', '0', '0', '0', '0', '-'],
    ['-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-', '0', '0', '0', '0', '0', '0', '-'],
    ['-', '0', '0', '0', '0', '0', '0', '0', '0', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '0', '0', '0', '0', '0', '0', '0', '-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-', '0', '0', '0', '0', '0', '0', '-'],
    ['-', '0', '0', '0', '0', '0', '0', '0', '0', '-', '0', '0', '0', '-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-', '0', '0', '0', '-', '-', '-', '-', '0', '0', '0', '-'],
    ['-', '0', '0', '0', '0', '0', '0', '0', '0', '-', '0', '0', '0', '-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-', '0', '0', '0', '0', '0', '0', '-', '0', '0', '0', '-'],
    ['-', '0', '0', '0', '0', '0', '0', '0', '0', '-', '0', '0', '0', '-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-'],
    ['-', '0', '0', '0', '0', '0', '0', '0', '0', '-', '0', '0', '0', '-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-'],
    ['-', '0', '0', '0', '0', '0', '0', '0', '0', '-', '0', '0', '0', '-', 'E', 'E', 'E', 'E', 'E', 'E', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-', '0', '0', '0', '0', '0', '0', '-', '0', '0', '0', '-'],
    ['-', '0', '0', '0', '0', '0', '0', '0', '0', '-', '0', '0', '0', '-', 'E', 'E', 'E', 'E', 'E', 'E', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-', '-', '-', '0', '0', '0', '0', '-', '0', '0', '0', '-'],
    ['-', '0', '0', '0', '0', '0', '0', '0', '0', '-', '0', '0', '0', '-', 'E', 'E', 'E', 'E', 'E', 'E', '-', '-', '-', '-', '-', '-', '-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-', '0', '0', '0', '0', '-', '0', '0', '0', '-'],
    ['-', '0', '0', '0', '0', '-', '-', '-', '-', '-', '0', '0', '0', '-', 'E', 'E', 'E', 'E', 'E', 'E', '-', '0', '0', '0', '0', '0', '-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-', '0', '0', '0', '0', '-', '0', '0', '0', '-'],
    ['-', '0', '0', '0', '0', '-', '0', '0', '0', '0', '0', '0', '0', '-', 'E', 'E', 'E', 'E', 'E', 'E', '-', '0', '0', '0', '0', '0', '-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-', '0', '0', '0', '0', '-', '0', '0', '0', '-'],
    ['-', '0', '0', '0', '0', '-', '0', '0', '0', '0', '0', '0', '0', '-', 'E', 'E', 'E', 'E', 'E', 'E', '-', '-', '-', '-', '-', '-', '-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-', '0', '0', '0', '0', '-', 'D', 'D', 'D', '-'],
    ['-', '0', '0', '0', '0', '-', '0', '0', '0', '0', '0', '0', '0', '-', 'E', 'E', 'E', 'E', 'E', 'E', '0', '0', '0', '-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-', '0', '0', '0', '0', '0', '0', '0', '0', '-'],
    ['-', '0', '0', '0', '0', '-', '0', '0', '0', '0', '-', '-', '-', '-', 'E', 'E', 'E', 'E', 'E', 'E', '0', '0', '0', '-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-', '0', '0', '0', '0', '0', '0', '0', '0', '-'],
    ['-', '0', '0', '0', '0', '-', '0', '0', '0', '0', '-', '0', '0', '0', 'E', 'E', 'E', 'E', 'E', 'E', '0', '0', '0', '-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-', '0', '0', '0', '0', '0', '0', '0', '0', '-'],
    ['-', '0', '0', '0', '0', 'P', '0', '0', '0', '0', '-', '0', '0', '0', 'E', 'E', 'E', 'E', 'E', 'E', '0', '0', '0', '-', '0', '0', '0', '0', '-', '-', '-', '-', '-', '-', '0', '0', '0', '0', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
    ['-', '0', '0', '0', '0', 'P', '0', '0', '0', '0', '-', '-', '-', '-', '-', '-', '0', '0', '0', '-', '-', '-', '-', '-', '0', '0', '0', '0', '-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-'],
    ['-', '0', '0', '0', '0', 'P', '0', '0', '0', '0', '0', '0', 'T', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-'],
    ['-', '0', '0', '0', '0', '-', '0', '0', '0', '0', '0', '0', 'T', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-'],
    ['-', '0', 'S', 'S', '0', '-', '0', '0', '0', '0', '0', '0', 'T', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-'],
    ['-', '-', 'S', 'S', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
];
let mapTwo: string[][] = [
    ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
    ['-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-'],
    ['-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-'],
    ['-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-'],
    ['-', '-', '-', '-', '-', '-', '0', '0', '0', '0', '0', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
    ['-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-'],
    ['-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-'],
    ['-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-'],
    ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
    ['-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-'],
    ['-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-'],
    ['-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-'],
    ['-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-'],
    ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '0', '0', '0', '0', '0', '0', '-', '-'],
    ['-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-'],
    ['-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-'],
    ['-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-'],
    ['-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-'],
    ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
    ['-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-'],
    ['-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-'],
    ['-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-'],
    ['-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-'],
    ['-', '-', '-', '-', '-', '0', '0', '0', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
    ['-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-'],
    ['-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-'],
    ['-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-'],
    ['-', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-'],
    ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
];
