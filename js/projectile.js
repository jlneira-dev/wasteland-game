let counter = 0;

let mouseX = 0;
let mouseY = 0;

// track mouse position constantly
document.addEventListener("mousemove", e => {
    mouseX = e.clientX / window.innerWidth * 100;
    mouseY = (window.innerHeight - e.clientY) / window.innerHeight * 100;
});

class Projectile {
    constructor() {
        // set size of projectile
        this.width = 3;
        this.height = 3;

        // set position of projectile
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
        const movementInterval = setInterval(() => {
            if (this.checkCollision() || this.leavesGameArea()) {
                clearInterval(movementInterval);
                this.domElement.remove();
                return;
            }

            this.positionX += this.velocityX;
            this.positionY += this.velocityY;
            this.domElement.style.left = this.positionX + "vw";
            this.domElement.style.bottom = this.positionY + "vh";
        }, 25);
    }

    checkCollision() {
        if (enemy.isHit(this)) {
            counter++;
            if (counter >= 3) {
                enemy.removeEnemy();
            }
            return true;
        }
        return false;
    }

    leavesGameArea() {
        return (
            this.positionX < 8 ||
            this.positionX > 90 ||
            this.positionY < 10 ||
            this.positionY > 90
        );
    }
}