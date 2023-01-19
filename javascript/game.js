
let player = new Player(50, 700, 50, 50, 'brown');

const graveSite = {

    // The game's configuration
    isGameOver: false,
    isGamePaused: false,
    isLeftKeyPressed: false,
    isRightKeyPressed: false,
    isUpKeyPressed: false,
    isDownKeyPressed: false,

    startGame: function() {
        graveSite.isGameOver = false;
        graveSite.isGamePaused = false;

        player.draw();
    },

    update: function() {

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
        player.draw();

        walls.forEach(wall => {
            if (player.detectCollision(wall)) {
                let previousY = player.y - player.velocity.y;
                let previousX = player.x - player.velocity.x;
                player.velocity.x = 0;
                player.velocity.y = 0;
                player.x = previousX
                player.y = previousY;

                this.isLeftKeyPressed = false;
                this.isRightKeyPressed = false;
                this.isUpKeyPressed = false;
                this.isDownKeyPressed = false;

            };

    })

    },



}


    // The game's objects
