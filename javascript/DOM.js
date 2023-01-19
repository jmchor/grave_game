const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

document.addEventListener('keydown', function(e) {

        switch (e.key) {
            case 'ArrowLeft':

                console.log("left")
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

            case 'Enter':
                if (graveSite.hasDoorKey) {
                    openDoor() }

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




