let counter = 0;

let mouseX = 0;
let mouseY = 0;

// track mouse position constantly
document.addEventListener("mousemove", e => {
    mouseX = e.clientX / window.innerWidth * 100;
    mouseY = (window.innerHeight - e.clientY) / window.innerHeight * 100;
});

class Projectile {
    constructor(target, imgURL) {
        // set size and position of projectile
        this.width = 0;
        this.height = 0;
        this.positionX = 0;
        this.positionY = 0;
        this.target = target;
        this.imgURL = imgURL;
    }

    // create and append element to DOM
    createDomElement() {
        this.domElement = document.createElement("div");
        this.domElement.id = "projectile";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.bottom = this.positionY + "vh";
        const stage = document.getElementById("stage");
        stage.appendChild(this.domElement);
    }

    // check if there is collision with enemy
    checkCollision() {
        if (this.target.length > 0) {
            for (let i = this.target.length - 1; i >= 0; i--) {
                if (this.target[i].isHit(this)) {
                    this.domElement.remove();
                    this.target[i].life--;
                    if (this.target[i].life <= 0) {
                        this.target[i].removeElement();
                        this.target.splice(i, 1);
                        player.killCount++;
                    }
                    return true;
                }
            }
        }
        return false;
    }

    // ensure projectile does not leave game area
    leavesGameArea() {
        return (
            this.positionX < 8 ||
            this.positionX > 90 ||
            this.positionY < 10 ||
            this.positionY > 90
        );
    }
}

class playerProjectile extends Projectile {
    constructor (target, imgURL) {
        super (target, imgURL);
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
        this.setProjectileImage();
        this.startMovement();
    }

    setProjectileImage () {
        this.domElement.style.backgroundImage = `url(${this.imgURL})`;
    }
    
    startMovement() {
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
}

class enemyProjectile extends Projectile {
    constructor(target, positionX, positionY, imgURL, isHorizontal = false) {
        super(target, imgURL);

        this.width = 1;
        this.height = 5;
        this.positionX = positionX;
        this.positionY = positionY;
        this.isHorizontal = isHorizontal;

        this.createDomElement();
        this.setProjectileImage();
        this.startMovement();
    }

    setProjectileImage() {
        this.domElement.style.backgroundImage = `url(${this.imgURL})`;
    }

    startMovement() {
        const movementInterval = setInterval(() => {
            if (this.leavesGameArea() || this.checkCollision()) {
                clearInterval(movementInterval);
                this.domElement.remove();
                return;
            }

            if (this.isHorizontal) {
                this.positionX += 1;
                this.domElement.style.left = this.positionX + "vw";
            } else {
                this.positionY += 1;
                this.domElement.style.bottom = this.positionY + "vh";
            }
        }, 25);
    }

    checkCollision() {
        if (player.isHit(this)) {
            player.handleHit(); // handle the player getting hit
            return true;
        }
        return false;
    }
}