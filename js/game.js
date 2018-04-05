function Game(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    // this.background = new Background(this);
    this.player = new Player(this);
    this.win = new Win(this);
    this.framesCounter = 0;
    this.score = new Score(this);
    this.rock = [];
    this.rockNumber = 15;
    // this.movingRockLeft = [];
    // this.movingRockLeftNumber = 5;
    // this.movingRockRight = [];
    // this.movingRockRightNumber = 5;
    // this.fixedRock = [];
    // this.fixedRockNumber = 5;
    this.decrement = 50;

}
Game.prototype.start = function () {


    // this.generateMovingRockLeft();
    // this.generateMovingRockRight();
    // this.generateFixedRock();
    this.generateRock();
    this.interval = setInterval(function () {

        this.framesCounter === 1000 ? this.framesCounter = 0 : this.framesCounter++
        if (this.framesCounter % 60 === 0) this.decrementScore();
        this.clear();
        this.draw();
        this.moveAll();
        this.isCollision();

    }.bind(this), 1000 / 60);

};

Game.prototype.stop = function () {
    clearInterval(this.interval);
};

Game.prototype.victory = function () {
    this.stop();
    this.reset();
    if (confirm("Victory!!!!")) {
        this.start();
    }
};

Game.prototype.gameOver = function () {
    this.stop();
    this.reset();
    if (confirm("GAME OVER. Play again?")) {
        this.start();
    }
};

Game.prototype.reset = function () {
    // this.background = new Background(this);
    this.player = new Player(this);
    this.win = new Win(this);
    this.score = new Score(this);
    // this.movingRockLeft = [];
    // this.movingRockRight = [];
    // this.fixedRock = [];
    this.rock = [];
    this.framesCounter = 0;
    this.decrement = 50;
};

Game.prototype.generateRock = function () {
    var height = this.canvas.height;
    var width = this.canvas.width;
    for (let i = 0; i < this.rockNumber; i++) {
        if (i == 0) {
            this.rock.push(new Rock(this, Math.floor(Math.random() * (this.canvas.width / 2 - 200)), (height / this.rockNumber * i) + 150, 200, 20, "blue", 3))
        } else if (i < 5 && i > 0) {
            this.rock.push(new Rock(this, Math.floor(Math.random() * (this.canvas.width / 2 - 200)), (height / this.rockNumber * i * 2.9) + 70, 200, 20, "blue", 3))
            }  else if (i == 5) {
            this.rock.push(new Rock(this, Math.floor(Math.random() * (this.canvas.width - 200 - this.canvas.width / 2 - 200) + this.canvas.width / 2 + 200), (height / this.rockNumber * (i - 5) + 150), 200, 20, "green", 3))
        } else if (i < 10 && i > 5) {
            this.rock.push(new Rock(this, Math.floor(Math.random() * (this.canvas.width - 200 - this.canvas.width / 2 - 200) + this.canvas.width / 2 + 200), (height / this.rockNumber * (i - 5) * 2.8) + 80, 200, 20, "green", 3))
        } else if (i == 10) {
            this.rock.push(new Rock(this, width / 2, height * 0.1, width * 0.05, height * 0.9, "grey", 0))
        } else if (i == 11) {
            this.rock.push(new Rock(this, width * 1.6 / 7, height * 0.1, width * 0.6, height * 0.05, "grey", 0))
        }
        else {
            this.rock.push(new Rock(this, width * 2.2 / 7, (i - 10) * 130, width * 3 / 7, height * 0.05, "grey", 0))
        }

    }
}


// Game.prototype.generateMovingRockLeft = function () {

//     var height = this.canvas.height;
//     var width = this.canvas.width;
//     for (let i = 0; i < this.movingRockLeftNumber; i++) {
//         if (i == 0) {

//             this.movingRockLeft.push(new MovingRockLeft(this, Math.floor(Math.random() * (this.canvas.width / 2 - 200)), (height / this.movingRockLeftNumber * i) + 150, 200, 20))
//         } else {
//             this.movingRockLeft.push(new MovingRockLeft(this, Math.floor(Math.random() * (this.canvas.width / 2 - 200)), (height / this.movingRockLeftNumber * i) + 80, 200, 20))
//         };
//     }
// }

// Game.prototype.generateMovingRockRight = function () {
//     var height = this.canvas.height;
//     var width = this.canvas.width;
//     for (let i = 0; i < this.movingRockRightNumber; i++) {
//         if (i == 0) {
//             this.movingRockRight.push(new MovingRockRight(this, Math.floor(Math.random() * (this.canvas.width - 200 - this.canvas.width / 2 - 200) + this.canvas.width / 2 + 200), (height / this.movingRockRightNumber * i) + 150, 200, 20))
//         } else {
//             this.movingRockRight.push(new MovingRockRight(this, Math.floor(Math.random() * (this.canvas.width - 200 - this.canvas.width / 2 - 200) + this.canvas.width / 2 + 200), (height / this.movingRockRightNumber * i) + 80, 200, 20))
//         }
//     };
// };

// Game.prototype.generateFixedRock = function () {
//     var height = this.canvas.height;
//     var width = this.canvas.width;
//     for (let i = 0; i < this.fixedRockNumber; i++) {
//         if (i == 0) {
//             this.fixedRock.push(new FixedRock(this, width / 2, height * 0.1, width * 0.05, height * 0.9))
//         } else if (i == 1) {
//             this.fixedRock.push(new FixedRock(this, width * 1.6 / 7, height * 0.1, width * 0.6, height * 0.05))
//         }
//         else {
//             this.fixedRock.push(new FixedRock(this, width * 2.2 / 7, (height / this.fixedRockNumber * i) + 10, width * 3 / 7, height * 0.05))
//         }
//     }
// };

Game.prototype.isCollision = function () {
    var collision = false;

    this.rock.forEach(function (rock) {
        if (rock.collidesWith(this.player)) {
            this.player.dy= 0;
            this.player.onPlatform = true;
            this.player.jumping = false;
            this.player.y = rock.posY - this.player.radius;
        } else { this.player.onPlatform = false;}
    }.bind(this))


        // } else if (!this.player.jumping && this.player.onPlatform) {
        //     this.player.jumping = false;
        //     this.player.onPlatform = false;
        // }
    // })



    //     var collisionFixed = false;
    //     var collisionMovingLeft = false;
    //     var collisionMovingRight = false;
    //     var movingRockColLeft;
    //     var movingRockColRight;
    //     var fixedRockCol;

    //     for (let j = 0; j < this.movingRockLeftNumber; j++) {
    //         if (
    //             this.player.x < this.movingRockLeft[j].posX + this.movingRockLeft[j].width &&
    //             this.player.x + this.player.radius > this.movingRockLeft[j].posX &&
    //             this.player.y < this.movingRockLeft[j].posY &&
    //             this.player.y + this.player.radius > this.movingRockLeft[j].posY
    //         ) {
    //             collisionMovingLeft = true;
    //             movingRockColLeft = this.movingRockLeft[j];

    //         }
    //     };
    //     if (collisionMovingLeft) {
    //         this.player.onPlatform = true;
    //         this.player.jumping = false;
    //         this.player.y = movingRockColLeft.posY - this.player.radius;
    //     } else if (!this.player.jumping && this.player.onPlatform) {
    //         this.player.jumping = false;
    //         this.player.onPlatform = false;
    //     };

    //     for (let h = 0; h < this.movingRockRightNumber; h++) {


    //         if (
    //             this.player.x < this.movingRockRight[h].posX + this.movingRockRight[h].width &&
    //             this.player.x + this.player.radius > this.movingRockRight[h].posX &&
    //             this.player.y < this.movingRockRight[h].posY &&
    //             this.player.y + this.player.radius > this.movingRockRight[h].posY
    //         ) {
    //             collisionMovingRight = true;
    //             movingRockColRight = this.movingRockRight[h];
    //             console.log("colisión");
    //         }
    //     };
    //     if (collisionMovingRight) {
    //         this.player.onPlatform = true;
    //         this.player.jumping = false;
    //         console.log(this.player.jumping);
    //         this.player.y = movingRockColRight.posY - this.player.radius;
    //     } else if (!this.player.jumping && this.player.onPlatform) {
    //         this.player.jumping = false;
    //         this.player.onPlatform = false;
    //     };


    //     for (let k = 1; k < this.fixedRockNumber; k++) {
    //         if (
    //             this.player.x < this.fixedRock[k].posX + this.fixedRock[k].width &&
    //             this.player.x + this.player.radius > this.fixedRock[k].posX &&
    //             this.player.y < this.fixedRock[k].posY + this.fixedRock[k].height &&
    //             this.player.y + this.player.radius > this.fixedRock[k].posY
    //         ) {
    //             collisionFixed = true;
    //             fixedRockCol = this.fixedRock[k];
    //         }
    //     };

    //     if (collisionFixed) {
    //         this.player.onPlatform = true;
    //         this.player.y = fixedRockCol.posY - this.player.radius;
    //         this.player.jumping = false;
    //     } else if (!this.player.jumping && this.player.onPlatform) {
    //         this.player.jumping = false;
    //         this.player.onPlatform = false;

    //     };

        if (this.player.x < this.rock[10].posX + this.rock[10].width &&   
            this.player.x + this.player.radius > this.rock[10].posX &&     
            this.player.y < this.rock[10].posY + this.rock[10].height &&   
            this.player.y + this.player.radius > this.rock[10].posY      
        ) {
            this.player.dx *= -1;

        };

        if (this.player.x < this.win.x + this.win.width &&
            this.player.x + this.player.radius > this.win.x &&
            this.player.y < this.win.y + this.win.height &&
            this.player.y + this.player.radius > this.win.y
        ) {
            this.victory();

        };

    };


    Game.prototype.draw = function () {

        this.player.draw();
        this.win.draw();
        this.score.draw();
        this.rock.forEach(function (rock) {
            rock.draw();
        })

        // this.fixedRock.forEach(function (fixedRock) {
        //     fixedRock.draw();
        // })
        // this.movingRockLeft.forEach(function (movingRockLeft) {
        //     movingRockLeft.draw();
        // })
        // this.movingRockRight.forEach(function (movingRockRight) {
        //     movingRockRight.draw();
        // })
    };

    Game.prototype.moveAll = function () {
        this.player.move();
         this.rock.forEach(function (rock) {
         rock.move()
     });
    };

    Game.prototype.decrementScore = function () {
        this.decrement--;
        if (this.decrement < 0) {
            this.gameOver();
        }
    }

    Game.prototype.clear = function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

