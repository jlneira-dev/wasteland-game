let mouseX = 0;
let mouseY = 0;

// track mouse position constantly
document.addEventListener("mousemove", e => {
    mouseX = e.clientX / window.innerWidth * 100;
    mouseY = (window.innerHeight - e.clientY) / window.innerHeight * 100;
});

class Player {
    constructor() {
        // set size of player
        this.width = 5;
        this.height = 5;

        // set position of player
        this.positionX = 50 - this.width / 2;
        this.positionY = 50 - this.height / 2;

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
        if(this.positionX > 0) {
            this.positionX--;
            this.domElement.style.left = this.positionX + "vw";
        }
    }

    // move player to the right within bounds of stage
    moveRight() {
        if(this.positionX < 100 - this.width) {
            this.positionX++;
            this.domElement.style.left = this.positionX + "vw";
        }
    }

    // move player up within bounds of stage
    moveUp() {
        if (this.positionY < 100 - this.height) {
            this.positionY++;
            this.domElement.style.bottom = this.positionY + "vh";
        }
    }

    // move player down within bounds of stage
    moveDown() {
        if (this.positionY > 0) {
            this.positionY--;
            this.domElement.style.bottom = this.positionY + "vh";
        }
    }

    // shoot projectile at enemy
    startShooting() {
        setInterval(() => {
            new Projectile(this.positionX + this.width / 2, this.positionY + this.height);
        }, 1000);
    }
}

class Enemy {
    constructor() {
        // set size of projectile
        this.width = 5;
        this.height = 5;

        // set start position of projectile
        this.positionX = 0;
        this.positionY = 0;

        this.createDomElement();
        this.moveToPlayer();
    }

    // create and append element to DOM
    createDomElement() {
        // create the element
        this.domElement = document.createElement("div");

        // add content or modify
        this.domElement.id = "enemy";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.bottom = this.positionY + "vh";

        // append to the dom
        const stage = document.getElementById("stage");
        stage.appendChild(this.domElement);
    }

    // move enemy to player
    moveToPlayer() {
        setInterval (() => {

            // move enemy right if player is further right
            if (player.positionX > this.positionX) {
                this.positionX++;
                this.domElement.style.left = this.positionX + "vw";
            }

            // move enemy left if player is further left
            if (player.positionX < this.positionX) {
                this.positionX--
                this.domElement.style.left = this.positionX + "vw";
            }

            // move enemy up if player is further up
            if (player.positionY > this.positionY) {
                this.positionY++;
                this.domElement.style.bottom = this.positionY + "vh";
            }

            // move enemy down if player is further down
            if (player.positionY < this.positionY) {
                this.positionY--;
                this.domElement.style.bottom = this.positionY + "vh";
            }
        }, 200);
    }
}

class Projectile {
    constructor() {
        // set size of enemy
        this.width = 2;
        this.height = 2;

        // set position of enemy
        this.positionX = player.positionX + player.width/2;
        this.positionY = player.positionY + player.height/2;

        // calculate direction vector towards mouse position
        const directionX = mouseX - this.positionX;
        const directionY = mouseY - this.positionY;
        const magnitude = Math.sqrt(directionX * directionX + directionY * directionY);
        this.velocityX = (directionX / magnitude) * 0.5;
        this.velocityY = (directionY / magnitude) * 0.5; 

        this.createDomElement();
        this.moveToMouse();
    }

    // create and append element to DOM
    createDomElement() {
        // create the element
        this.domElement = document.createElement("div");

        // add content or modify
        this.domElement.id = "projectile";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.bottom = this.positionY + "vh";

        // append to the dom
        const stage = document.getElementById("stage");
        stage.appendChild(this.domElement);
    }

    // move projectile to mouse position
    moveToMouse() {

        // if mouse position differs from projectile position, move accordingly
        setInterval(() => {
            this.positionX += this.velocityX;
            this.positionY += this.velocityY;
            this.domElement.style.left = this.positionX + "vw";
            this.domElement.style.bottom = this.positionY + "vh";
        }, 50);
    }
}

const player = new Player();
const enemy = new Enemy();

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
}, 100);
