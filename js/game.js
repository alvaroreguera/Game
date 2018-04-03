function Game(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    // this.background = new Background(this);
    this.player = new Player(this);
    this.movingRockLeft = [];
    this.movingRockLeftNumber = 5;
    this.generateMovingRockLeft();
    this.movingRockRight = [];
    this.movingRockRightNumber = 5;
    this.generateMovingRockRight();
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

        Game.prototype.generateMovingRockLeft = function () {
            
        var height = this.canvas.height;
        var width = this.canvas.width;
        for (let i = 0; i < this.movingRockLeftNumber; i++) {
        if (i == 0) {

            this.movingRockLeft.push(new MovingRockLeft(this, Math.floor(Math.random() * (this.canvas.width / 2 - 200)), (height / this.movingRockLeftNumber * i) + 150, 200, 20))
        } else {
            this.movingRockLeft.push(new MovingRockLeft(this, Math.floor(Math.random() * (this.canvas.width / 2 - 200)), (height / this.movingRockLeftNumber * i) + 80, 200, 20))
        };
    }
}

        Game.prototype.generateMovingRockRight = function () {
            console.log("hola");
            var height = this.canvas.height;
            var width = this.canvas.width;
            for (let i = 0; i < this.movingRockRightNumber; i++) {
                if (i == 0) {
                    this.movingRockRight.push(new MovingRockRight(this, Math.floor(Math.random() * ((this.canvas.width - 200) - this.canvas.width / 2 + 200)), (height / this.movingRockRightNumber * i) + 150, 200, 20))
                } else {
                    this.movingRockRight.push(new MovingRockRight(this, Math.floor(Math.random() * ((this.canvas.width - 200) - this.canvas.width / 2 + 200)), (height / this.movingRockRightNumber * i) + 80, 200, 20))
                }
            };
            console.log(this.movingRockRight[0].posY);
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
            console.log(this.fixedRock[0].posY)
        };

        Game.prototype.isCollision = function () {
            var collisionFixed = false;
            var collisionMovingLeft = false;
            var collisionMovingRight = false;
            var movingRockColLeft;
            var movingRockColRight;
            var fixedRockCol;
            for (let j = 0; j < this.movingRockLeftNumber; j++) {

                if (
                    this.player.x < this.movingRockLeft[j].posX + this.movingRockLeft[j].width &&
                    this.player.x + this.player.radius > this.movingRockLeft[j].posX &&
                    this.player.y < this.movingRockLeft[j].posY &&
                    this.player.y + this.player.radius > this.movingRockLeft[j].posY
                ) {
                    collisionMovingLeft = true;
                    movingRockColLeft = this.movingRockLeft[j];
                    console.log("colisión");
                }
            };
            if (collisionMovingLeft) {
                this.player.onPlatform = true;
                this.player.jumping = false;
                console.log(this.player.jumping);
                this.player.y = movingRockColLeft.posY - this.player.radius;
            } else if (!this.player.jumping && this.player.onPlatform) {
                this.player.jumping = false;
                this.player.onPlatform = false;
            }

            for (let j = 0; j < this.movingRockNumberRight; j++) {

                if (
                    this.player.x < this.movingRockRight[j].posX + this.movingRockRight[j].width &&
                    this.player.x + this.player.radius > this.movingRockRight[j].posX &&
                    this.player.y < this.movingRockRight[j].posY &&
                    this.player.y + this.player.radius > this.movingRockRight[j].posY
                ) {
                    collisionMovingRight = true;
                    movingRockColRight = this.movingRockRight[j];
                    console.log("colisión");
                }
            };
            if (collisionMovingRight) {
                this.player.onPlatform = true;
                this.player.jumping = false;
                console.log(this.player.jumping);
                this.player.y = movingRockColRight.posY - this.player.radius;
            } else if (!this.player.jumping && this.player.onPlatform) {
                this.player.jumping = false;
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
                this.player.y = fixedRockCol.posY - this.player.radius;
                this.player.jumping = false;
            } else if (!this.player.jumping && this.player.onPlatform) {
                this.player.jumping = false;
                this.player.onPlatform = false;

            };
        }


        Game.prototype.draw = function () {

            this.player.draw();
            this.fixedRock.forEach(function (fixedRock) {
                fixedRock.draw();
            })
            this.movingRockLeft.forEach(function (movingRockLeft) {
                movingRockLeft.draw();
            })
            this.movingRockRight.forEach(function (movingRockRight) {
                movingRockRight.draw();
            })
        };

        Game.prototype.moveAll = function () {
            this.player.move();
            this.movingRockLeft.forEach(function (movingRockLeft) {
                movingRockLeft.move()
            });
            this.movingRockRight.forEach(function (movingRockRight) {
                movingRockRight.move()
            });
        };

        Game.prototype.clear = function () {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        };

