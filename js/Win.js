function Win(game) {

    this.game = game;
    this.x = this.game.canvas.width/2 + this.game.canvas.width * 0.05;
    this.y = this.game.canvas.height - 30; //posicion actual 
    this.width = 20; 
    this.height = 30; 
    this.color = "red";
// this.img = new Image();
// this.img.src = "./img/player.png";
// this.width = 80;
// this.height = 100;
// this.animateImg();
}

Win.prototype.draw = function () {
    this.game.ctx.fillStyle = this.color;
    this.game.ctx.fillRect(this.x, this.y, this.width, this.height)

};