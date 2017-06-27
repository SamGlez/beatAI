function Game(arg) {
  this.columns = arg.columns;
  this.rows = arg.rows;
  this.snake = new arg.Snake();
  this.snakeConstructor = arg.Snake;
  this.cellSize = arg.size /this.rows;
  this.speed = arg.speed;
  this.food = undefined;
  this.drawSnake();
  this.generateFood();
  this.drawFood();

}

Game.prototype.drawSnake = function() {
 var that = this;
 this.snake.size.forEach (function(position, index){
   var unit = $("<div>").addClass("cell snake").css({
     top: position.row * that.cellSize,
     left: position.column * that.cellSize
   });
   if (index === 0 ){
     unit.addClass("head");
   }
   $(".game").append(unit);
 });
};

Game.prototype.drawFood = function () {
  var that = this;
  var unit= $('<div>').addClass("cell food").css({
    top: this.food.row * this.cellSize,
    left: this.food.column * this.cellSize
  });
  $(".game").append(unit);
};

Game.prototype.generateFood = function () {
  do {
    this.food = {
      row: Math.floor(Math.random()* this.rows),
      column: Math.floor(Math.random()* this.columns)
    };
  } while (this.Snake.collidesWith(this.food));
};

Game.prototype.clearSnake = function () {
  $(".game .snake").remove();
};
Game.prototype.clearFood = function () {
  $(".game .food").remove();
};

$(document).ready(function(){
  var game = new Game({
    size: 600,
    columns:50,
    rows: 50,
    speed: 100,
    Snake: Snake
  });
// game.start()
});
