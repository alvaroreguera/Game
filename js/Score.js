function Score (game){
    this.game = game;
  }
  
  Score.prototype.draw = function () {
    this.game.ctx.font = "30px sans-serif",
    this.game.ctx.fillText("Time: " + this.game.decrement, 950, 100);
  }