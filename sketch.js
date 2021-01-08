
var monkey , monkey_running, monkey_standing, jumpTime;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;
var bananaLoader, obstacleLoader;
var END = 0, PLAY = 1, gameState = PLAY;
var SizeM = 0;
var score = 0;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas (500, 300)
  
  ground = createSprite (500,295,1000,30)
  ground.shapeColor = "lime";
  monkey = createSprite (50,240,10,10);
  monkey.addAnimation("running", monkey_running)
  monkey.scale = 0.1;
  jumpTime = 0;
  
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
}


function draw() {
  background("cyan")
  drawSprites();
  //PLAY
  if (gameState == PLAY){
    //score
    
    stroke("black")
    strokeWeight(3)
    textSize(20)
    fill("white")
    text ("Score: "+score, 200, 25)
  //gravity
  monkey.collide(ground);
  monkey.y = monkey.y + 7;
  
  //jump
  if (keyDown("space") && monkey.y >= 240){
      jumpTime = -15;
      monkey.velocityY = jumpTime;
      }
  if (monkey.y <= 100){
    jumpTime = 0;
    monkey.velocityY = jumpTime;
  }
  
    //bananas
  bananaLoader = Math.round(random(1,100))
  if (bananaLoader == 100){
    createBanana();
  }
  
    //obstacles
  obstacleLoader = Math.round(random(1,90))
   if (obstacleLoader == 90){
    createObstacle();
  }
    
    //Size
    if (monkey.isTouching(obstacleGroup)){
      obstacleGroup.destroyEach();
      SizeM = SizeM - 5;
    }
    
    if (monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
      score = score + 1;
      SizeM = SizeM + 5;
    }
    
    switch(SizeM){
        case 5: monkey.scale = 0.1;
        break;
        case 10: monkey.scale = 0.11;
        break;
        case 15: monkey.scale = 0.12;
        break;
        case 20: monkey.scale = 0.13;
        break;
        case 25: monkey.scale = 0.14;
        break;
        default: break;
    }
  }
  
  /*END
  if (gameState == END){
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    textSize(30)
    fill("black")
    text("Game Over!", 175, 150)
    
  }*/
  
}

function createBanana(){
  banana = createSprite (550,100,100,100);
  banana.addImage(bananaImage)
  banana.scale = 0.1;
  banana.velocityX = -5;
  banana.lifetime = 200;
  
  FoodGroup.add(banana);
}

function createObstacle(){
  obstacle = createSprite (550,270,10,10);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.1;
  obstacle.velocityX = -6;
  obstacle.lifetime = 200;
  obstacleGroup.add(obstacle);
}




