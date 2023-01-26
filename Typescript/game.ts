"use strict";

let player: Player;
let key: Item;
let pickaxe: Item;
let cantTouchThis: Item;
let door: Door;
let lever: Item;
let leverPulled: Item;
let currentTime: number;
let currentFrame: number;
let score: number;
let timer: ReturnType<typeof setTimeout>;
let itemTimer: ReturnType<typeof setTimeout>;
let remainingTime: number;
let ghoul: Ghoul;
let ghoul2: Ghoul;
let skeleton: Skeleton;
let skeleton2: Skeleton;
let skeleton3: Skeleton;
let skeleton4:  Skeleton;
let monk: Monk;
let keyPlace: Item[];
let pickPlace: Item[];
let inventory: Item[];
let characterSteps:  Sound;
let backgroundNoise:  Sound;
let gameOverSound:  Sound;
let winSound:  Sound;



const game = {
    // The game's configuration
    hasGameStarted: false,
    isGameOver: false,
    isGamePaused: false,
    isLeftKeyPressed: false,
    isRightKeyPressed: false,
    isUpKeyPressed: false,
    isDownKeyPressed: false,
    wallsAreSolid: true,
    barriersAreSolid: true,
    isIntangible: false,
    hasItemSpawned: false,
    hasDoorKey: false,
    hasPlayerWon: false,
    hasPlayerLost: false,
    hasPickaxe: false,
    hasPulledLever: false,
    isTrapped: false,
    isLevelOne: true,
    isLevelTwo: false ,
    clearedLevelOne: false,
    score: 150,
    randomTime: Math.floor(Math.random() * 30000) + 5000,
    startGame: function () {

        characterSteps = new Sound("audio/stepshort.wav", 2, 0.1, false);
        backgroundNoise = new Sound("audio/eerie.mp3", 1, 0.1, true);
        gameOverSound = new Sound("audio/game_over.wav", 1, 0.5, false);

        timer = setInterval(() => {
            currentTime += 1;
            game.score -= 1;

            if (game.isIntangible) {
                remainingTime -= 1;
            }
            if (remainingTime === 0) {
                game.isIntangible = false;
                remainingTime = 5;
            }


        }, 1000);
        itemTimer = setTimeout(() => {
            game.hasItemSpawned = true;
        }, game.randomTime);





        game.hasGameStarted = true;
        drawMap();
        player.draw();
        door.draw();
        lever.draw();
        game.displayScore();
        game.displayTime();
        game.update();
        backgroundNoise.play();
        gameOverSound.stop()

    },
    restartGame: function () {
        gameOverSound.stop()
        currentTime = 0;
        game.score = 150;
        clearInterval(timer);
        clearTimeout(itemTimer);
        game.isGameOver = false;
        game.isGamePaused = false;
        game.hasGameStarted = false;
        game.hasDoorKey = false;
        game.hasPickaxe = false;
        game.hasPulledLever = false;
        game.isTrapped = false;
        game.wallsAreSolid = true,
        game.isIntangible = false,
        game.hasItemSpawned = false,
        game.barriersAreSolid = true,
        keyPlace = [key];
        pickPlace = [pickaxe];
        inventory = [];
        if (game.isLevelOne) {
            canvas.style.backgroundImage = "url('img/Ground_02.png')";
            canvas.style.backgroundSize = '200px';
            canvas.style.backgroundRepeat = 'repeat';
            player.x = 50;
            player.y = 610;
            key.y = 260;
            pickaxe.y = 40;
        }
        else if (game.isLevelTwo) {
            canvas.style.backgroundImage = "url('img/Tileable7.png')";
            canvas.style.backgroundSize = '300px';
            canvas.style.backgroundRepeat = 'repeat';
            map = mapTwo;
            player.x = 50;
            player.y = 150;
            key.y = 260;
            pickaxe.y = 40;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.startGame();
    },
    getSeconds: function () {
        return Math.floor(currentTime % 60);
    },
    getMinutes: function () {
        return Math.floor(currentTime / 60);
    },
    computeTwoDigitNumber: function (value: string | number) {
        if (value < 10) {
            return '0' + value;
        }
        else {
            return value.toString();
        }
    },
    displayTime: function () {
        let seconds = game.computeTwoDigitNumber(game.getSeconds());
        let minutes = game.computeTwoDigitNumber(game.getMinutes());
        ctx.fillStyle = 'black';
        ctx.font = '40px "Work Sans"';
        ctx.fillText(`${minutes}:${seconds}`, 1045, 770);
    },
    displayScore: function () {
        ctx.fillStyle = 'black';
        ctx.font = '40px "Work Sans"';
        ctx.fillText(`${game.score}`, 70, 770);
    },


    update: function () {

        encounterEnemy(ghoul);
        encounterEnemy(ghoul2);
        encounterEnemy(skeleton);
        encounterEnemy(skeleton2);
        encounterEnemy(skeleton3);
        encounterEnemy(skeleton4);
        encounterEnemy(monk);

        walls = [];
        floors = [];
        barriers = [];
        inventory = [];

        if (game.isGamePaused)
            return;
        if (game.isLeftKeyPressed) {
            player.moveLeft();
        }
        if (game.isRightKeyPressed) {
            player.moveRight();
        }
        if (game.isUpKeyPressed) {
            player.moveUp();
        }
        if (game.isDownKeyPressed) {
            player.moveDown();
        }

        player.update();
        ghoul.update();
        ghoul2.update();
        skeleton.update();
        skeleton2.update();
        skeleton3.update();
        skeleton4.update();
        monk.update();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawMap();
        game.displayScore();

        if (game.isIntangible) {
            ctx.fillStyle = 'black';
            ctx.font = '40px "Work Sans"';
            ctx.fillText(`Intangibility: 0${remainingTime}`, 650, 770);
        }

        walls.forEach(wall => {
            let previousY;
            let previousX;
            skeleton.runsAgainstWalls(wall);
            skeleton2.runsAgainstWalls(wall);
            skeleton3.runsAgainstWalls(wall);
            skeleton4.runsAgainstWalls(wall);
            monk.runsAgainstWalls(wall);
            if (player.detectCollision(wall) && game.wallsAreSolid) {
                previousY = player.y - player.velocity.y;
                previousX = player.x - player.velocity.x;
                player.velocity.x = 0;
                player.velocity.y = 0;
                player.x = previousX;
                player.y = previousY;
            }
        });

        floors.forEach(floor => {
            let previousY;
            let previousX;
            if (player.detectCollision(floor)) {
                previousY = player.y - player.velocity.y / 1.5;
                previousX = player.x - player.velocity.x / 1.5;
                player.velocity.x = 0;
                player.velocity.y = 0;
                player.x = previousX;
                player.y = previousY;
            }
        });

        barriers.forEach(barrier => {
            let previousY;
            let previousX;
            if (player.detectCollision(barrier) && game.barriersAreSolid) {

                previousY = player.y - player.velocity.y;
                previousX = player.x - player.velocity.x;
                player.velocity.x = 0;
                player.velocity.y = 0;
                player.x = previousX;
                player.y = previousY;
            }
        });

        door.draw();
        if (!game.hasPulledLever) {
            lever.draw();
        }
        else if (game.hasPulledLever) {
            leverPulled.draw();
        }
        player.draw();
        ghoul.draw();
        ghoul2.draw();
        skeleton.draw();
        skeleton2.draw();
        skeleton3.draw();
        skeleton4.draw();
        monk.draw();

        if (game.hasItemSpawned) {
            cantTouchThis.draw();
        }

        game.displayTime();
        getKey();
        getPickaxe();
        getPowerUp(cantTouchThis);
        requestAnimationFrame(game.update);
    }
};
if (game.isLevelOne && game.isLevelTwo === false) {
    player = new Player(50, 610, 50, 50, 'brown');
    door = new Door(1070, 0, 60, 80);
    key = new Item(275, 260, 50, 50, 'img/key.png');
    pickaxe = new Item(160, 40, 50, 50, 'img/pickaxe2.png');
    cantTouchThis = new Item(745, 625, 40, 40, 'img/item.png');
    remainingTime = 5
    lever = new Item(1070, 650, 30, 30, 'img/Tile_21.png');
    leverPulled = new Item(1070, 650, 30, 30, 'img/Tile_21_activated.png');
    currentTime = 0;
    currentFrame = 0;
    score = 150;
    ghoul = new Ghoul(400, 300, 50, 50, { x1: 400, y1: 300, x2: 400, y2: 520, x3: 800, y3: 520, x4: 800, y4: 300 });
    ghoul2 = new Ghoul(300, 50, 50, 50, { x1: 300, y1: 50, x2: 300, y2: 150, x3: 600, y3: 150, x4: 600, y4: 50 });
    skeleton = new Skeleton(1100, 302, 45, 45, { x: -3, y: 0 });
    skeleton2 = new Skeleton(100, 300, 50, 50, { x: 0, y: -3 });
    skeleton3 = new Skeleton(880, 520, 50, 50, { x: 0, y: 3 });
    skeleton4 = new Skeleton(470, 30, 50, 50, { x: -3, y: 0 });
    monk = new Monk(165, 645, 50, 50, { x: 2, y: 0 });
    keyPlace = [key];
    pickPlace = [pickaxe];
    inventory = [];
}
if (game.isLevelTwo && game.isLevelOne === false) {
    canvas.style.backgroundImage = "url('img/Tileable7.png')";
    canvas.style.backgroundSize = '300px';
    canvas.style.backgroundRepeat = 'repeat';
    player = new Player(50, 610, 50, 50, 'brown');
    door = new Door(1070, 0, 60, 80);
    key = new Item(275, 260, 50, 50, 'img/key.png');
    pickaxe = new Item(160, 40, 50, 50, 'img/pickaxe2.png');
    cantTouchThis = new Item(745, 625, 40, 40, 'img/item.png');
    lever = new Item(1070, 650, 30, 30, 'img/Tile_21.png');
    leverPulled = new Item(1070, 650, 30, 30, 'img/Tile_21_activated.png');
    currentTime = 0;
    currentFrame = 0;
    score = 150;
    ghoul = new Ghoul(400, 300, 50, 50, { x1: 400, y1: 300, x2: 400, y2: 520, x3: 800, y3: 520, x4: 800, y4: 300 });
    ghoul2 = new Ghoul(300, 50, 50, 50, { x1: 300, y1: 50, x2: 300, y2: 150, x3: 600, y3: 150, x4: 600, y4: 50 });
    skeleton = new Skeleton(1100, 302, 45, 45, { x: -3, y: 0 });
    skeleton2 = new Skeleton(0,0, 50, 50, { x: -3, y: 0 });
    skeleton3 = new Skeleton(880, 520, 50, 50, { x: 0, y: 3 });
    skeleton4 = new Skeleton(470, 30, 50, 50, { x: -3, y: 0 });
    monk = new Monk(165, 645, 50, 50, { x: 2, y: 0 });
    keyPlace = [key];
    pickPlace = [pickaxe];
    inventory = [];
}
