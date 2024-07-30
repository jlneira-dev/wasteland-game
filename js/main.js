let stage = new Stage("../images/dungeon-room-1.jpeg");
const player = new Player();
let enemies = [];

// change stage when in particular position
setInterval(() => {
    if (stage.imgURL === "../images/dungeon-room-1.jpeg" && player.positionX < 10 && player.positionY > 40 && player.positionY < 50) {
        stage = new Stage("../images/dungeon-room-2.jpeg");
        player.positionX = 90;
    }

    if (stage.imgURL === "../images/dungeon-room-3.jpeg" && player.positionX > 90 && player.positionY > 40 && player.positionY < 50) {
        stage = new Stage("../images/dungeon-room-4.jpeg");
        player.positionX = 10;
    }
}, 1000)

// create skeletons when in room 2 and change rooms if player count reaches a certain amount, delete all enemies when room changed
let spawnSkeletons = setInterval(() => {
    if (stage.imgURL === "../images/dungeon-room-2.jpeg" && enemies.length < 5) {
        const newEnemy = new Skeleton("../images/skeleton.png");
        enemies.unshift(newEnemy);
    }
    if (player.killCount >= 2 && stage.imgURL === "../images/dungeon-room-2.jpeg" && player.positionY < 10 && player.positionX > 40 && player.positionX < 50) {
        clearInterval(spawnSkeletons);
        for (let i=enemies.length-1; i >= 0; i--) {
            enemies[i].removeEnemy();
            enemies.splice(i, 1);
        }
        stage = new Stage("../images/dungeon-room-3.jpeg");
        player.positionY = 90;
    }
}, 2000);

function spawnArchers (){
    const newArcher = new Archer("../images/skeleton-archer.webp");
    enemies.unshift(newArcher)
}

setInterval(() => {
    if (stage.imgURL === "../images/dungeon-room-3.jpeg")
        spawnArchers();
        
}, 1000)