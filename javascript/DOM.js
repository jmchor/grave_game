const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

document.addEventListener('keydown', function(e) {

        switch (e.key) {
            case 'ArrowLeft':
                player.moveLeft()
                console.log("left")
                graveSite.isLeftKeyPressed = true;
                break;
            case 'ArrowRight':
                player.moveRight()
                graveSite.isRightKeyPressed = true;
                break;
            case 'ArrowUp':
                player.moveUp()
                graveSite.isUpKeyPressed = true;
                break;
            case 'ArrowDown':
                player.moveDown()
                graveSite.isDownKeyPressed = true;
                break;

                default:
                    return;
        }})

    document.addEventListener('keyup', function(e) {

        switch (e.key) {
            case 'ArrowLeft':
                graveSite.isLeftKeyPressed = false;
                break;
            case 'ArrowRight':
                graveSite.isRightKeyPressed = false;
                break;
            case 'ArrowUp':
                graveSite.isUpKeyPressed = false;
                break;
            case 'ArrowDown':
                graveSite.isDownKeyPressed = false;
                break;

                default:
                    return;
        };
    });




