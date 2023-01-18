

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
        player = new Player(50, 700, 50, 50, 'brown');
        player.draw();
    },

    update: function() {

        if (graveSite.isLeftKeyPressed) {
            graveSite.player.moveLeft();
        }
        if (graveSite.isRightKeyPressed) {
            graveSite.player.moveRight();
        }
        if (graveSite.isUpKeyPressed) {
            graveSite.player.moveUp();
        }
        if (graveSite.isDownKeyPressed) {
            graveSite.player.moveDown();
        }
    },

    keyControls: function() {
        document.addEventListener('keydown', function(e) {

            switch (e.key) {
                case 'ArrowLeft':
                    player.moveLeft()
                    graveSite.isLeftKeyPressed = true;
                    break;


} })}}

    // The game's objects
