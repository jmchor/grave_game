class Player extends Template {

    constructor(x,y,w,h, source, img) {
        super(x,y,w,h,img);
        this.velocity = {x: 0, y: 0}
        this.img = new Image();
        this.img.src = 'img/main_sprite.png'
        this.source = {x: 0, y: 96, w: 96, h: 32}
        this.currentFrame = 0




    }

    draw() {
        ctx.drawImage(this.img, this.source.x * this.currentFrame / this.source.w , this.source.y, this.source.w, this.source.h, this.x, this.y, this.w, this.h)

    }

    update() {
        this.draw()
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }

    moveUp() {
        this.velocity.y = -5;
        this.source = {x: 0, y: 96, w: 96, h: 32}
    }
    moveDown() {
        this.velocity.y = 5;
        this.source = {x: 0, y: 0, w: 96, h: 32}


    }
    moveLeft() {
       this.velocity.x = -5;
       this.source = {x: 0, y: 32, w: 96, h: 32}

    }
    moveRight() {
        this.velocity.x = 5;
        this.source = {x: 0, y: 64, w: 96, h: 32}

    }

    detectCollision(target) {
        if (this.y + this.velocity.y  + 15 <= target.y + target.h  &&
            this.x + this.w + this.velocity.x -15 >= target.x &&
            this.y + this.h + this.velocity.y  - 15>= target.y &&
            this.x + this.velocity.x + 15  <= target.x + target.w)
            {
                return true
            };
        };

    doorCollision(target) {
        if (this.y  <= target.y + target.h  &&
            this.x + this.w >= target.x &&
            this.y + this.h >= target.y &&
            this.x  <= target.x + target.w)
            {
                return true
            };
        };

    }


    function getKey (){
        if (player.detectCollision(key)) {
            graveSite.hasDoorKey = true;
        }
        if (keyPlace.includes(key)) {
            key.draw()
        }
        if(graveSite.hasDoorKey) {
            key.y = -1000
            keyPlace.pop()
            inventory.push(key)
        }
        if (inventory.includes(key)) {
            let inventoryKey = new Key (1100, 750, 20, 40, 'blue')
            inventoryKey.draw()

        }

    }

    function openDoor() {

        if (player.doorCollision(door) && graveSite.hasDoorKey === false) {
         }

       else if (player.doorCollision(door) && graveSite.hasDoorKey) {
            graveSite.isGameOver = true;
            graveSite.isGamePaused = true;
            graveSite.hasPlayerWon = true;
            ctx.clearRect(0,0,canvas.width, canvas.height)
            ctx.fillStyle = 'black'
            ctx.fillRect(0,0,canvas.width, canvas.height,)
            winScreen.style.display = 'flex'
            winScore.innerHTML = `You escaped after ${graveSite.getMinutes()} minutes and ${graveSite.getSeconds()} seconds`



        }
    }

    function encounterEnemy(enemy) {

        if (player.detectCollision(enemy)) {
            console.log("You've been caught!")
            graveSite.isGameOver = true;
            graveSite.isGamePaused = true;
            graveSite.hasPlayerLost = true;
            ctx.clearRect(0,0,canvas.width, canvas.height)
            ctx.fillStyle = 'black'
            ctx.fillRect(0,0,canvas.width, canvas.height,)
            loseScreen.style.display = 'flex'
            loseScore.innerHTML = `The ghouls got to you after ${graveSite.getMinutes()} minutes and ${graveSite.getSeconds()} seconds`



        }
    }