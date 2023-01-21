
let player = new Player(50, 610, 50, 50, 'brown');
let key = new Key(1100, 650, 20, 40, 'img/key-blue.png')
let door = new Template(1100, 50, 40, 80, 'green')
let currentTime = 0;

let ghoul = new Ghoul(400, 300, 50, 50, 'pink')
let skeleton = new Skeleton(1100, 300, 50, 50, 'grey', {x: -5, y: 0})
let skeleton2 = new Skeleton(100, 300, 50, 50, 'grey', {x: 0, y: -5})
let skeleton3 = new Skeleton(880, 520, 50, 50, 'grey', {x: 0, y: 5})



walls.forEach(wall => {
    wall.draw();

})

let keyPlace = [key]
let inventory = []

const graveSite = {

    // The game's configuration
    isGameOver: false,
    isGamePaused: false,
    isLeftKeyPressed: false,
    isRightKeyPressed: false,
    isUpKeyPressed: false,
    isDownKeyPressed: false,
    hasDoorKey: false,

    startGame: function() {
        graveSite.isGameOver = false;
        graveSite.isGamePaused = false;

        drawMap()
        player.draw();
        ghoul.draw();
        door.draw()

        graveSite.displayTime()

        if (keyPlace.includes(key)) {
            key.draw()
        }

    },

    getSeconds: function() {
       return Math.floor(currentTime % 60);
    },

    getMinutes: function() {
        return Math.floor(currentTime / 60);
    },

    displayTime: function() {
        let seconds = graveSite.getSeconds();
        let minutes = graveSite.getMinutes();
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 750, 150, 50);
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText(`Time: ${minutes}:${seconds}`, 10,780);
    },


    update: function() {

        encounterEnemy()
        walls = []

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

            };

        })

        player.draw();
        ghoul.draw();
        skeleton.draw()
        skeleton2.draw()
        skeleton3.draw()
        door.draw()


        graveSite.displayTime()

       getKey()

       console.log("update")

       requestAnimationFrame(graveSite.update)


    }
}


    // The game's objects
