function MovingRockRight(game, posX, posY, width, height) {
    this.game = game;
    this.posX = posX;
    this.posY = posY;
    this.color = "green";
    this.width = width;
    this.height = height;
    this.vx = 3
}

MovingRockRight.prototype.draw = function () {
    this.game.ctx.fillStyle = this.color;
    this.game.ctx.fillRect(this.posX, this.posY, this.width, this.height);
}

MovingRockRight.prototype.move = function() {
    this.posX += this.vx;
    if (this.posX > this.game.canvas.width - 200 || this.posX < this.game.canvas.width / 2 + this.game.canvas.width*0.05)  {
      this.vx *= -1;
    }

};