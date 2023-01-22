
let player = new Player(50, 610, 50, 50, 'brown');
let key = new Key(275, 260 , 50, 50)
let pickaxe = new Pickaxe(160, 40, 50, 50)
let door = new Door(1070, 0, 60 , 80, 'green')
let door2 = new Lever (1070, 650, 30 , 30, 'green')
let currentTime = 0;
let currentFrame = 0;
let timer;
let ghoul = new Ghoul(400, 300, 50, 50, 'pink', {x1: 400, y1: 300, x2: 400, y2: 520, x3: 800, y3: 520, x4: 800, y4: 300})
let ghoul2 = new Ghoul(300, 50, 50, 50, 'pink', {x1: 300, y1: 50, x2: 300, y2: 150, x3: 600, y3: 150, x4: 600, y4: 50})
let skeleton = new Skeleton(1100, 302, 45, 45, 'grey', {x: -5, y: 0})
let skeleton2 = new Skeleton(100, 300, 50, 50, 'grey', {x: 0, y: -5})
let skeleton3 = new Skeleton(880, 520 , 50, 50, 'grey', {x: 0, y: 5})




walls.forEach(wall => {
    wall.draw();

})

let keyPlace = [key]
let pickPlace = [pickaxe]
let inventory = []

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
        player.x = 50;
        player.y = 610;
        graveSite.isGameOver = false;
        graveSite.isGamePaused = false;
        graveSite.hasGameStarted = false;
        graveSite.hasDoorKey = false;
        graveSite.hasPickaxe = false;
        graveSite.hasPulledLever = false;

        keyPlace = [key]
        pickPlace = [pickaxe]
        inventory = []
        key.y = 260
        pickaxe.y = 40
        ctx.clearRect(0,0,canvas.width, canvas.height)
        graveSite.startGame(); },

    getSeconds: function() {
       return Math.floor(currentTime % 60);
    },

    getMinutes: function() {
        return Math.floor(currentTime / 60);
    },

    displayTime: function() {
        let seconds = graveSite.getSeconds();
        let minutes = graveSite.getMinutes();
        ctx.fillStyle = '#8b7c59';
        ctx.fillRect(1050, 725, 150,75);
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.fillText(`Time: 0${minutes}:${seconds}`, 1065, 770);
    },



    update: function() {

        // encounterEnemy(ghoul)
        // encounterEnemy(ghoul2)
        // encounterEnemy(skeleton)
        // encounterEnemy(skeleton2)
        // encounterEnemy(skeleton3)

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


    // The game's objects
