class Player extends Template {

    constructor(x,y,w,h,img) {
        super(x,y,w,h,img);
        this.velocity = {x: 0, y: 0}
        this.img = new Image();
        this.img.src = 'img/manUp.png'



    }

    update() {
        this.draw()
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }

    moveUp() {
        this.velocity.y = -5;
        this.img = new Image();
        this.img.src = 'img/manUp.png'
    }
    moveDown() {
        this.velocity.y = 5;
        this.img = new Image();
        this.img.src = 'img/manDown.png'


    }
    moveLeft() {
       this.velocity.x = -5;
       this.img = new Image();
        this.img.src = 'img/manLeft.png'

    }
    moveRight() {
        this.velocity.x = 5;
        this.img = new Image();
        this.img.src = 'img/manRight.png'

    }

    detectCollision(target) {
        if (this.y + this.velocity.y <= target.y + target.h  &&
            this.x + this.w + this.velocity.x >= target.x &&
            this.y + this.h + this.velocity.y >= target.y &&
            this.x + this.velocity.x <= target.x + target.w)
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

        if (player.doorCollision(door) && graveSite.hasDoorKey) {
            graveSite.isGameOver = true;
            graveSite.isGamePaused = true;
            ctx.clearRect(0,0,canvas.width, canvas.height)
            ctx.fillStyle = 'black'
            ctx.fillRect(0,0,canvas.width, canvas.height,)
            ctx.font = '50px Arial'
            ctx.fillStyle = 'white'
            ctx.fillText('You Win!', 500, 400)
            ctx.font = '20px Arial'
            ctx.fillText(`You escaped in ${graveSite.getMinutes()} minutes and ${graveSite.getSeconds()} seconds`, 420, 450)

        }
    }

    function encounterEnemy() {

        if (player.detectCollision(ghoul)) {
            console.log("You've been caught!")
            graveSite.isGameOver = true;
            graveSite.isGamePaused = true;
            ctx.clearRect(0,0,canvas.width, canvas.height)
            ctx.fillStyle = 'black'
            ctx.fillRect(0,0,canvas.width, canvas.height,)
            ctx.font = '50px Arial'
            ctx.fillStyle = 'white'
            ctx.fillText('Game Over', 500, 400)
            ctx.font = '20px Arial'
            ctx.fillText(`You were caught after ${graveSite.getMinutes()} minutes and ${graveSite.getSeconds()} seconds`, 420, 450)

        }
    }