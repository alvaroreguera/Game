function Player(game) {
    var RIGHT_KEY = 39;
    var LEFT_KEY = 37;
    var TOP_KEY = 38;
    this.vy = 10;
    this.vx = 5;
    this.vz = 5;
    this.game = game;
    this.x0 = this.game.canvas.width * 0.15
    this.x = this.x0
    this.y0 = this.game.canvas.height * 0.98; //limite inferior
    this.y = this.y0; //posicion actual de mario
    this.jumping = false;
    this.onPlatform = false;
    this.radius = 10; // Arc radius
    this.startAngle = 0; // Starting point on circle
    this.endAngle = Math.PI * 2; // End point on circle
    this.dx = 1;
    this.dy = 1;
    this.speed = 5;
    this.frictionX = 0.9, 
    this.gravity = 0.25;
    // this.img = new Image();
    // this.img.src = "./img/player.png";
    // this.width = 80;
    // this.height = 100;
    // this.animateImg();
    document.onkeydown = function (event) {
console.log(this.jumping);
        switch (event.keyCode) {
            case RIGHT_KEY:
                console.log("right")
                 if (this.dx < this.speed) {
                    this.x += 10;
                 }
                break;
            case LEFT_KEY:
                console.log("left")
                 if (this.dx > -this.speed) {
                    this.x -= 10;
                 }
                break;
            case TOP_KEY:
                console.log("up")
                if (!this.jumping) {
                    this.jumping = true
                    console.log(this.jumping);
                    this.dy = -1 * this.speed * 1.5;
                    this.y -= this.dy;
                }

                break;
        }
    }.bind(this);
};

Player.prototype.draw = function () {
    this.game.ctx.beginPath();
    this.game.ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
    this.game.ctx.strokeStyle = "black";
    this.game.ctx.fillStyle = "blue";
    this.game.ctx.fill();
    this.game.ctx.stroke();
    this.game.ctx.closePath();

};

Player.prototype.move = function () {

    if (!this.jumping ) {
        this.dx *= this.frictionX;
      }

    this.dy += this.gravity;

    if (this.jumping || !this.onPlatform) {
        this.y += this.dy;
    }

    if (!this.jumping && this.onPlatform && this.dy > 5) {
        this.dy = 0;
    }

    if (this.x + this.radius > this.game.canvas.width) {
        this.x = this.game.canvas.width - this.radius;
    } else if (this.x < 0) {
        this.x = 0;
    }

    if (this.y + this.radius > this.game.canvas.height) {
        this.y = this.game.canvas.height - this.radius;
        this.jumping = false;
    } else if (this.y < 0) {
        this.y = this.radius;

    }

};







