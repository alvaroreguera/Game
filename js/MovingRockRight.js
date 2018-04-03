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
    if (this.posX > this.canvas.width - 200 - this.canvas.width / 2 + + this.width|| this.canvas.width / 2 + 200 < 0) {
      this.vx *= -1;
    }

};