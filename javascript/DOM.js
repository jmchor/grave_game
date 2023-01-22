const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const splashScreen = document.getElementById('splash-screen')
const pauseScreen = document.getElementById('pause-screen')
const keyScreen = document.getElementById('key-screen')
const winScreen = document.getElementById('win-screen')
const winScore = document.getElementById('win-score')
const loseScore = document.getElementById('lose-score')
const loseScreen = document.getElementById('lose-screen')




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

        else if (!graveSite.hasDoorKey && graveSite.hasPlayerWon === false && graveSite.hasPlayerLost === false && graveSite.hasGameStarted && player.detectCollision(door)) {
            keyScreen.style.display = 'flex'
        }
        else if (graveSite.isGameOver && graveSite.hasPlayerWon) {
            winScreen.style.display = 'none'
            graveSite.restartGame()
        }
        else if (graveSite.isGameOver && graveSite.hasPlayerLost) {
            loseScreen.style.display = 'none'
            graveSite.restartGame()
        } else if (graveSite.hasGameStarted === false && graveSite.isGameOver === false && graveSite.isGamePaused === false) {
            return
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

    if (e.key === 'e' && graveSite.hasPulledLever === false) {
        graveSite.hasPulledLever = true;
    }

    if (e.key === 'Escape' && graveSite.isGamePaused === false && graveSite.hasGameStarted === true && graveSite.isGameOver === false) {
        graveSite.isGamePaused = true;
        pauseScreen.style.display = 'flex';
    } else if (e.key === 'Escape' && graveSite.isGamePaused === true && graveSite.hasGameStarted === true && graveSite.isGameOver === false) {
        graveSite.isGamePaused = false;
        pauseScreen.style.display = 'none';
        keyScreen.style.display = 'none';
        graveSite.update()
    } else if (e.key === 'Escape' && graveSite.isGameOver === true || graveSite.hasGameStarted === false) {
        return  }



})



