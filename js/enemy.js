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
    isHit(projectile) {
        
        // no collision if enemy is removed
        if (this.removed) return false;

        return !(projectile.positionX > this.positionX + this.width ||
            projectile.positionX + projectile.width < this.positionX ||
            projectile.positionY > this.positionY + this.height ||
            projectile.positionY + projectile.height < this.positionY);
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
    static positionsX = [10, 20, 30, 40, 50, 60, 70, 80, 90]; // Predefined positions
    static currentIndex = 0; // Current index in the positions array

    constructor(imgURL) {
        super(imgURL);

        // set size of archers
        this.width = 4;
        this.height = 15;

        // set positionX for archers based on predefined positions
        this.positionX = Archer.positionsX[Archer.currentIndex];
        Archer.currentIndex = (Archer.currentIndex + 1) % Archer.positionsX.length; // Cycle through positions

        this.positionY = 10;

        this.createDomElement();
        this.setEnemyImage();
        this.shootUp();
    }

    shootUp() {
        const startShoot = setInterval (() => {
            new enemyProjectile(player, "../images/arrow.png");
            if (this.removed) {
                clearInterval(startShoot);
            }
        }, 3000);
    }
}