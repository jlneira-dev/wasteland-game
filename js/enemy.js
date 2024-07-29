class Enemy {
    constructor() {
        // set size of projectile
        this.width = 5;
        this.height = 10;

        // set start position of projectile
        this.positionX = Math.floor(Math.random() * (90 - this.width + 1) + this.width); // random number between 0 and (100 - this.width)
        this.positionY = 10;

        // check if element was removed via collision
        this.removed = false;

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
        }, 200);
    }

    removeEnemy () {
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