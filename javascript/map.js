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
        this.img.src = 'img/floor.png'

    }


}

class Stairs extends Template {
    constructor (x, y, w, h, img) {
        super(x, y, w, h, img)

        this.img = new Image();
        this.img.src = 'img/moreStairsDown.png'

    }
}

class Key extends Template {
    constructor (x, y, w, h, img) {
        super(x, y, w, h, img)

        this.img = new Image();
        this.img.src = 'img/key.png'

    }
}

class Pickaxe extends Key {
    constructor (x, y, w, h, img) {
        super(x, y, w, h, img)

        this.img = new Image();
        this.img.src = 'img/pickaxe2.png'

    }
}

class Lever extends Key {
    constructor (x, y, w, h, img) {
        super(x, y, w, h, img)

        this.img = new Image();
        this.img.src = 'img/Tile_21.png'

    }
}

class Item extends Key {
    constructor (x, y, w, h, img) {
        super(x, y, w, h, img)

        this.img = new Image();
        this.img.src = 'img/item.png'

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
    ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','D','D','D','0'],
    ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','P','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','P','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','P','0','0','0','0','0','0','T','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0','0','0','0','0','T','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
    ['0','0','S','S','0','0','0','0','0','0','0','0','T','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
    ['0','0','S','S','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],

]

function drawMap(){

    if (graveSite.isLevelOne) {
        map = mapOne
    } else if (graveSite.isLevelTwo) {
        map = mapTwo
    }
    map.forEach((row, index) => {
        row.forEach((cell, count) => {
            switch (cell) {
                case '-':
                    walls.push(
                        new Wall(25 * count, 25 * index, 25, 25, 'black')
                    )
                    break;
                case 'S':
                    walls.push(
                        new Stairs(25 * count, 25 * index, 25, 25, 'black')
                    )
                    break;
                case 'E':
                    floors.push(
                        new Dirt(25 * count, 25 * index, 25, 25, 'orange')
                    );

                    break;
                 case 'T':
                    if (graveSite.hasDoorKey) {
                        walls.push(
                            new Wall(25 * count, 25 * index, 25, 25, 'black')
                        )
                    }
                    break;
                case 'P':
                    if (!graveSite.hasDoorKey || !graveSite.hasPickaxe) {
                    walls.push(
                        new Wall(25 * count, 25 * index, 25, 25, 'white'))
                    }
                    break;
                    case 'D':
                        if (!graveSite.hasPulledLever) {
                            walls.push( new PenetrableWall(25 * count, 25 * index, 25, 25, 'black'))}
                default:
                    break;
            }
        })
    })

    walls.forEach(wall => {
        wall.draw();

})
    floors.forEach(floor => {
        floor.draw();
    })

        ctx.fillStyle = '#f0ddb8'
        ctx.fillRect(0, 715, 1200, 85)

        ctx.strokeStyle = "#816852"
        ctx.lineWidth = 5
        ctx.strokeRect(3, 715, 985, 83)
        ctx.strokeRect(990, 715, 208, 83)



}


function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.playbackRate = 4;
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }




