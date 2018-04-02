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

Game.prototype.clearObstacles = function () {
    this.obstacles.shift();
};
Game.prototype.generateMovingRock = function () {
    var height = this.canvas.height;
    for (let i = 0; i < this.movingRockNumber; i++) {
        if (i == 0) {
            this.movingRock.push(new MovingRock(this, 0, (height / this.movingRockNumber * i) + 150, 200, 20))
        } else {
            this.movingRock.push(new MovingRock(this, 0, (height / this.movingRockNumber * i) + 80, 200, 20))
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
    }
};

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
    
    this.movingRock.forEach(function (movingRock) {
        movingRock.move()})
};


Game.prototype.clear = function () {
    console.log("limpiando");
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
};
