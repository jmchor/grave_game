
let player
let key
let pickaxe
let cantTouchThis
let door
let lever
let currentTime
let currentFrame
let score
let timer
let itemTimer
let ghoul
let ghoul2
let skeleton
let skeleton2
let skeleton3
let skeleton4
let monk
let keyPlace
let pickPlace
let inventory
let characterSteps
let backgroundNoise

function sound(src, pbr, vol, loop) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.playbackRate = pbr;
    this.sound.volume = vol;
    if(loop) {
        this.sound.loop = true;
    }
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }



const graveSite = {

    // The game's configuration
    hasGameStarted: false,
    isGameOver: false,
    isGamePaused: false,
    isLeftKeyPressed: false,
    isRightKeyPressed: false,
    isUpKeyPressed: false,
    isDownKeyPressed: false,
    wallsAreSolid: true,
    isIntangible: false,
    hasItemSpawned: false,
    hasDoorKey: false,
    hasPlayerWon: false,
    hasPlayerLost: false,
    hasPickaxe: false,
    hasPulledLever: false,
    isTrapped: false,
    isLevelOne: true,
    isLevelTwo: false,
    clearedLevelOne: false,
    score: 150,
    randomTime : Math.floor(Math.random() * 30000) + 5000,


    startGame: function() {

        characterSteps = new sound("audio/stepstone_5.wav", 4, 1, false);
        backgroundNoise = new sound("audio/eerie.mp3", 1, 0.1, true);


        timer = setInterval(() => {
            currentTime += 1;
            graveSite.score -= 1;

            }, 1000);

        itemTimer = setTimeout(() => {
            graveSite.hasItemSpawned = true;
        }, graveSite.randomTime);


        graveSite.hasGameStarted = true;
            drawMap()
        player.draw();
        door.draw()
        lever.draw()
        graveSite.displayScore()

        graveSite.displayTime()
        graveSite.update()
        backgroundNoise.play()
    },

    restartGame: function() {
        currentTime = 0;
        clearInterval(timer);
        clearTimeout(itemTimer);
        graveSite.isGameOver = false;
        graveSite.isGamePaused = false;
        graveSite.hasGameStarted = false;
        graveSite.hasDoorKey = false;
        graveSite.hasPickaxe = false;
        graveSite.hasPulledLever = false;
        graveSite.isTrapped = false;
        wallsAreSolid = true,
        isIntangible = false,
        hasItemSpawned =  false,

        keyPlace = [key]
        pickPlace = [pickaxe]
        inventory = []

        if (graveSite.isLevelOne ) {
            player.x = 50;
        player.y = 610;
        key.y = 260
        pickaxe.y = 40

        } else if (graveSite.isLevelTwo) {
            map = mapTwo
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
        ctx.fillStyle = 'black';
        ctx.font = '40px "Work Sans"';
        ctx.fillText(`${minutes}:${seconds}`, 1045, 770);
    },

    displayScore: function () {

        ctx.fillStyle = 'black';
        ctx.font = '40px "Work Sans"';
        ctx.fillText(`${graveSite.score}`, 70 , 770)

    },

    update: function() {



        encounterEnemy(ghoul)
        encounterEnemy(ghoul2)
        encounterEnemy(skeleton)
        encounterEnemy(skeleton2)
        encounterEnemy(skeleton3)
        encounterEnemy(skeleton4)
        encounterEnemy(monk)

        walls = []
        floors = []
        tiles = []
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
        skeleton4.update()
        monk.update()


        ctx.clearRect(0, 0, canvas.width, canvas.height);


        drawMap()
        graveSite.displayScore()
        // player.inventory+()

        walls.forEach(wall => {
            let previousY
            let previousX

            skeleton.runsAgainstWalls(wall)
            skeleton2.runsAgainstWalls(wall)
            skeleton3.runsAgainstWalls(wall)
            skeleton4.runsAgainstWalls(wall)
            monk.runsAgainstWalls(wall)

            if (player.detectCollision(wall) && graveSite.wallsAreSolid) {

                previousY = player.y - player.velocity.y;
                previousX = player.x - player.velocity.x
                player.velocity.x = 0;
                player.velocity.y = 0;
                player.x = previousX;
                player.y = previousY;
            }

        })

        floors.forEach(floor => {
            let previousY
            let previousX

            if (player.detectCollision(floor)) {

                previousY = player.y - player.velocity.y / 1.5;
                previousX = player.x - player.velocity.x / 1.5
                player.velocity.x = 0;
                player.velocity.y = 0;
                player.x = previousX;
                player.y = previousY;
            }

        })


        door.draw()
        if (!graveSite.hasPulledLever) {
            lever.draw() }

        else if (graveSite.hasPulledLever) {
            leverPulled.draw()
        }

        player.draw();
        ghoul.draw();
        ghoul2.draw();
        skeleton.draw()
        skeleton2.draw()
        skeleton3.draw()
        skeleton4.draw()
        monk.draw()

        if (graveSite.hasItemSpawned) {
        cantTouchThis.draw()
        }


        graveSite.displayTime()

        getKey()
        getPickaxe()
        getPowerUp(cantTouchThis)

        requestAnimationFrame(graveSite.update)

    }
}


if (graveSite.isLevelOne && graveSite.isLevelTwo === false){
    player = new Player(50, 610, 50, 50, 'brown');
    key = new Key(275, 260 , 50, 50)
    pickaxe = new Pickaxe(160, 40, 50, 50)
    cantTouchThis = new Item(745, 625, 40, 40)
    door = new Door(1070, 0, 60 , 80, 'green')
    lever = new Lever (1070, 650, 30 , 30, 'green')
    leverPulled = new LeverPulled (1070, 650, 30 , 30, 'green')
    currentTime = 0;
    currentFrame = 0;
    score = 150;
    ghoul = new Ghoul(400, 300, 50, 50, 'pink', {x1: 400, y1: 300, x2: 400, y2: 520, x3: 800, y3: 520, x4: 800, y4: 300})
    ghoul2 = new Ghoul(300, 50, 50, 50, 'pink', {x1: 300, y1: 50, x2: 300, y2: 150, x3: 600, y3: 150, x4: 600, y4: 50})
    skeleton = new Skeleton(1100, 302, 45, 45, 'grey', {x: -3, y: 0}, 1)
    skeleton2 = new Skeleton(100, 300, 50, 50, 'grey', {x: 0, y: -3}, 3)
    skeleton3 = new Skeleton(880, 520 , 50, 50, 'grey', {x: 0, y: 3}, 3)
    skeleton4 = new Skeleton(470, 30, 50, 50, 'grey', {x: -3, y: 0})
    monk = new Monk(165, 645, 50, 50, 'blue', {x: 2, y: 0})
    keyPlace = [key]
    pickPlace = [pickaxe]
    inventory = []
}

if (graveSite.isLevelTwo && graveSite.isLevelOne === false ){
    player = new Player(50, 610, 50, 50, 'brown');
    key = new Key(275, 260 , 50, 50)
    pickaxe = new Pickaxe(160, 40, 50, 50)
    cantTouchThis = new Item(745, 625, 40, 40)
    door = new Door(1070, 0, 60 , 80, 'green')
    lever = new Lever (1070, 650, 30 , 30, 'green')
    leverPulled = new LeverPulled (1070, 650, 30 , 30, 'green')
    currentTime = 0;
    currentFrame = 0;
    score = 150;
    ghoul = new Ghoul(400, 300, 50, 50, 'pink', {x1: 400, y1: 300, x2: 400, y2: 520, x3: 800, y3: 520, x4: 800, y4: 300})
    ghoul2 = new Ghoul(300, 50, 50, 50, 'pink', {x1: 300, y1: 50, x2: 300, y2: 150, x3: 600, y3: 150, x4: 600, y4: 50})
    skeleton = new Skeleton(1100, 302, 45, 45, 'grey', {x: -3, y: 0}, 1)
    skeleton2 = new Skeleton(100, 300, 50, 50, 'grey', {x: 0, y: -3}, 3)
    skeleton3 = new Skeleton(880, 520 , 50, 50, 'grey', {x: 0, y: 3}, 3)
    skeleton4 = new Skeleton(470, 30, 50, 50, 'grey', {x: -3, y: 0})
    monk = new Monk(165, 645, 50, 50, 'blue', {x: 2, y: 0})
    keyPlace = [key]
    pickPlace = [pickaxe]
    inventory = []


}

