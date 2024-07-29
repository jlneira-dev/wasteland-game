let stage = new Stage("../images/dungeon-room-1.jpeg");
const player = new Player();
let enemies = [];

if (stage.imgURL === "../images/dungeon-room-1.jpeg" && player.positionX < 10 && 40 < player.positionY > 60) {
    stage = new Stage("../images/dungeon-room-2.jpeg");
    player.positionX = 90;
}

setInterval(() => {
    const newEnemy = new Enemy();
    enemies.unshift(newEnemy);
}, 4000);