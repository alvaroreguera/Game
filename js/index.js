window.onload = function() {
    var game = new Game("canvas");
    
    document.getElementById("start")
      .addEventListener("click", game.start.bind(game));
      
    document.getElementById("stop")
      .addEventListener("click", game.stop.bind(game));
  }