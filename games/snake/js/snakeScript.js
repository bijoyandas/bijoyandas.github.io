  var ctx = document.getElementById('ctx').getContext('2d');
  ctx.font = '30px Calibri';
  ctx.fillText('Click me to Start the Game',90,200);
  var WIDTH = 500;
  var HEIGHT = 500;
  var score,eaten,lastSnake,snakeList,foodList,direction;
  var intervalVar;
  var snake = {
    height:10,
    width:10,
    color:'blue'
  };

  var food = {
    x:100,
    y:100,
    height:10,
    width:10,
    color:'orange'
  };

  document.getElementById('ctx').onmousedown = function() {
    startGame();
  }

  document.onkeydown = function(event) {
    if(event.keyCode === 37 && direction!=2)
		  direction=0;
    else if (event.keyCode == 38 && direction!=3)
      direction=1;
    else if (event.keyCode == 39 && direction!=0)
      direction=2;
    else if (event.keyCode == 40 && direction!=1)
      direction=3;
  }

  testCollisionRect = function(rect1,rect2){
    return ((rect1.x <= rect2.x + rect2.width)
		&& (rect2.x <= rect1.x + snake.width)
		&& (rect1.y <= rect2.y + rect2.height)
		&& (rect2.y <= rect1.y + snake.height));
  }

  testCollisionSnake = function(snake1,snake2) {
    return ((Math.abs(snake1.x - snake2.x)<5)
    && ((Math.abs(snake1.y - snake2.y)<5)));
  }

  drawSnake = function(s,i) {
    ctx.save();
    if (i==0) {
      ctx.fillStyle = 'red';
      ctx.fillRect(s.x-snake.width,s.y-snake.height,snake.width,snake.height);
    }
    else {
	    ctx.fillStyle = snake.color;
      ctx.fillRect(s.x-snake.width,s.y-snake.height,snake.width,snake.height);
    }

	  ctx.restore();
  }

  drawFood = function(f,i) {
    ctx.save();
	  ctx.fillStyle = f.color;
	  ctx.fillRect(f.x-f.width,f.y-f.height,f.width,f.height);
	  ctx.restore();
  }


  updateSnakeList = function() {
    for(var i=snakeList.length-1;i>=0;i--) {
      if (i==0)
        lastSnake = snakeList[i];
      if (direction == 0) {
        if (i==0) {
          snakeList[i].x = snakeList[i].x - 5;
        }
        else {
          snakeList[i].x = snakeList[i-1].x;
          snakeList[i].y = snakeList[i-1].y;
        }
      }
      if (direction == 1) {
        if (i==0) {
          snakeList[i].y = snakeList[i].y - 5;
        }
        else {
          snakeList[i].x = snakeList[i-1].x;
          snakeList[i].y = snakeList[i-1].y;
        }
      }
      if (direction == 2) {
        if (i==0) {
          snakeList[i].x = snakeList[i].x + 5;
        }
        else {
          snakeList[i].x = snakeList[i-1].x;
          snakeList[i].y = snakeList[i-1].y;
        }
      }
      if (direction == 3) {
        if (i==0) {
          snakeList[i].y = snakeList[i].y + 5;
        }
        else {
          snakeList[i].x = snakeList[i-1].x;
          snakeList[i].y = snakeList[i-1].y;
        }
      }
    }
  }

  checkSnakePosition = function() {
    if (snakeList[0].x>500)
      snakeList[0].x = 0;
    if (snakeList[0].y>500)
      snakeList[0].y = 0;
    if (snakeList[0].x < 0)
      snakeList[0].x = 500;
    if (snakeList[0].y < 0)
      snakeList[0].y = 500;
  }

  isGameOver = function() {
    for (i in snakeList) {
      if (i==0)
        continue;
      if (testCollisionSnake(snakeList[0],snakeList[i]))
      {
        clearInterval(intervalVar);
        return;
      }
    }
  }

  updateSnakePosition = function() {
    ctx.clearRect(0,0,WIDTH,HEIGHT);
    while (eaten) {
      food.x = Math.random()*485+5;
      food.y = Math.random()*485+5;
      foodList[0] = food;
      eaten = false;
    }
    foodList.forEach(drawFood);
    snakeList.forEach(drawSnake);
    if (testCollisionRect(snakeList[0],foodList[0])) {
      score += 1;
      foodList = [];
      eaten = true;
      if (direction == 0) {
        var newX = lastSnake.x-5;
        var newY = lastSnake.y;
        snakeList.unshift({x:newX,y:newY});
        }
      if (direction == 1) {
        var newX = lastSnake.x;
        var newY = lastSnake.y-5;
        snakeList.unshift({x:newX,y:newY});
      }
      if (direction == 2) {
        var newX = lastSnake.x+5;
        var newY = lastSnake.y;
        snakeList.unshift({x:newX,y:newY});
      }
      if (direction == 3) {
        var newX = lastSnake.x;
        var newY = lastSnake.y+5;
        snakeList.unshift({x:newX,y:newY});
      }
    }
    isGameOver();
    checkSnakePosition();
    updateSnakeList();
    ctx.fillText('Score: ' + score,370,30);
  }
  startGame = function() {
    score = 0;
    eaten = true;
    lastSnake = {x:999,y:999};
    snakeList = [{x:220,y:200},{x:210,y:200},{x:200,y:200}];
    foodList = [];
    direction = 99;
    intervalVar = setInterval(updateSnakePosition,40);
  }
  //drawFood(food);
