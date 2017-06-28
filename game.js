function Game(arg) {
  this.rows = arg.rows;
  this.columns = arg.columns;
  this.snake = new arg.Snake();
  this.snakeConstructor = arg.Snake;
  this.robot = new arg.Robot();
 this.robotConstructor = arg.Robot;
  this.cellSize = arg.size / this.rows;
  this.speed = arg.speed;
  this.food = undefined;
  this.scoreNerd= 0;
  this.scoreRobot = 0;
  this.drawRobot();
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
      unit.addClass("nerd-head");
    }
    $(".game").append(unit);
  });
};

Game.prototype.drawRobot = function() {
  var that = this;
  this.robot.size.forEach(function(position, index) {
    var unit = $("<div>").addClass("cell robot").css({
      top: position.row * that.cellSize,
      left: position.column * that.cellSize
    });
    if (index === 0) {
      unit.addClass("robot-head");
    }
    $(".game").append(unit);
  });
};

Game.prototype.clearRobot = function() {
  $(".game .robot").remove();
};

Game.prototype.clearSnake = function() {
  $(".game .snake").remove();
};
Game.prototype.clearFood = function() {
  $(".game .food").remove();
};

Game.prototype.clearScore = function() {
  this.scoreNerd = 0;
  this.scoreRobot = 0;
  $(".score-nerd").html(this.scoreNerd);
  $(".score-robot").html(this.scoreRobot);

};

Game.prototype.generateFood = function() {
  do {
    this.food = {
      row: Math.floor(Math.random() * this.rows),
      column: Math.floor(Math.random() * this.columns)
    };
  } while (this.snake.collidesWith(this.food) || this.robot.collidesWith(this.food && this.snake));

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
        break;
      case 40:
        this.snake.changeDirection('down');
        break;
      case 37:
        this.snake.changeDirection('left');
        break;
      case 39:
        this.snake.changeDirection('right');
        break;
    }
  }.bind(this));
};

Game.prototype.randomDirection= function(){
  var directionsArray = ["up", "down", "left", "right"];
  var rand = directionsArray[Math.floor(Math.random() * directionsArray.length)];
  console.log(rand);
  this.robot.changeDirection(rand);
};

Game.prototype.growRobot = function() {
  if (!this.intervalRobot){
    this.intervalRobot = setInterval(this.robot.grow(), 3000);
    this.updateScoreRobot();
  }
};


//
Game.prototype.start = function() {
  if (!this.intervalId){
    this.intervalId = setInterval(this.update.bind(this), 50);
  }
};



Game.prototype.updateScoreRobot = function () {
  this.scoreRobot += 5;
  $(".score-robot").html(this.scoreRobot);
};

Game.prototype.updateScore = function () {
  this.scoreNerd += 5;
  $(".score-nerd").html(this.scoreNerd);
};

Game.prototype.update = function(){
  this.snake.move(this.rows, this.columns);
  this.robot.move(this.rows, this.columns);
  this.randomDirection();
  this.growRobot();

  if (this.snake.hasEatenFood(this.food)){
      this.snake.grow();
      this.robot.grow();
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

  // if (!this.timeoutId) {
  //   this.growRobot();
  // }
  //
  // if (this.snake.collidesWith(this.robot)){
  //   alert('Game Over');
  //   this.stop();
  // }

  if (this.snake.hasEatenItself()){
    alert('Game Over');
    this.stop();
  }

  this.clearSnake();
  this.clearRobot();
  this.drawSnake();
  this.drawRobot();
};

Game.prototype.stop =  function(){
  console.log("Game stopped");
  if (this.intervalId){
    clearInterval(this.intervalId);
    this.intervalId = undefined;
    clearTimeout(this.timeoutId);
    this.timeoutId = undefined;
    // this.timeoutId = undefined;
    this.snake = new this.snakeConstructor();
    this.robot = new this.robotConstructor();
    this.clearFood();
    this.generateFood();
    this.drawFood();
    this.start();
    this.clearScore();
  }
};

$(document).ready(function() {
  var game = new Game({
    size: 590,
    columns :120,
    rows: 49,
    speed: 400,
    Snake: Snake,
    Robot: Robot
  });
   game.start();
});
