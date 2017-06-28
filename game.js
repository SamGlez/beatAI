function Game(arg) {
  this.rows = arg.rows;
  this.columns = arg.columns;
  this.snake = new arg.Snake();
  this.snakeConstructor = arg.Snake;
  // this.robot = new arg.Robot();
//  this.robotConstructor = arg.Robot;
 this.cellSize = arg.size / this.rows;
  this.speed = arg.speed;
  this.food = undefined;
  this.scoreNerd= 0;
//  this.drawRobot();
  this.drawSnake();
  this.generateFood();
  this.drawFood();
  this.assignKeys();

}

Game.prototype.drawSnake = function() {
  var that = this;
  this.snake.size.forEach(function(position, index) {
    var unit = $("<div>").addClass("cell snake").css({
      top: position.row * that.cellSize,
      left: position.column * that.cellSize
    });
    if (index === 0) {
      unit.addClass("head");
    }
    $(".game").append(unit);
  });
};

// Game.prototype.drawRobot = function() {
//   var that = this;
//   this.robot.size.forEach(function(position, index) {
//     var unit = $("<div>").addClass("cell robot").css({
//       top: position.row * that.cellSize,
//       left: position.column * that.cellSize
//     });
//     if (index === 0) {
//       unit.addClass("head");
//     }
//     $(".game").append(unit);
//   });
// };
//

Game.prototype.clearSnake = function() {
  $(".game .snake").remove();
};
Game.prototype.clearFood = function() {
  $(".game .food").remove();
};

Game.prototype.generateFood = function() {
  do {
    this.food = {
      row: Math.floor(Math.random() * this.rows),
      column: Math.floor(Math.random() * this.columns)
    };
  } while (this.snake.collidesWith(this.food));
};

Game.prototype.drawFood = function() {
  var unit = $('<div>').addClass("cell food").css({
    top: this.food.row * this.cellSize,
    left: this.food.column * this.cellSize
  });
  $(".game").append(unit);
};



Game.prototype.assignKeys = function() {
  $("body").on('keydown', function(e) {
    switch (e.keyCode) {
      case 38:
        this.snake.changeDirection('up');
        console.log(this.snake.direction);
        break;
      case 40:
        this.snake.changeDirection('down');
        console.log(this.snake.direction);
        break;
      case 37:
        this.snake.changeDirection('left');
        console.log(this.snake.direction);
        break;
      case 39:
        this.snake.changeDirection('right');
        console.log(this.snake.direction);
        break;
    }
  }.bind(this));
};

//
Game.prototype.start = function() {
  if (!this.intervalId){
    this.intervalId = setInterval(this.update.bind(this), 50);
  }
};

Game.prototype.updateScore = function () {
  this.scoreNerd += 1;
  $(".score-nerd").html(this.scoreNerd);
};

Game.prototype.update = function(){
  this.snake.move(this.rows, this.columns);

  if (this.snake.hasEatenFood(this.food)){
      this.snake.grow();
      this.clearFood();
      this.generateFood();
      this.drawFood();
      this.generateFood();
      this.drawFood();
      this.generateFood();
      this.drawFood();
      this.generateFood();
      this.drawFood();
      this.updateScore();

  }

  if (this.snake.hasEatenItself()){
    alert('Game Over');
    this.stop();
  }

  this.clearSnake();
  this.drawSnake();
};

Game.prototype.stop =  function(){
  console.log("Game stopped");
  if (this.intervalId){
    clearInterval(this.intervalId);
    this.intervalId = undefined;
    this.snake = new this.snakeConstructor();
    this.clearFood();
    this.generateFood();
    this.drawFood();
    this.start();
  }
};

$(document).ready(function() {
  var game = new Game({
    size: 590,
    columns :120,
    rows: 49,
    speed: 250,
    Snake: Snake
  });
   game.start();
});
