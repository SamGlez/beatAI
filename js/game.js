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
  this.scoreNerd = 0;
  this.scoreRobot = 0;
  this.initialRobot();
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

Game.prototype.initialRobot = function() {
  this.robot.size = [{
      row: 3,
      column: 5
    },
    {
      row: 3,
      column: 4
    },
    {
      row: 3,
      column: 3
    },
    {
      row: 3,
      column: 2
    },
    {
      row: 3,
      column: 1
    }
  ];
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
  } while (this.snake.collidesWith(this.food) && this.robot.collidesWith(this.food && this.snake));

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

Game.prototype.randomDirection = function() {
  var newDirection = "";
  var oldDirection = this.robot.direction;
  var option = Math.random();
  var option2 = Math.random();
  var option3 = Math.random();
  var directionsArray = ["up", "down", "left", "right"];
  if (option < 0, 01 && option2 < 0, 01 && option3 < 0, 01) {
    newDirection = directionsArray[Math.floor(Math.random() * directionsArray.length)];
  } else {
    newDirection = oldDirection;
  }
  this.robot.changeDirection(newDirection);
};

Game.prototype.startRobotGrow = function() {
  var that = this;
  this.intervalRobot = setInterval(function() {
    that.robot.grow();
    that.updateScoreRobot();
  }, 9 * 1000);
};

Game.prototype.collidesWithSnake = function() {
  if ($(".nerd-head").collision(".robot").length > 0) {
    return true;
  }
};



//
Game.prototype.start = function() {
  if (!this.intervalId) {
    this.intervalId = setInterval(this.update.bind(this), 130);
  }
  this.startRobotGrow();
  this.initialRobot();
};



Game.prototype.updateScoreRobot = function() {
  this.scoreRobot += 5;
  $(".score-robot").html(this.scoreRobot);
};

Game.prototype.updateScore = function() {
  this.scoreNerd += 5;
  $(".score-nerd").html(this.scoreNerd);
};

Game.prototype.update = function() {
  this.snake.move(this.rows, this.columns);
  this.robot.move(this.rows, this.columns);
  this.randomDirection();

  if (this.snake.hasEatenFood(this.food)) {
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
    this.generateFood();
    this.drawFood();
    this.generateFood();
    this.drawFood();
    this.updateScore();


  }

  if (this.collidesWithSnake()) {
    alert('Oh, AI replaced you. If you want to continue in the DIGITAL ERA...see you soon in Ironhack.');
    this.stop();
  }

  if (this.scoreRobot === 100) {
    alert('Oh, AI replaced you. If you want to continue in the DIGITAL ERA...see you soon in Ironhack.');
    this.stop();
  }

  if (this.scoreNerd === 100) {
    alert('WELCOME TO THE DIGITAL AGE. Digital Skills powered by Ironhack.');
    this.stop();
  }


  if (this.snake.hasEatenItself()) {
    alert('Oh, AI replaced you. If you want to continue in the DIGITAL ERA...see you soon in Ironhack.');
    this.stop();
  }

  this.clearSnake();
  this.clearRobot();
  this.drawSnake();
  this.drawRobot();
};

Game.prototype.stop = function() {
  console.log("Game stopped");
  if (this.intervalId) {
    clearInterval(this.intervalId);
    this.intervalId = undefined;
    clearInterval(this.intervalRobot);
    this.intervalRobot = undefined;
    this.timeoutRobot = undefined;
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
    size: 620,
    columns: 23,
    rows: 10,
    speed: 2,
    Snake: Snake,
    Robot: Snake
  });
  game.start();
});
