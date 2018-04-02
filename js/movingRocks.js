function MovingRocks(game) {
    this.game = game;
    this.w = game.canvas.width;
    this.h = this.game.canvas.height;
    this.x = Math.floor(Math.random() * ((this.w-this.w*1/7) - (this.w/2+this.w*0.05)) + (this.w/2+this.w*0.05));
    this.y = this.game.canvas.height;

}

MovingRocks.prototype.drawRect = function (x, y, width, height) {
    this.game.ctx.fillRect(x, y, width, height)
}

MovingRocks.prototype.draw = function () {
    console.log("movingdRocks");
    this.game.ctx.fillStyle = "blue";
    this.drawRect(this.x, this.y * 0.9, this.w * 1 / 7, this.y * 0.05);
    this.game.ctx.fillStyle = "blue";
    this.drawRect(this.x, this.y * 0.7, this.w * 1 / 7, this.y * 0.05);
    this.game.ctx.fillStyle = "blue";
    this.drawRect(this.x, this.y * 0.5, this.w * 1 / 7, this.y * 0.05);
    this.game.ctx.fillStyle = "blue";
    this.drawRect(this.x, this.y * 0.3, this.w * 1 / 7, this.y * 0.05);
    this.game.ctx.fillStyle = "blue";
    this.drawRect(this.x, this.y * 0.2, this.w * 1 / 7, this.y * 0.05);
}



//   Obstacle.prototype.isCollision = function(obj) {
//   }