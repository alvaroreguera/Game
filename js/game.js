function Game(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.background = new Background(this);
    this.player = new Player(this);
    this.win = new Win(this);
    this.framesCounter = 0;
    this.score = new Score(this);
    this.rock = [];
    this.rockNumber = 15;
    this.decrement = 10;

}
Game.prototype.start = function () {

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
    window.location.href = "victory.html";
    
    // if (confirm("Victory!!!!")) {
    //     this.start();
    // }
};

Game.prototype.gameOver = function () {
    this.stop();
    this.reset();
    window.location.href = "gameover.html";
    // if (confirm("GAME OVER. Play again?")) {
    //     this.start();
    // }
};

Game.prototype.reset = function () {
    // this.background = new Background(this);
    this.player = new Player(this);
    this.win = new Win(this);
    this.score = new Score(this);
    this.rock = [];
    this.framesCounter = 0;
    this.decrement = 10;
};

Game.prototype.generateRock = function () {
    var height = this.canvas.height;
    var width = this.canvas.width;
    for (let i = 0; i < this.rockNumber; i++) {
        if (i == 0) {
            this.rock.push(new Rock(this, Math.floor(Math.random() * (this.canvas.width / 2 - 200)), (height / this.rockNumber * i) + 150, 200, 20, "blue", Math.floor(Math.random() * (7-3)+1)))
        } else if (i < 5 && i > 0) {
            this.rock.push(new Rock(this, Math.floor(Math.random() * (this.canvas.width / 2 - 200)), (height / this.rockNumber * i * 2.9) + 70, 200, 20, "blue", Math.floor(Math.random() * (7-3)+1)))
            }  else if (i == 5) {
            this.rock.push(new Rock(this, Math.floor(Math.random() * (this.canvas.width - 200 - this.canvas.width / 2 - 200) + this.canvas.width / 2 + 200), (height / this.rockNumber * (i - 5) + 150), 200, 20, "green", Math.floor(Math.random() * (7-3)+1)))
        } else if (i < 10 && i > 5) {
            this.rock.push(new Rock(this, Math.floor(Math.random() * (this.canvas.width - 200 - this.canvas.width / 2 - 200) + this.canvas.width / 2 + 200), (height / this.rockNumber * (i - 5) * 2.8) + 80, 200, 20, "green", Math.floor(Math.random() * (7-3)+1)))
        } else if (i == 10) {
            this.rock.push(new Rock(this, width / 2, height * 0.1, width * 0.05, height * 0.9, "#8B4513", 0))
        } else if (i == 11) {
            this.rock.push(new Rock(this, width * 1.6 / 7, height * 0.1, width * 0.6, height * 0.05, "#8B4513", 0))
        }
        else {
            this.rock.push(new Rock(this, width * 2.2 / 7, (i - 10) * 130, width * 3 / 7, height * 0.05, "#8B4513", 0))
        }

    }
}


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
this.background.draw();
        this.player.draw();
        this.win.draw();
        this.score.draw();
        this.rock.forEach(function (rock) {
            rock.draw();
        })

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

