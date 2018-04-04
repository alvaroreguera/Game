function Player(game) {

    this.vy = 10;
    this.vx = 5;
    this.vz = 5;
    this.game = game;
    this.x0 = this.game.canvas.width * 0.15
    this.x = this.x0
    this.y0 = this.game.canvas.height * 0.98; //limite inferior
    this.y = this.y0; //posicion actual 
    this.jumping = false;
    this.onPlatform = false;
    this.radius = 10; // Arc radius
    this.startAngle = 0; // Starting point on circle
    this.endAngle = Math.PI * 2; // End point on circle
    this.dx = 0;
    this.dy = 0;
    this.lastX = 0;
  this.lastY = 0;
    this.speed = 5;
    this.frictionX = 0.9;
    this.gravity = 0.25;
    this.setListeners();
}
// this.img = new Image();
// this.img.src = "./img/player.png";
// this.width = 80;
// this.height = 100;
// this.animateImg();


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

    if (!this.jumping) {
        this.dx *= this.frictionX;
    }

    this.x += this.dx;

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

Player.prototype.setListeners = function () {

    var map = {
        39: false,  //RIGHT_KEY
        37: false,  //LEFT_KEY
        38: false,  //TOP_KEY
        40: false, //DOWN_KEY

    };

    document.onkeydown = function (event) {

        map[event.keyCode] = true;

        if (map[40] && map[38]) {
            
            if (this.onPlatform) {
                this.jumping = true;
                this.lastY = this.y;
                this.lastX = this.x;
                this.dy = this.gravity * 100;
                this.y += this.dy;
            }
        } else if (map[37] && map[38]) {
            
            if (!this.jumping) {
                this.jumping = true;
                this.lastY = this.y;
                this.lastX = this.x;
                this.dy = -1 * this.speed * 1.5;
                if (this.dx > -this.speed) {
                    this.dx -= 2;
                }
            }
        } else if (map[39] && map[38]) {
            
            if (!this.jumping) {
                this.jumping = true;
                this.lastY = this.y;
                this.lastX = this.x;
                this.dy = -1 * this.speed * 1.5;
                if (this.dx < this.speed) {
                    this.dx += 2;
                }
            }
        } else if (map[37]) {
            
            if (this.dx > -this.speed) {
                this.lastY = this.y;
                this.lastX = this.x;
                this.dx -= 2;
            }
        } else if (map[39]) {
            
            if (this.dx < this.speed) {
                this.lastY = this.y;
                this.lastX = this.x;
                this.dx += 2;
            }
        } else if (map[38]) {
            
            if (!this.jumping) {
                this.lastY = this.y;
                this.lastX = this.x;
                this.jumping = true;
                this.dy = -1 * this.speed * 1.2;
            }
        }
    }.bind(this);

    document.onkeyup = function (event) {
        map[event.keyCode] = false;
    }

};


  







