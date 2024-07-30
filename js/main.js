let stage = new Stage("../images/dungeon-room-1.jpeg");
const player = new Player();
let enemies = [];

setInterval(() => {
    if (stage.imgURL === "../images/dungeon-room-1.jpeg" && player.positionX < 10 && player.positionY > 40 && player.positionY < 50) {
        stage = new Stage("../images/dungeon-room-2.jpeg");
        player.positionX = 90;
    }

    if (stage.imgURL === "../images/dungeon-room-3.jpeg" && player.positionX < 90 && player.positionY > 40 && player.positionY < 50) {
        stage = new Stage("../images/dungeon-room-4.jpeg");
        player.positionX = 10;
    }
}, 1000)

let spawnEnemies = setInterval(() => {
    if (stage.imgURL === "../images/dungeon-room-2.jpeg" && enemies.length < 5) {
        const newEnemy = new Enemy();
        enemies.unshift(newEnemy);
    }
    if (player.killCount >= 10 && stage.imgURL === "../images/dungeon-room-2.jpeg" && player.positionY < 10 && player.positionX > 40 && player.positionX < 50) {
        clearInterval(spawnEnemies);
        enemies.forEach(enemy => {
            enemy.removeEnemy();
        });
        enemies.splice(0, enemies.length-1);
        stage = new Stage("../images/dungeon-room-3.jpeg");
        player.positionY = 90;
    }
}, 2000);