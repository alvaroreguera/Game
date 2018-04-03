function MovingRockLeft(game, posX, posY, width, height) {
    this.game = game;
    this.posX = posX;
    this.posY = posY;
    this.color = "blue";
    this.width = width;
    this.height = height;
    this.vx = 3
}

MovingRockLeft.prototype.draw = function () {
    this.game.ctx.fillStyle = this.color;
    this.game.ctx.fillRect(this.posX, this.posY, this.width, this.height);
}

MovingRockLeft.prototype.move = function() {
    this.posX += this.vx;
    if (this.posX > this.game.canvas.width/2 - this.width|| this.posX < 0) {
      this.vx *= -1;
    }

};
