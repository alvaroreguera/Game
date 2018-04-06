function Win(game) {

    this.game = game;
    this.x = this.game.canvas.width / 2 + this.game.canvas.width * 0.05;
    this.y = this.game.canvas.height - 60; //posicion actual 
    this.width = 20;
    this.height = 30;
    this.color = "red";
    this.img = new Image();
    this.img.src = "images/door.png";
    this.width = 30;
    this.height = 60;
}


Win.prototype.draw = function () {
    this.game.ctx.drawImage(
        this.img,
        0,
        0,
        this.img.width*0.95,
        this.img.height*0.95,
        this.x,
        this.y,
        this.width,
        this.height
    );

};