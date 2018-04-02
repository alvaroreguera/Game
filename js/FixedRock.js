function FixedRock(game, posX, posY, width, height) {
    this.game = game;
    this.posX = posX;
    this.posY = posY;
    this.color = "grey";
    this.width = width;
    this.height = height;

}
FixedRock.prototype.draw = function () {
    this.game.ctx.fillStyle = this.color;
    this.game.ctx.fillRect(this.posX, this.posY, this.width, this.height);
}

