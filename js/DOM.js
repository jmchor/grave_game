"use strict";
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const splashScreen = document.getElementById('splash-screen');
const pauseScreen = document.getElementById('pause-screen');
const keyScreen = document.getElementById('key-screen');
const winScreen = document.getElementById('win-screen');
const winScore = document.getElementById('win-score');
const loseScore = document.getElementById('lose-score');
;
const loseScreen = document.getElementById('lose-screen');
const trapScreen = document.getElementById('trap-screen');
const nextLevel = document.getElementById('next-level-screen');
document.addEventListener('keydown', function (e) {
    switch (e.key) {
        case 'ArrowLeft':
            game.isLeftKeyPressed = true;
            player.moveLeft();
            break;
        case 'ArrowRight':
            game.isRightKeyPressed = true;
            player.moveRight();
            break;
        case 'ArrowUp':
            game.isUpKeyPressed = true;
            player.moveUp();
            break;
        case 'ArrowDown':
            game.isDownKeyPressed = true;
            player.moveDown();
            break;
        default:
            return;
    }
});
document.addEventListener('keyup', function (e) {
    switch (e.key) {
        case 'ArrowLeft':
            game.isLeftKeyPressed = false;
            characterSteps.stop();
            player.velocity.x = 0;
            player.velocity.y = 0;
            break;
        case 'ArrowRight':
            game.isRightKeyPressed = false;
            characterSteps.stop();
            player.velocity.x = 0;
            player.velocity.y = 0;
            break;
        case 'ArrowUp':
            game.isUpKeyPressed = false;
            characterSteps.stop();
            player.velocity.x = 0;
            player.velocity.y = 0;
            break;
        case 'ArrowDown':
            game.isDownKeyPressed = false;
            characterSteps.stop();
            player.velocity.x = 0;
            player.velocity.y = 0;
            break;
        default:
            return;
    }
    ;
});
window.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        if (game.hasDoorKey && game.isGamePaused === false && game.isTrapped === false) {
            solveLevel();
        }
        else if (!game.hasDoorKey && player.detectCollision(door)) {
            keyScreen.style.display = 'flex';
        }
        else if (game.isGameOver && game.hasPlayerWon) {
            winScreen.style.display = 'none';
            game.restartGame();
        }
        else if (game.isGameOver && game.hasPlayerLost) {
            loseScreen.style.display = 'none';
            game.restartGame();
        }
        else if (game.isTrapped) {
            trapScreen.style.display = 'none';
            game.restartGame();
        }
        else if (game.isTrapped) {
            trapScreen.style.display = 'none';
            game.restartGame();
        }
        else if (game.hasGameStarted === false && game.isGameOver === false && game.isGamePaused === false && game.isTrapped === false) {
            return;
        }
    }
});
window.addEventListener('keydown', function (e) {
    if (e.key === ' ' && game.hasGameStarted === false) {
        game.hasGameStarted = true;
        game.startGame();
        game.isGamePaused = false;
        splashScreen.style.display = 'none';
    }
    // else if { e.key === 'n' &&
    // }
    else if (e.key === 'e' && game.hasPulledLever === false) {
        game.hasPulledLever = true;
    }
    else if (e.key === 'Escape' && game.isGamePaused === false && game.hasGameStarted === true && game.isGameOver === false) {
        game.isGamePaused = true;
        pauseScreen.style.display = 'flex';
        //@ts-ignore
        backgroundNoise.stop();
    }
    else if (e.key === 'Escape' && game.isGamePaused === true && game.hasGameStarted === true && game.isGameOver === false) {
        game.isGamePaused = false;
        pauseScreen.style.display = 'none';
        keyScreen.style.display = 'none';
        //@ts-ignore
        backgroundNoise.play();
        game.update();
    }
    else if (e.key === 'Escape' && game.isGameOver === true || game.hasGameStarted === false) {
        return;
    }
});
