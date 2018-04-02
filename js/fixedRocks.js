function FixedRocks(game) {
    this.game = game;
    this.w = game.canvas.width*0.05;
    this.h = this.game.canvas.height*0.9;
    this.x = this.game.canvas.width;
    this.y = this.game.canvas.height;
}

FixedRocks.prototype.drawRect = function (x, y, width, height) {
    this.game.ctx.fillRect(x, y, width, height)
}

FixedRocks.prototype.draw = function () {
    console.log("fixedRocks");
    this.game.ctx.fillStyle = "grey";
    this.drawRect(this.x/2,this.y*0.1,this.w,this.h);
    this.game.ctx.fillStyle = "grey";
    this.drawRect(this.x*1.6/7 ,this.y*0.1,this.x*0.6,this.y*0.05);
    this.game.ctx.fillStyle = "grey";
    this.drawRect(this.x*2.2/7,this.y*0.8,this.x*3/7,this.y*0.05);
    this.game.ctx.fillStyle = "grey";
    this.drawRect(this.x*2.2/7,this.y*0.6,this.x*3/7,this.y*0.05);
    this.game.ctx.fillStyle = "grey";
    this.drawRect(this.x*2.2/7,this.y*0.4,this.x*3/7,this.y*0.05);

}

// this.x*0.5-0.5*this.w