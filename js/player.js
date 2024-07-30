class Player {
    constructor() {
        // set size of player
        this.width = 8;
        this.height = 12;

        // set position of player
        this.positionX = 50 - this.width / 2;
        this.positionY = 50 - this.height / 2;

        // set base amount of player kills
        this.killCount = 0

        this.createDomElement();
        this.startShooting();
    }

    // create and append element to DOM
    createDomElement() {
        // create the element
        this.domElement = document.createElement("div");

        // add content or modify
        this.domElement.id = "player";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.bottom = this.positionY + "vh";

        // append to the dom
        const stage = document.getElementById("stage");
        stage.appendChild(this.domElement);
    }

    // move player to the left within bounds of stage
    moveLeft() {
        if(this.positionX > 5) {
            this.positionX--;
            this.domElement.style.left = this.positionX + "vw";
        }
    }

    // move player to the right within bounds of stage
    moveRight() {
        if(this.positionX < 95 - this.width) {
            this.positionX++;
            this.domElement.style.left = this.positionX + "vw";
        }
    }

    // move player up within bounds of stage
    moveUp() {
        if (this.positionY < 92 - this.height) {
            this.positionY += 2;
            this.domElement.style.bottom = this.positionY + "vh";
        }
    }

    // move player down within bounds of stage
    moveDown() {
        if (this.positionY > 8) {
            this.positionY--;
            this.domElement.style.bottom = this.positionY + "vh";
        }
    }

    // shoot projectile at enemy
    startShooting() {
        setInterval(() => {
            if (enemies.length > 0) {
                new Projectile(this.positionX + this.width / 2, this.positionY + this.height);
            }
        }, 750);
    }
}


// reset event listener keydown/keyup
let keys = {
    left: false,
    right: false,
    up: false,
    down: false
}

// change key press to true if player presses movement key
document.addEventListener("keydown", (e) => {
    switch (e.code) {
        case "KeyA":
            keys.left = true
            break;
        case "KeyD":
            keys.right = true
            break;
        case "KeyW":
            keys.up = true
            break;
        case "KeyS":
            keys.down = true
            break;
        default:
            return;
    }
});

// change key press to false if player releases movement key
document.addEventListener("keyup", (e) => {
    switch (e.code) {
        case "KeyA":
            keys.left = false
            break;
        case "KeyD":
            keys.right = false
            break;
        case "KeyW":
            keys.up = false
            break;
        case "KeyS":
            keys.down = false
            break;
        default:
            return;
    }
});

// limit movement speed of player
setInterval(() => {
    if (keys.left) player.moveLeft();
    if (keys.right) player.moveRight();
    if (keys.up) player.moveUp();
    if (keys.down) player.moveDown();
}, 50);