function Player(game) {
    // this.KEY_UP = 38;
    // this.KEY_SPACE = 32;
    this.game = game;
    // this.img = new Image();
    // this.img.src = "./img/player.png";
    this.x0 = this.game.canvas.width * 0.85
    this.x = this.x0
    this.y0 = this.game.canvas.height * 0.95; //limite inferior
    this.y = this.y0; //posicion actual de mario
    this.vy = 10; //velocidad de mario
    // this.width = 80;
    // this.height = 100;
    // this.animateImg();
    this.radius = 10; // Arc radius
    this.startAngle = 0; // Starting point on circle
    this.endAngle = Math.PI * 2; // End point on circle
}

Player.prototype.draw = function () {
    this.game.ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
    this.game.ctx.strokeStyle = "black";
    this.game.ctx.fillStyle = "blue";
    this.game.ctx.fill();
    this.game.ctx.stroke();
    this.game.ctx.closePath();


};


