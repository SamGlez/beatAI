function Snake(arg) {
  this.direction = "right";
  this.size = [{
    row: 2,
    column: 5
  }, {
    row: 2,
    column: 4
  }, {
    row: 2,
    column: 3
  }, {
    row: 2,
    column: 2
  }];
}

Snake.prototype.changeDirection = function(newDirection) {
  var that = this;
  if (newDirection === "right" || newDirection === "left") {
    if (that.Direction === "up" || that.Direction === "down") {
      that.direction = newDirection;
      return;
    }
  }
  if (newDirection === "up" || newDirection === "down") {
    if (that.Direction === "left" || that.Direction === "right") {
      that.direction = newDirection;
      return;
    }
  }
};

Snake.prototype.move = function(maxRows, maxColumns) {
  var head = this.size[0];

  switch (this.direction) {
    case "up":
        this.size.unshift({
          row: (head.row - 1+maxRows)% maxRows,
          column: head.column
        });
      break;
    case "down":
    this.size.unshift({
      row: (head.row + 1+maxRows)% maxRows,
      column: head.column
    });

      break;
    case "left":
    this.size.unshift({
      row: head.row,
      column: (head.column - 1 +maxColumns)% maxColumns
    });

      break;
    case "right":
    this.size.unshift({
      row: head.row,
      column: (head.column + 1 +maxColumns)% maxColumns
    });

      break;
  }
  this.previousTail = this.size.pop();
};

Snake.prototype.grow = function () {
  if(this.previousTail){
    this.size.push(this.previousTail);
    this.previousTail = undefined;
  }
};

Snake.prototype.hasEatenFood = function (foodPosition) {
  return this.size[0].row === foodPosition.row && this.size[0].column === foodPosition.column;
};

Snake.prototype.collidesWith = function () {
  return this.size.some(function (element){
    return element.row === position.row && element.column === position.column;
  });
};

Snake.prototype.hasEatenItself = function () {
  return this.size.some(function (element, index, array){
    return (element.row === this.size[0].row && element.column === this.size[0].column && index !== 0);
  });
};
