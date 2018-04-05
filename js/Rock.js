function Rock(game, posX, posY, width, height, color, vx) {
    this.game = game;
    this.posX = posX;
    this.posY = posY;
    this.color = color;
    this.width = width;
    this.height = height;
    this.vx = vx;
    // this.image = new Image();
    // this.image.src = "https://mdn.mozillademos.org/files/222/Canvas_createpattern.png";
    // this.pattern = this.game.ctx.createPattern(this.image, "repeat");
}

Rock.prototype.draw = function () {
     this.game.ctx.fillStyle = this.color;
    this.game.ctx.fillRect(this.posX, this.posY, this.width, this.height);
}

Rock.prototype.move = function () {
    this.posX += this.vx;
    if (this.color == "blue"){
        if(this.posX > this.game.canvas.width / 2 - this.width || this.posX < 0) {
            this.vx *= -1;
        }
    }else if (this.color == "green"){
        if(this.posX + this.width > this.game.canvas.width || this.posX < this.game.canvas.width/2+ this.game.canvas.width*0.05) {
            this.vx *= -1;
        }  
    }
};

Rock.prototype.collidesWith = function (player) {
    if (this.game.player.x < this.posX + this.width &&
        this.game.player.x + this.game.player.radius > this.posX &&
        this.game.player.y < this.posY &&
        this.game.player.y + this.game.player.radius > this.posY
             ) {
        return true;
    }
}