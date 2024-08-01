class Enemy {
    constructor(imgURL) {
        // set size of enemy
        this.width = 5;
        this.height = 10;

        // set start position of enemy
        this.positionX = Math.floor(Math.random() * (90 - this.width + 1) + this.width);
        this.positionY = 10;

        // check if element was removed via collision
        this.removed = false;

        // start with 3 lives
        this.life = 3;

        // set background image for enemy
        this.imgURL = imgURL;
    }

    setEnemyImage() {
        this.domElement.style.backgroundImage = `url(${this.imgURL})`; 
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

    removeElement () {
        this.removed = true;
        this.domElement.remove();
    }

    // decide if enemy is hit by projectile
    isHit(element) {
        
        // no collision if enemy is removed
        if (this.removed) return false;

        return !(element.positionX > this.positionX + this.width ||
            element.positionX + element.width < this.positionX ||
            element.positionY > this.positionY + this.height ||
            element.positionY + element.height < this.positionY);
    }
}

class Skeleton extends Enemy {
    constructor(imgURL) {
        super(imgURL);

        // set size of skeletons
        this.width = 5;
        this.height = 10;

        // set position of skeletons
        this.positionX = Math.floor(Math.random() * (90 - this.width + 1) + this.width);
        this.positionY = 10;

        this.createDomElement();
        this.setEnemyImage();
        this.moveToPlayer();
    }

    // move enemy to player
    moveToPlayer() {
        const movementInterval = setInterval(() => {
            // stop movement if enemy is removed
            if (this.removed) {
                clearInterval(movementInterval);
                return;
            }

            // move enemy based on player's position
            if (player.positionX > this.positionX) this.positionX++;
            if (player.positionX < this.positionX) this.positionX--;
            if (player.positionY > this.positionY) this.positionY++;
            if (player.positionY < this.positionY) this.positionY--;

            this.domElement.style.left = this.positionX + "vw";
            this.domElement.style.bottom = this.positionY + "vh";

            // check collision with player
            if (player.isHit(this)) {
                this.handleHit(); // handle skeleton getting hit
                player.handleHit(); // handle player getting hit
            }
        }, 150);
    }

    // handle skeleton getting hit
    handleHit() {
        this.removeElement(); // remove the skeleton from the game
    }
}

class Archer extends Enemy {
    static positionsX = [20, 30, 40, 50, 60, 70, 80];
    static currentIndex = 0;

    constructor(imgURL) {
        super(imgURL);

        // set size of archers
        this.width = 4;
        this.height = 15;

        // set initial position of archers
        this.startPositionX = Archer.positionsX[Archer.currentIndex];
        this.positionX = this.startPositionX;
        this.positionY = 10;
        Archer.currentIndex = (Archer.currentIndex + 1) % Archer.positionsX.length;

        this.direction = -1; // -1 for moving left, 1 for moving right

        this.createDomElement();
        this.setEnemyImage();
        this.shoot();
    }

    // move archer left or right depending on start position
    move() {
        if (this.direction === -1 && this.positionX <= this.startPositionX - 10) {
            this.direction = 1; // change direction to move right
        } else if (this.direction === 1 && this.positionX >= this.startPositionX) {
            this.direction = -1; // change direction to move left
        }

        this.positionX += this.direction;
        this.domElement.style.left = this.positionX + "vw";
    }

    shoot() {
        this.startShoot = setInterval(() => {
            if (this.removed) {
                clearInterval(this.startShoot);
                return;
            }

            // create a new projectile moving vertically
            const newArrow = new enemyProjectile(player, this.positionX, this.positionY + this.height / 2, "./images/arrow-vertical.png");
            arrowArr.push(newArrow)
            // move the archer after shooting
            this.move();
        }, 500);
    }
}