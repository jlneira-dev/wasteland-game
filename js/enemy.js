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
    constructor (imgURL){
        super (imgURL);

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
        setInterval (() => {

            // stop movement if enemy is removed
            if (this.removed) return;

            // move enemy right if player is further right
            if (player.positionX > this.positionX) this.positionX++; 

            // move enemy left if player is further left
            if (player.positionX < this.positionX) this.positionX--;

            // move enemy up if player is further up
            if (player.positionY > this.positionY) this.positionY++;

            // move enemy down if player is further down
            if (player.positionY < this.positionY) this.positionY--;

            this.domElement.style.left = this.positionX + "vw";
            this.domElement.style.bottom = this.positionY + "vh";
        }, 150);
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
            new enemyProjectile(player, this.positionX, this.positionY + this.height / 2, "./images/arrow-vertical.png");

            // move the archer after shooting
            this.move();
        }, 500);
    }
}