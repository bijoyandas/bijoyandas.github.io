var ctx = document.getElementById('ctx').getContext('2d');
var catcherOne = new Image();
var catcherTwo = new Image();
var catcherThree = new Image();
var catcherFour = new Image();
var background = new Image();
var blood = new Image();
var tileList = [];
var foodList = [];
var tile = new Image();
var food = new Image();
var animation = 0;
var foodTimer = 0;
var gameover = false;
var intervalVar;
var score = 0;
var level = 100;
var foodDrop = [0,50,100,150,200,250,300,350,400,450];
var tileObject = {
	'height':20,
	'width':50
};
var catcher = {
	'x':100,
	'y':350,
	'width':30,
	'height':50,
	'jump':0,
	'onair':false,
	'jumpUnit':5,
	'spd':0,
	'leftPressed':false,
	'rightPressed':false,
	'gravity':10,
	'safe':true
};
var foodObject = {
	'height':50,
	'width':50,
	'spd':3
};

sound = function(src) {
	this.sound = document.createElement("audio");
	this.sound.src = src;
	this.sound.setAttribute("preload", "auto");
	this.sound.setAttribute("controls", "none");
	this.sound.style.display = "none";
	document.body.appendChild(this.sound);
	this.play = function(){
		this.sound.play();
	}
	this.stop = function(){
		this.sound.pause();
	}
}

var eatingSound = new sound("sound/eat.mp3");
var droppingSound = new sound("sound/drop.mp3");			

background.onload = function() {
	blood.onload = function() {
		catcherOne.onload = function() {
			catcherTwo.onload = function() {
				catcherThree.onload = function() {
					catcherFour.onload = function() {
						tile.onload = function() {
							food.onload = function() {
								ctx.drawImage(background,0,0,500,500);
								ctx.strokeStyle = "#FFFFFF";
								ctx.font = "30px Calibri"
								ctx.strokeText("Click here to start the game",80,250);

								drawObject = function(object,x,y,width,height) {
									ctx.drawImage(object,x,y,width,height);
								}

								document.getElementById('ctx').onmousedown = function() {
									if (!gameover) {
										clearInterval(intervalVar);
									}
									startGame();
								}

								document.onkeydown = function(event) {
									event.preventDefault();
									if (event.keyCode == 37 && catcher.x > 0) {
										catcher.spd = -5;
										catcher.leftPressed = true;
									}
									if (event.keyCode == 39 && catcher.x < 500 - catcher.width) {
										catcher.spd = 5;
										catcher.rightPressed = true;
									}
									if (event.keyCode == 38 && !catcher.onair && catcher.y== 350) {
										if (!catcher.onair) {
											catcher.jump = 100;
											catcher.onair = true;
										}
									}

								}

								document.onkeyup = function(event) {
									if (event.keyCode == 37) {
										catcher.leftPressed = false;
									}
									if (event.keyCode == 39) {
										catcher.rightPressed = false;
									}
								}

								food_catcher_collision = function(f) {
									return ((f.x < catcher.x + catcher.width) &&
										(catcher.x < f.x + foodObject.width) &&
										(f.y < catcher.y + catcher.height) &&
										(catcher.y < f.y + foodObject.height));
								}

								food_tile_collision = function(f,t) {
									return ((f.x < t.x + tileObject.width) &&
										(t.x < f.x + foodObject.width) &&
										(f.y < t.y + tileObject.height) &&
										(t.y < f.y + foodObject.height));	
								}

								catcher_tile_collision = function(t) {
									return ((catcher.x <= t.x + tileObject.width) &&
										(t.x <= catcher.x + catcher.width) &&
										(catcher.y + catcher.height <= t.y));
								}

								jump = function() {
									if (catcher.jump > 0 && catcher.onair) {
										catcher.y -= catcher.jumpUnit;
										catcher.jump -= catcher.jumpUnit;
									}
									if (catcher.jump <= 0 && catcher.jump > -100 && catcher.onair) {
										catcher.y += catcher.jumpUnit;
										catcher.jump -= catcher.jumpUnit;
									}
									if (catcher.jump <= -100 && catcher.onair) {
										catcher.onair = false;
									}
								}

								updateCatcherPosition = function() {
									if (catcher.leftPressed && catcher.x > 0) {
										catcher.x += catcher.spd;
									}
									if (catcher.rightPressed && catcher.x < 500 - catcher.width) {
										catcher.x += catcher.spd;	
									}
									if (catcher.y >= 450) {
										catcher.y = 450;
										gameover = true;
										droppingSound.play();
									}
								}

								updateFruitPosition = function() {
									for(var i in foodList) {
										if (foodList[i].y > 500) { 
											foodList.splice(i,1);
										}
										else {
											foodList[i].y += foodObject.spd;
										}
									}
								}

								gameOver = function() {
									ctx.save();
									ctx.globalAlpha = 0.6;
									drawObject(blood,100,100,300,300);
									ctx.globalAlpha = 1.0;
									ctx.strokeStyle = "#FFFFFF";
									ctx.font = "30px Calibri"
									ctx.strokeText("Game Over",180,200);
									ctx.strokeText("Click to restart",160,250);
									ctx.restore();
									clearInterval(intervalVar);
								}

								updatePosition = function() {
									ctx.clearRect(0,0,500,500);
									ctx.drawImage(background,0,0,500,500);
									drawObject(food,440,10,20,20);
									foodTimer++;
									if (foodTimer>level) {
										foodList.push({'x':foodDrop[Math.round(Math.random()*9)],'y':0});
										foodTimer = 0;
									}
									if (gameover) {
										drawObject(catcherThree,catcher.x,470,50,30);
										gameOver();
									}
									else if (catcher.onair) {
										drawObject(catcherFour,catcher.x,catcher.y,catcher.width,catcher.height);
									}
									else if (animation == 0) {
										animation = 1;
										drawObject(catcherOne,catcher.x,catcher.y,catcher.width,catcher.height);
									}
									else if (animation == 1) {
										animation = 0;
										drawObject(catcherTwo,catcher.x,catcher.y,catcher.width,catcher.height);
									}
									for(var i in tileList) {
										drawObject(tile,tileList[i].x,tileList[i].y,tileObject.width,tileObject.height);
									}
									for (var i in foodList) {
										drawObject(food,foodList[i].x,foodList[i].y,foodObject.width,foodObject.height);
									}
									for (var i in foodList) {
										if (food_catcher_collision(foodList[i])) {
											eatingSound.play();
											score++;
											if (score % 2 == 0) 
												level--;
											foodList.splice(i,1);
										}
									}
									for (var i in foodList) {
										for (var j in tileList) {
											if (food_tile_collision(foodList[i],tileList[j])) {
												tileList.splice(j,1);
											}
										}
									}
									if (!catcher.onair) {
										for (var i in tileList) {
											if (catcher_tile_collision(tileList[i])) {
												catcher.safe = true;
												break;
											}
											catcher.safe = false;
										}
										if (!catcher.safe) { 
											catcher.y += catcher.gravity;
										}
									}

									ctx.fillStyle = "#FFFFFF";
									ctx.font = "20px Calibri";
									ctx.fillText(score,465,27);
									ctx.fillText("Level "+(100-level+1),10,27);
									updateFruitPosition();
									updateCatcherPosition();
									jump();
								}

								startGame = function() {
									score = 0;
									level = 100;
									catcher.y = 350;
									catcher.x = 100;
									catcher.onair = false;
									catcher.leftPressed = false;
									catcher.rightPressed = false;
									catcher.safe = true;
									tileList = [];
									foodList = [];
									animation = 0;
									foodTimer = 0;
									gameover = false;
									drawObject(catcherOne,catcher.x,catcher.y,catcher.width,catcher.height);
									for (var i=0;i<=9;i++) {
										tileList.push({'x':i*50,'y':400});
									}
									for(var i=0;i<tileList.length;i++) {
										drawObject(tile,tileList[i].x,tileList[i].y,tileObject.width,tileObject.height);
									}
									animation = 0;
									foodList = [];
									intervalVar = setInterval(updatePosition,10);
								}

							}
							food.src = "images/food.png";
						}
						tile.src = "images/tile.png";
					}
					catcherFour.src = "images/catcher4.png"
				}
				catcherThree.src = "images/catcher3.png";
			}
			catcherTwo.src = "images/catcher2.png";	
		}
		catcherOne.src = "images/catcher1.png";
	}
	blood.src = "images/blood.png"
}
background.src = "images/background.jpg";