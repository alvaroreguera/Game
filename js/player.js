function Player(game) {
    this.RIGHT_KEY = 39;
    this.TOP_KEY = 38;
    this.LEFT_KEY = 37;
    this.vy = 10;
    this.vx = 5;
    this.vz = 5;
    this.game = game;
    this.x0 = this.game.canvas.width * 0.15
    this.x = this.x0
    this.y0 = this.game.canvas.height * 0.98; //limite inferior
    this.y = this.y0; //posicion actual de mario
    this.radius = 10; // Arc radius
    this.startAngle = 0; // Starting point on circle
    this.endAngle = Math.PI * 2; // End point on circle
this.setListeners();
        // this.img = new Image();
    // this.img.src = "./img/player.png";
        // this.width = 80;
    // this.height = 100;
    // this.animateImg();
}

Player.prototype.setListeners = function() {
    document.onkeydown = function(event) {
      var d = 5;
      
      switch(event.keyCode) {
        case this.RIGHT_KEY:
        console.log("derecha");
          this.x += d;
          break;
        case this.LEFT_KEY:
          this.x -= d;
          break;
        case this.TOP_KEY:
          this.y -= d;
          break;
        case this.BOTTOM_KEY:
          this.y += d;
          break;
      }
  
    }.bind(this);
  };

Player.prototype.draw = function () {
    console.log("Pintando");
    this.game.ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
    this.game.ctx.strokeStyle = "black";
    this.game.ctx.fillStyle = "blue";
    this.game.ctx.fill();
    this.game.ctx.stroke();
    this.game.ctx.closePath();

};

    // Player.prototype.move = function() {
    //     var gravity = 0.30;
      
    //     if (this.y >= this.y0) {
    //       this.vy = 1;
    //       this.y = this.y0;
    //     } else {
    //       this.vy += gravity;
    //       this.y += this.vy;
    //     }
    //   }
  




