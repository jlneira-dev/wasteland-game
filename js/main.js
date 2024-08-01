let stage = new Stage("./images/dungeon-room-1.jpeg");
stage.showStartMessage();
let fireballArr = [];
let arrowArr = [];
const player = new Player();
let enemies = [];
let spawnSkeletons, spawnArchers;

// function to clear enemies
function clearEnemies() {
    for (let i = enemies.length - 1; i >= 0; i--) {
        enemies[i].removeElement();
        enemies.splice(i, 1);
    }
}

// function to clear bullets
function clearBullets() {
    for (let i = fireballArr.length - 1; i >= 0; i--) {
        fireballArr[i].domElement.remove();
        fireballArr.splice(i, 1);
    }
    for (let i = arrowArr.length - 1; i >= 0; i--) {
        arrowArr[i].domElement.remove();
        arrowArr.splice(i, 1);
    }
}

// function to change stage
function changeStage(newStage, newX, newY) {
    stage = new Stage(newStage);
    player.positionX = newX;
    player.positionY = newY;
    clearEnemies();
    clearBullets();
}

// change relevant stages based on player position
setInterval(() => {
    if (stage.imgURL === "./images/dungeon-room-1.jpeg" && player.positionX < 10 && player.positionY > 40 && player.positionY < 50) {
        changeStage("./images/dungeon-room-2.jpeg", 90, player.positionY);
    }

    if (player.killCount >= 4 && stage.imgURL === "./images/dungeon-room-3.jpeg" && player.positionX > 80 && player.positionY > 40 && player.positionY < 50) {
        player.killCount = 0;
        changeStage("./images/dungeon-room-4.jpeg", 10, player.positionY);
        setTimeout(() => {
            stage.showEndMessage();
        }, 4000);
    }
}, 1000);

// create skeletons when in room 2
spawnSkeletons = setInterval(() => {
    if (stage.imgURL === "./images/dungeon-room-2.jpeg" && enemies.length < 5) {
        const newEnemy = new Skeleton("./images/skeleton.png");
        enemies.unshift(newEnemy);
    }

    // change rooms if killed over a certain amount
    if (player.killCount >= 2 && stage.imgURL === "./images/dungeon-room-2.jpeg" && player.positionY < 10 && player.positionX > 40 && player.positionX < 50) {
        player.killCount = 0;
        changeStage("./images/dungeon-room-3.jpeg", player.positionX, 90);
    }
}, 1000);

// create archers when in room 3
spawnArchers = setInterval(() => {
    if (stage.imgURL === "./images/dungeon-room-3.jpeg" && enemies.length < 8) {

        // create vertical-shooting archers
        for (let i = 0; i < 7; i++) {
            const newArcher = new Archer("./images/skeleton-archer.webp");
            enemies.unshift(newArcher);
        }
        
        // reate horizontal-shooting archers 
        for (let i = 0; i < 4; i++) {
            const newHorizontalArcher = new Archer("./images/skeleton-archer.webp", true);
            enemies.unshift(newHorizontalArcher);
        }
        clearInterval(spawnArchers);
    }
}, 1000);
