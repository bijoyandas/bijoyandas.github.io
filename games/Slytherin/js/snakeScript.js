  var ctx = document.getElementById('ctx').getContext('2d');
  ctx.font = '30px Calibri';
  ctx.fillText('Click me to Start the Game',330,300);
  var WIDTH = 1000;
  var HEIGHT = 600;
  var lastSnake1,lastSnake2,snakeList1,snakeList2,foodList,direction1,direction2;
  var intervalVar;

  var snake1 = {
    height:10,
    width:10,
    color:'#01B2FF'
  };

  var snake2 = {
    height:10,
    width:10,
    color:'#FB1B04'
  };

  var food = {
    height:10,
    width:10,
    color:'orange'
  };

  document.getElementById('ctx').onmousedown = function() {
    startGame();
  }

  document.onkeydown = function(event) {
    event.preventDefault();
    if(event.keyCode == 37)
		  direction1=0;
    if (event.keyCode == 38)
      direction1=1;
    if (event.keyCode == 39)
      direction1=2;
    if (event.keyCode == 40)
      direction1=3;
    if(event.keyCode == 65)
  	  direction2=0;
    if (event.keyCode == 87)
      direction2=1;
    if (event.keyCode == 68)
      direction2=2;
    if (event.keyCode == 83)
      direction2=3;

  }

  testCollisionRect = function(rect1,rect2){
    return ((rect1.x <= rect2.x + food.width)
		&& (rect2.x <= rect1.x + snake1.width)
		&& (rect1.y <= rect2.y + food.height)
		&& (rect2.y <= rect1.y + snake1.height));
  }

  testCollisionSnake = function(snake1,snake2) {
    return ((Math.abs(snake1.x - snake2.x)<6)
    && ((Math.abs(snake1.y - snake2.y)<6)));
  }

  drawSnake1 = function(s,i) {
    ctx.save();
    if (i==0) {
      ctx.fillStyle = 'black';
      ctx.fillRect(s.x-snake1.width,s.y-snake1.height,snake1.width,snake1.height);
    }
    else {
	    ctx.fillStyle = snake1.color;
      ctx.fillRect(s.x-snake1.width,s.y-snake1.height,snake1.width,snake1.height);
    }
	  ctx.restore();
  }

  drawSnake2 = function(s,i) {
    ctx.save();
    if (i==0) {
      ctx.fillStyle = 'black';
      ctx.fillRect(s.x-snake2.width,s.y-snake2.height,snake2.width,snake2.height);
    }
    else {
	    ctx.fillStyle = snake2.color;
      ctx.fillRect(s.x-snake2.width,s.y-snake2.height,snake2.width,snake2.height);
    }

	  ctx.restore();
  }

  drawFood = function(f,i) {
    ctx.save();
	  ctx.fillStyle = food.color;
	  ctx.fillRect(f.x-food.width,f.y-food.height,food.width,food.height);
	  ctx.restore();
  }

    updateSnakeList1 = function() {
      for(var i=snakeList1.length-1;i>=0;i--) {
        if (i==0)
          lastSnake1 = snakeList1[i];
        if (direction1 == 0) {
          if (i==0) {
            snakeList1[i].x = snakeList1[i].x - 5;
          }
          else {
            snakeList1[i].x = snakeList1[i-1].x;
            snakeList1[i].y = snakeList1[i-1].y;
          }
        }
        if (direction1 == 1) {
          if (i==0) {
            snakeList1[i].y = snakeList1[i].y - 5;
          }
          else {
            snakeList1[i].x = snakeList1[i-1].x;
            snakeList1[i].y = snakeList1[i-1].y;
          }
        }
        if (direction1 == 2) {
          if (i==0) {
            snakeList1[i].x = snakeList1[i].x + 5;
          }
          else {
            snakeList1[i].x = snakeList1[i-1].x;
            snakeList1[i].y = snakeList1[i-1].y;
          }
        }
        if (direction1 == 3) {
          if (i==0) {
            snakeList1[i].y = snakeList1[i].y + 5;
          }
          else {
            snakeList1[i].x = snakeList1[i-1].x;
            snakeList1[i].y = snakeList1[i-1].y;
          }
        }
      }
    }

      updateSnakeList2 = function() {
        for(var i=snakeList2.length-1;i>=0;i--) {
          if (i==0)
            lastSnake2 = snakeList2[i];
          if (direction2 == 0) {
            if (i==0) {
              snakeList2[i].x = snakeList2[i].x - 5;
            }
            else {
              snakeList2[i].x = snakeList2[i-1].x;
              snakeList2[i].y = snakeList2[i-1].y;
            }
          }
          if (direction2 == 1) {
            if (i==0) {
              snakeList2[i].y = snakeList2[i].y - 5;
            }
            else {
              snakeList2[i].x = snakeList2[i-1].x;
              snakeList2[i].y = snakeList2[i-1].y;
            }
          }
          if (direction2 == 2) {
            if (i==0) {
              snakeList2[i].x = snakeList2[i].x + 5;
            }
            else {
              snakeList2[i].x = snakeList2[i-1].x;
              snakeList2[i].y = snakeList2[i-1].y;
            }
          }
          if (direction2 == 3) {
            if (i==0) {
              snakeList2[i].y = snakeList2[i].y + 5;
            }
            else {
              snakeList2[i].x = snakeList2[i-1].x;
              snakeList2[i].y = snakeList2[i-1].y;
            }
          }
        }
      }


  checkSnakePosition1 = function() {
    if (snakeList1[0].x>1000)
      snakeList1[0].x = 0;
    if (snakeList1[0].y>600)
      snakeList1[0].y = 0;
    if (snakeList1[0].x < 0)
      snakeList1[0].x = 1000;
    if (snakeList1[0].y < 0)
      snakeList1[0].y = 600;
  }



  checkSnakePosition2 = function() {
    if (snakeList2[0].x>1000)
      snakeList2[0].x = 0;
    if (snakeList2[0].y>600)
      snakeList2[0].y = 0;
    if (snakeList2[0].x < 0)
      snakeList2[0].x = 1000;
    if (snakeList2[0].y < 0)
      snakeList2[0].y = 600;
    }

  isGameOver = function() {
    if (snakeList1.length >= 2*snakeList2.length) {
      for(i in snakeList2){
        if (testCollisionSnake(snakeList1[0],snakeList2[i])){
          clearInterval(intervalVar);
          ctx.fillText('Blue Snake Wins!',380,300);
          return;
        }
      }
    }
    else if (snakeList1.length > snakeList2.length) {
      for(i in snakeList1){
        for (j in snakeList2) {
          if (testCollisionSnake(snakeList1[i],snakeList2[j])){
            if (i==0) {
              snakeList2.splice(snakeList2.length-1,1);
              return;
            }
            snakeList1.splice(snakeList1.length-1,1);
            return;
          }
        }
      }
    }
    else if (snakeList2.length >= 2*snakeList1.length) {
      for(i in snakeList1){
        if (testCollisionSnake(snakeList2[0],snakeList1[i])){
          clearInterval(intervalVar);
          ctx.fillText('Red Snake Wins!',380,300);
          return;
        }
      }
    }
    else if (snakeList2.length > snakeList1.length) {
      for(i in snakeList2) {
        for(j in snakeList1) {
          if (testCollisionSnake(snakeList2[i],snakeList1[j])){
            if (i==0) {
              snakeList1.splice(snakeList1.length-1,1);
              return;
            }
            snakeList2.splice(snakeList2.length-1,1);
            return;
          }
        }
      }
    }
  }

  updateSnakePosition = function() {
    ctx.clearRect(0,0,WIDTH,HEIGHT);
    while (foodList.length<3) {
      foodList.push({x:Math.random()*485+5,y:Math.random()*485+5});
    }
    foodList.forEach(drawFood);
    snakeList1.forEach(drawSnake1);
    snakeList2.forEach(drawSnake2);
    for (i in foodList) {
      if (testCollisionRect(snakeList1[0],foodList[i])) {
        console.log("Snake1");
        foodList.splice(i,1);
        if (direction1 == 0) {
          var newX = lastSnake1.x-5;
          var newY = lastSnake1.y;
          snakeList1.unshift({x:newX,y:newY});
          }
        if (direction1 == 1) {
          var newX = lastSnake1.x;
          var newY = lastSnake1.y-5;
          snakeList1.unshift({x:newX,y:newY});
        }
        if (direction1 == 2) {
          var newX = lastSnake1.x+5;
          var newY = lastSnake1.y;
          snakeList1.unshift({x:newX,y:newY});
        }
        if (direction1 == 3) {
          var newX = lastSnake1.x;
          var newY = lastSnake1.y+5;
          snakeList1.unshift({x:newX,y:newY});
        }
      }

      for (i in foodList) {
        if (testCollisionRect(snakeList2[0],foodList[i])) {
          console.log("Snake2");
          foodList.splice(i,1);
          if (direction2 == 0) {
            var newX = lastSnake2.x-5;
            var newY = lastSnake2.y;
            snakeList2.unshift({x:newX,y:newY});
            }
          if (direction2 == 1) {
            var newX = lastSnake2.x;
            var newY = lastSnake2.y-5;
            snakeList2.unshift({x:newX,y:newY});
          }
          if (direction2 == 2) {
            var newX = lastSnake2.x+5;
            var newY = lastSnake2.y;
            snakeList2.unshift({x:newX,y:newY});
          }
          if (direction2 == 3) {
            var newX = lastSnake2.x;
            var newY = lastSnake2.y+5;
            snakeList2.unshift({x:newX,y:newY});
          }
        }
      }

    }
    isGameOver();
    checkSnakePosition1();
    checkSnakePosition2();
    updateSnakeList1();
    updateSnakeList2();
    //ctx.fillText('Score: ' + score,370,30);
  }
  startGame = function() {
    lastSnake1 = {x:999,y:999};
    lastSnake2 = {x:999,y:999};
    snakeList1 = [{x:220,y:200},{x:210,y:200},{x:200,y:200}];
    snakeList2 = [{x:420,y:200},{x:410,y:200},{x:400,y:200}];
    foodList = [];
    direction1 = 99;
    direction2 = 99;
    intervalVar = setInterval(updateSnakePosition,40);
  }
  //drawFood(food);
