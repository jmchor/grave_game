
let player
let key
let pickaxe
let door
let door2
let currentTime
let currentFrame
let timer
let ghoul
let ghoul2
let skeleton
let skeleton2
let skeleton3
let keyPlace
let pickPlace
let inventory



const graveSite = {

    // The game's configuration
    hasGameStarted: false,
    isGameOver: false,
    isGamePaused: false,
    isLeftKeyPressed: false,
    isRightKeyPressed: false,
    isUpKeyPressed: false,
    isDownKeyPressed: false,
    hasDoorKey: false,
    hasPlayerWon: false,
    hasPlayerLost: false,
    hasPickaxe: false,
    hasPulledLever: false,
    isTrapped: false,
    isLevelOne: true,
    isLevelTwo: false,


    startGame: function() {
        timer = setInterval(() => {
            currentTime += 1;
            }, 1000);


        graveSite.hasGameStarted = true;


            drawMap()


        player.draw();
        ghoul.draw();
        ghoul2.draw();
        door.draw()
        door2.draw()

        graveSite.displayTime()

        graveSite.update()


    },

    restartGame: function() {
        currentTime = 0;
        clearInterval(timer);
        graveSite.isGameOver = false;
        graveSite.isGamePaused = false;
        graveSite.hasGameStarted = false;
        graveSite.hasDoorKey = false;
        graveSite.hasPickaxe = false;
        graveSite.hasPulledLever = false;
        graveSite.isTrapped = false;
        keyPlace = [key]
        pickPlace = [pickaxe]
        inventory = []

        if (graveSite.isLevelOne) {
            player.x = 50;
        player.y = 610;
        key.y = 260
        pickaxe.y = 40

        } else if (graveSite.isLevelTwo) {
            player.x = 50;
        player.y = 150;
        key.y = 260
        pickaxe.y = 40 }

        ctx.clearRect(0,0,canvas.width, canvas.height)

        graveSite.startGame(); },

    getSeconds: function() {
       return Math.floor(currentTime % 60);
    },

    getMinutes: function() {
        return Math.floor(currentTime / 60);
    },

    computeTwoDigitNumber: function (value) {
		if (value < 10) {
			return '0' + value;
		} else {
			return value.toString();
		}
	},

    displayTime: function() {
        let seconds = graveSite.computeTwoDigitNumber(graveSite.getSeconds());
        let minutes = graveSite.computeTwoDigitNumber(graveSite.getMinutes());
        // ctx.fillStyle = '#8b7c59';
        // ctx.fillRect(1050, 725, 150,75);
        ctx.fillStyle = 'black';
        ctx.font = '40px "Work Sans"';
        ctx.fillText(`${minutes}:${seconds}`, 1045, 770);
    },



    update: function() {

        encounterEnemy(ghoul)
        encounterEnemy(ghoul2)
        encounterEnemy(skeleton)
        encounterEnemy(skeleton2)
        encounterEnemy(skeleton3)

        walls = []
        inventory = []

        if (graveSite.isGamePaused) return

        if (graveSite.isLeftKeyPressed) {
            player.moveLeft();
        }
        if (graveSite.isRightKeyPressed) {
            player.moveRight();
        }
        if (graveSite.isUpKeyPressed) {
            player.moveUp();
        }
        if (graveSite.isDownKeyPressed) {
            player.moveDown();
        }
        player.update();
        ghoul.update();
        ghoul2.update();
        skeleton.update()
        skeleton2.update()
        skeleton3.update()


        ctx.clearRect(0, 0, canvas.width, canvas.height);


        drawMap()


        walls.forEach(wall => {

            skeleton.runsAgainstWalls(wall)
            skeleton2.runsAgainstWalls(wall)
            skeleton3.runsAgainstWalls(wall)

            if (player.detectCollision(wall)) {

                let previousY = player.y - player.velocity.y;
                let previousX = player.x - player.velocity.x
                player.velocity.x = 0;
                player.velocity.y = 0;
                player.x = previousX;
                player.y = previousY;
            }
        })

        player.draw();
        ghoul.draw();
        ghoul2.draw();
        skeleton.draw()
        skeleton2.draw()
        skeleton3.draw()
        door.draw()
        door2.draw()

        player.inventory()
        graveSite.displayTime()

        getKey()
        getPickaxe()

        requestAnimationFrame(graveSite.update)

    }
}


if (graveSite.isLevelOne)

{player = new Player(50, 610, 50, 50, 'brown');
key = new Key(275, 260 , 50, 50)
pickaxe = new Pickaxe(160, 40, 50, 50)
door = new Door(1070, 0, 60 , 80, 'green')
door2 = new Lever (1070, 650, 30 , 30, 'green')
currentTime = 0;
currentFrame = 0;
timer;
ghoul = new Ghoul(400, 300, 50, 50, 'pink', {x1: 400, y1: 300, x2: 400, y2: 520, x3: 800, y3: 520, x4: 800, y4: 300})
ghoul2 = new Ghoul(300, 50, 50, 50, 'pink', {x1: 300, y1: 50, x2: 300, y2: 150, x3: 600, y3: 150, x4: 600, y4: 50})
skeleton = new Skeleton(1100, 302, 45, 45, 'grey', {x: -5, y: 0})
skeleton2 = new Skeleton(100, 300, 50, 50, 'grey', {x: 0, y: -5})
skeleton3 = new Skeleton(880, 520 , 50, 50, 'grey', {x: 0, y: 5})
keyPlace = [key]
pickPlace = [pickaxe]
inventory = []
}

if (graveSite.isLevelTwo){
    player = new Player(50, 150, 50, 50, 'brown');
key = new Key(275, 260 , 50, 50)
pickaxe = new Pickaxe(160, 40, 50, 50)
door = new Door(1070, 0, 60 , 80, 'green')
door2 = new Lever (1070, 650, 30 , 30, 'green')
currentTime = 0;
currentFrame = 0;
timer;
ghoul = new Ghoul(400, 300, 50, 50, 'pink', {x1: 400, y1: 300, x2: 400, y2: 520, x3: 800, y3: 520, x4: 800, y4: 300})
ghoul2 = new Ghoul(300, 50, 50, 50, 'pink', {x1: 300, y1: 50, x2: 300, y2: 150, x3: 600, y3: 150, x4: 600, y4: 50})
skeleton = new Skeleton(1100, 302, 45, 45, 'grey', {x: -5, y: 0})
skeleton2 = new Skeleton(100, 300, 50, 50, 'grey', {x: 0, y: -5})
skeleton3 = new Skeleton(880, 520 , 50, 50, 'grey', {x: 0, y: 5})
keyPlace = [key]
pickPlace = [pickaxe]
inventory = []


}

