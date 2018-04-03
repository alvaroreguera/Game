function Game(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    // this.background = new Background(this);
    this.player = new Player(this);
    this.movingRock = [];
    this.movingRockNumber = 5;
    this.generateMovingRock();
    this.fixedRock = [];
    this.fixedRockNumber = 5;
    this.generateFixedRock();
    this.obstacles = [];
    this.started = false;

}
Game.prototype.start = function () {
    if (this.started) {
        return;
    }
    this.interval = setInterval(function () {
        this.clear();
        this.draw();
        this.moveAll();
        this.isCollision();

    }.bind(this), 1000 / 60);

    this.started = true;
};

Game.prototype.stop = function () {
    clearInterval(this.interval);
    this.started = false;
};

Game.prototype.victory = function () {
    this.stop();
    if (confirm("Victory!!!!")) {
        this.reset();
        this.start();
    }
};

// Game.prototype.clearObstacles = function () {
//     this.obstacles.shift();
// };

Game.prototype.generateMovingRock = function () {
    var height = this.canvas.height;
    var width = this.canvas.width;
    for (let i = 0; i < this.movingRockNumber; i++) {
        if (i == 0) {

            this.movingRock.push(new MovingRock(this, Math.floor(Math.random() * (this.canvas.width / 2 - 200)), (height / this.movingRockNumber * i) + 150, 200, 20))
        } else {
            this.movingRock.push(new MovingRock(this, Math.floor(Math.random() * (this.canvas.width / 2 - 200)), (height / this.movingRockNumber * i) + 80, 200, 20))
        }
    }
};

Game.prototype.generateFixedRock = function () {
    var height = this.canvas.height;
    var width = this.canvas.width;
    for (let i = 0; i < this.fixedRockNumber; i++) {
        if (i == 0) {
            this.fixedRock.push(new FixedRock(this, width / 2, height * 0.1, width * 0.05, height * 0.9))
        } else if (i == 1) {
            this.fixedRock.push(new FixedRock(this, width * 1.6 / 7, height * 0.1, width * 0.6, height * 0.05))
        }
        else {
            this.fixedRock.push(new FixedRock(this, width * 2.2 / 7, (height / this.fixedRockNumber * i) + 10, width * 3 / 7, height * 0.05))
        }
    };
};

Game.prototype.isCollision = function () {
    var collisionFixed = false;
    var collisionMoving = false;
    var movingRockCol;
    var fixedRockCol;
    for (let j = 0; j < this.movingRockNumber; j++) {

        if (
            this.player.x < this.movingRock[j].posX + this.movingRock[j].width &&
            this.player.x + this.player.radius > this.movingRock[j].posX &&
            this.player.y < this.movingRock[j].posY + this.movingRock[j].height &&
            this.player.y + this.player.radius > this.movingRock[j].posY
        ) {
            collisionMoving = true;
            movingRockCol = this.movingRock[j];
            console.log("colisión");
        }
    };
    if (collisionMoving) {
        this.player.onPlatform = true;
        this.player.jumping = false;
        this.player.y = movingRockCol.posY - this.player.radius;
    } else if (!this.player.jumping && this.player.onPlatform) {
        this.player.jumping = true;
        this.player.onPlatform = false;
    };

    for (let k = 0; k < this.fixedRockNumber; k++) {

        if (
            this.player.x < this.fixedRock[k].posX + this.fixedRock[k].width &&
            this.player.x + this.player.radius > this.fixedRock[k].posX &&
            this.player.y < this.fixedRock[k].posY + this.fixedRock[k].height &&
            this.player.y + this.player.radius > this.fixedRock[k].posY
        ) {
            collisionFixed = true;
            fixedRockCol = this.fixedRock[k];
            console.log("colisión");
        }
    };

    if (collisionFixed) {
        this.player.onPlatform = true;
        this.player.jumping = false;
        this.player.y = fixedRockCol.posY - this.player.radius;
    } else if (!this.player.jumping && this.player.onPlatform) {
        this.player.jumping = true;
        this.player.onPlatform = false;

    };
}


Game.prototype.draw = function () {

    this.player.draw();
    this.fixedRock.forEach(function (fixedRock) {
        fixedRock.draw();
    })
    this.movingRock.forEach(function (movingRock) {
        movingRock.draw();
    })
};

Game.prototype.moveAll = function () {
    this.player.move();
    this.movingRock.forEach(function (movingRock) {
        movingRock.move()
    })
};

Game.prototype.clear = function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

