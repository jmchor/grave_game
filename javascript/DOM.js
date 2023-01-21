const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const splashScreen = document.getElementById('splash-screen')
const pauseScreen = document.getElementById('pause-screen')
const keyScreen = document.getElementById('key-screen')
const restartButton = document.getElementById('game-over')




document.addEventListener('keydown', function(e) {

        switch (e.key) {
            case 'ArrowLeft':

                graveSite.isLeftKeyPressed = true;
                player.moveLeft()
                break;
            case 'ArrowRight':
                graveSite.isRightKeyPressed = true;
                player.moveRight()
                break;
            case 'ArrowUp':
                graveSite.isUpKeyPressed = true;
                player.moveUp()
                break;
            case 'ArrowDown':
                graveSite.isDownKeyPressed = true;
                player.moveDown()
                break;

                default:
                    return;
        }})

    document.addEventListener('keyup', function(e) {

        switch (e.key) {
            case 'ArrowLeft':
                graveSite.isLeftKeyPressed = false;
                player.velocity.x = 0;
                player.velocity.y = 0;

                break;
            case 'ArrowRight':
                graveSite.isRightKeyPressed = false;
                player.velocity.x = 0;
                player.velocity.y = 0;
                break;
            case 'ArrowUp':
                graveSite.isUpKeyPressed = false;
                player.velocity.x = 0;
                player.velocity.y = 0;
                break;
            case 'ArrowDown':
                graveSite.isDownKeyPressed = false;
                player.velocity.x = 0;
                player.velocity.y = 0;
                break;

                default:
                    return;
        };

    });

window.addEventListener('keydown', function(e) {

    if (e.key === 'Enter') {

        if (graveSite.hasDoorKey && graveSite.isGamePaused === false) {
            openDoor()
        }
        else if (!graveSite.hasDoorKey && graveSite.hasPlayerWon === false && graveSite.hasPlayerLost === false) {
            keyScreen.style.display = 'flex'
        }
        else if (graveSite.isGameOver && graveSite.hasPlayerWon) {
            graveSite.restartGame()
        }
        else if (graveSite.isGameOver && graveSite.hasPlayerLost) {
            graveSite.restartGame()
        }








    }

})





window.addEventListener('keydown', function(e) {

    if (e.key === ' ' && graveSite.hasGameStarted === false) {
        graveSite.hasGameStarted = true;
        graveSite.startGame()
        graveSite.isGamePaused = false;
        splashScreen.style.display = 'none';


    }
})

window.addEventListener('keydown', function(e) {

        if (e.key === 'Escape' && graveSite.isGamePaused === false) {
            graveSite.isGamePaused = true;
            pauseScreen.style.display = 'flex';
        } else if (e.key === 'Escape' && graveSite.isGamePaused === true) {
            graveSite.isGamePaused = false;
            pauseScreen.style.display = 'none';
            keyScreen.style.display = 'none';
            graveSite.update()
        }
    })

