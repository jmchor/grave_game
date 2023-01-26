"use strict";
function getKey() {
    if (player.detectCollision(key)) {
        game.hasDoorKey = true;
    }
    if (keyPlace.includes(key)) {
        key.draw();
    }
    if (game.hasDoorKey) {
        key.y = -1000;
        keyPlace.pop();
        inventory.push(key);
    }
    if (inventory.includes(key)) {
        let inventoryKey = new Item(240, 730, 50, 50, 'img/key.png');
        inventoryKey.draw();
    }
    if (game.hasDoorKey && !game.hasPickaxe && game.isLevelOne) {
        setTimeout(() => {
            game.isGameOver = true;
            game.isGamePaused = true;
            game.isTrapped = true;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            trapScreen.style.display = 'flex';
            backgroundNoise.stop();
        }, 1000 + 500);
    }
}
function getPickaxe() {
    if (player.detectCollision(pickaxe)) {
        game.hasPickaxe = true;
        game.barriersAreSolid = false;
    }
    if (pickPlace.includes(pickaxe)) {
        pickaxe.draw();
    }
    if (game.hasPickaxe) {
        pickaxe.y = -1000;
        pickPlace.pop();
        inventory.push(pickaxe);
    }
    if (inventory.includes(pickaxe)) {
        let inventoryPickaxe = new Item(320, 730, 50, 50, 'img/pickaxe2.png');
        inventoryPickaxe.draw();
    }
}
function solveLevel() {
    //open door to next level
    let levelOneScore = game.score;
    winSound = new Sound('audio/win.wav', 1, 0.5, false);
    winSound.play();
    if (player.doorCollision(door) && game.hasDoorKey && game.isLevelOne && game.isLevelTwo === false) {
        game.isGamePaused = true;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        nextLevel.style.display = 'flex';
        nextLevel.innerHTML = `You escaped after ${game.getMinutes()} minutes and ${game.getSeconds()} seconds <br> <br> Your score was ${game.score} <br> <br> The Next Level will start soon! `;
        backgroundNoise.stop();
        setTimeout(() => {
            game.isLevelOne = false;
            game.isLevelTwo = true;
            clearInterval(timer);
            clearTimeout(itemTimer);
            game.score = 150;
            nextLevel.style.display = 'none';
            game.restartGame();
        }, 3000);
    }
    // win the game!
    else if (player.doorCollision(door) && game.hasDoorKey && game.isLevelTwo && game.isLevelOne === false) {
        game.isGameOver = true;
        game.isGamePaused = true;
        game.hasPlayerWon = true;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        winScreen.style.display = 'flex';
        winScore.innerHTML = `You escaped after ${game.getMinutes()} minutes and ${game.getSeconds()} seconds <br> <br> Your score was ${game.score + levelOneScore}`;
        backgroundNoise.stop();
        game.isLevelTwo = false;
        game.isLevelOne = true;
    }
}
function useLever() {
    if (player.detectCollision(lever)) {
        game.hasPulledLever = true;
    }
}
function encounterEnemy(enemy) {
    if (player.detectCollision(enemy) && game.isIntangible === false) {
        gameOverSound.play();
        game.isGameOver = true;
        game.isGamePaused = true;
        game.hasPlayerLost = true;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        loseScreen.style.display = 'flex';
        loseScore.innerHTML = `The ghouls got to you after ${game.getMinutes()} minutes and ${game.getSeconds()} seconds <br> <br> Your score was ${game.score}`;
        backgroundNoise.stop();
    }
}
function intangibility() {
    game.isIntangible = true;
    setTimeout(() => {
        game.isIntangible = false;
    }, 5000);
}
function getPowerUp(item) {
    if (player.detectCollision(item) && item === cantTouchThis) {
        item.y = -1000;
        game.score += 50;
        intangibility();
    }
}
function drawMap() {
    let map = [];
    if (game.isLevelOne) {
        map = mapOne;
    }
    else if (game.isLevelTwo) {
        map = mapTwo;
    }
    map.forEach((row, index) => {
        row.forEach((cell, count) => {
            switch (cell) {
                case '-':
                    walls.push(new Wall(25 * count, 25 * index, 25, 25));
                    break;
                case 'S':
                    walls.push(new Stairs(25 * count, 25 * index, 25, 25));
                    break;
                case 'E':
                    floors.push(new Dirt(25 * count, 25 * index, 25, 25));
                    break;
                case 'T':
                    if (game.hasDoorKey) {
                        walls.push(new Wall(25 * count, 25 * index, 25, 25));
                    }
                    break;
                case 'P':
                    if (game.hasPickaxe) {
                        barriers.push(new Barrier(25 * count, 25 * index, 25, 25));
                    }
                    else {
                        walls.push(new Wall(25 * count, 25 * index, 25, 25));
                    }
                    break;
                case 'D':
                    if (!game.hasPulledLever) {
                        walls.push(new PenetrableWall(25 * count, 25 * index, 25, 25));
                    }
                    break;
                default:
                    break;
            }
        });
    });
    walls.forEach(wall => {
        wall.draw();
    });
    floors.forEach(floor => {
        floor.draw();
    });
    barriers.forEach(barrier => {
        barrier.draw();
    });
    ctx.fillStyle = '#938d7d';
    ctx.fillRect(0, 715, 1200, 85);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.strokeRect(6, 718, 202, 77);
    ctx.strokeRect(214, 718, 773, 77);
    ctx.strokeRect(993, 718, 200, 77);
    ctx.strokeStyle = "#624030";
    ctx.lineWidth = 5;
    ctx.strokeRect(3, 715, 208, 83);
    ctx.strokeRect(211, 715, 985, 83);
    ctx.strokeRect(990, 715, 208, 83);
}
