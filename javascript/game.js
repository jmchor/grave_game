
let player = new Player(50, 650, 40, 40, 'brown');
let key = new Template(1100, 650, 20, 40, 'blue')
let door = new Template(1100, 50, 40, 80, 'green')



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
        door.draw()

        if (keyPlace.includes(key)) {
            key.draw()
        }

    },

    update: function() {
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
        door.draw()

       getKey()

       console.log("update")

       requestAnimationFrame(graveSite.update)


    }
}


    // The game's objects
