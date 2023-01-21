
let player = new Player(50, 620, 50, 50, 'brown');
let key = new Key(1100, 650, 20, 40, 'img/key-blue.png')
let door = new Template(1100, 50, 40, 80, 'green')
let currentTime = 0;
let check1 = new Template (400, 300, 10, 10, 'black')
let check2 = new Template (400, 530, 10, 10, 'black')
let check3 = new Template (800, 530, 10, 10, 'black')
let check4 = new Template (800, 300, 10, 10, 'black')
let ghoul = new Ghoul(400, 300, 50, 50, 'pink')



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


        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawMap()
        walls.forEach(wall => {
            if (player.detectCollision(wall)) {
                let previousY = player.y - player.velocity.y;
                let previousX = player.x - player.velocity.x;
                player.velocity.x = 0;
                player.velocity.y = 0;
                player.x = previousX;
                player.y = previousY;

            };
        })

        player.draw();
        ghoul.draw();
        door.draw()


        graveSite.displayTime()

       getKey()

       console.log("update")

       requestAnimationFrame(graveSite.update)


    }
}


    // The game's objects
