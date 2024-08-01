class Player {
    constructor() {
        // set size of player
        this.width = 4;
        this.height = 14;

        // set position of player
        this.positionX = 50 - this.width / 2;
        this.positionY = 50 - this.height / 2;

        // set base amount of player kills
        this.killCount = 0;

        // set life points for player
        this.life = 5;

        // check if player was killed via collision
        this.removed = false;

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
                const newBullet = new playerProjectile(enemies, "./images/fireball.png");
                fireballArr.push(newBullet)
            }
            console.log(this.life)
        }, 750);
    }

    isHit(element) {
        
        // no collision if enemy is removed
        if (this.removed) return false;

        return !(element.positionX > this.positionX + this.width ||
            element.positionX + element.width < this.positionX ||
            element.positionY > this.positionY + this.height ||
            element.positionY + element.height < this.positionY);
    }

    removeElement () {
        this.removed = true;
        
        this.lostMessage = document.createElement("div");
        
        // add content or modify
        this.lostMessage.id = "lost-message";
        
        // append to the dom
        const stage = document.getElementById("stage");
        stage.appendChild(this.lostMessage);
        
        // create end title text
        this.lostTitle = document.createElement("h1");
        this.lostTitle.style.textAlign = "center";
        this.lostTitle.innerText = "You died!"
        this.lostMessage.appendChild(this.lostTitle);
        
        // create finish congratulations
        this.lostExplanation = document.createElement("h3");
        this.lostExplanation.style.textAlign = "center";
        this.lostExplanation.style.padding = "5vh";
        this.lostExplanation.innerText = "Sometimes though you try hard, you do not succeed. Because of your failure, the princess is now dead. It is all your fault. Don't cry to me about it."
        this.lostMessage.appendChild(this.lostExplanation);
        
        // create end confirmation text
        this.lostConfirmation = document.createElement("h4");
        this.lostConfirmation.style.textAlign = "center";
        this.lostConfirmation.style.padding = "0 5vh";
        this.lostConfirmation.innerText = "Do you want to try again?"
        this.lostMessage.appendChild(this.lostConfirmation);
        
        // create end button
        this.lostButton = document.createElement("button");
        this.lostButton.innerText = "Play Again";
        this.lostButton.style.marginTop = "1vh";
        this.lostButton.style.padding = "1vh 2vh";
        this.lostButton.style.width = "20vh";
        this.lostButton.style.border = "0.5vh solid black"
        this.lostButton.style.borderRadius = "1vh";
        this.lostButton.addEventListener("click", () => {
            window.location.href = "./index.html"; 
        });
        this.lostMessage.appendChild(this.lostButton);
        this.domElement.remove();
    }

    // handle player getting hit
    handleHit() {
        this.life--; // reduce the player's life points
        if (this.life <= 0) {
            this.removeElement(); // remove the player if life points drop to zero
        }
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