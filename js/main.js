class Player {
    constructor() {
        this.width = 20;
        this.height = 20;
        this.positionX = 50;
        this.positionY = 50;

        this.createDomElement();
    }
    createDomElement() {
        // step1: create the element:
        this.domElement = document.createElement("div");

        // step2: add content or modify (ex. innerHTML...)
        this.domElement.id = "player";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.bottom = this.positionY + "vh";

        //step3: append to the dom: `parentElm.appendChild()`
        const stage = document.getElementById("stage");
        stage.appendChild(this.domElement);
    }
    moveLeft() {
        if(this.positionX > 0) {
            this.positionX--;
            this.domElement.style.left = this.positionX + "vw";
        }
    }
    moveRight() {
        if(this.positionX < 100 - this.width) {
            this.positionX++;
            this.domElement.style.left = this.positionX + "vw";
        }
    }
    moveUp() {
        if (this.positionY < 100 - this.height) {
            this.positionY++;
            this.domElement.style.bottom = this.positionY + "vh";
        }
    }
    moveDown() {
        if (this.positionY > 0) {
            this.positionY--;
            this.domElement.style.bottom = this.positionY + "vh";
        }
    }
}

const player = new Player();

document.addEventListener("keydown", (e) => {
    if (e.code === 'KeyA') {
        player.moveLeft();
    } else if (e.code === 'KeyD') {
        player.moveRight();
    } else if (e.code === 'KeyW') {
        player.moveUp();
    } else if (e.code === 'KeyS') {
        player.moveDown();
    }
});