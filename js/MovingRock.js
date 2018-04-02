function MovingRock(game, posX, posY, width, height) {
    this.game = game;
    this.posX = posX;
    this.posY = posY;
    this.color = "blue";
    this.width = width;
    this.height = height;

}
MovingRock.prototype.draw = function () {
    console.log("moving");
    this.game.ctx.fillStyle = this.color;
    this.game.ctx.fillRect(this.posX, this.posY, this.width, this.height);
}