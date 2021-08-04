var boy, boy_running;
var path, path_travelling;
var invisibleground1, invisibleground2;
var power, power1Image
var hole, hole1Image;
var treasureCollection = 0;
var SERVE = -1;
var PLAY = 1;
var END = 0;
var gameState = SERVE;
var gameOver, gameOverImg;
var begin, beginImg

function preload(){
  //pre-load images
  boy_running = loadAnimation("Runner-1.png", "Runner-2.png");
  path_travelling = loadAnimation("Road.png");
  power1Image = loadAnimation("power.png");
  hole1Image = loadAnimation("hole.PNG")
  boyImg = loadAnimation("Runner-1.png");
  gameOverImg = loadImage("gameOver.png");
  beginImg = loadImage("begin.png");
}

function setup(){
  createCanvas(400,700);

  //create sprites here
  path = createSprite(200,200,10,400);
  path.addAnimation("running", path_travelling);

  boy = createSprite(350,550,10,10);
  boy.addAnimation("running", boy_running);
  boy.scale=0.09;

  invisibleground1 = createSprite(0,250,10,700);  
  invisibleground1.visible = true;
  
  invisibleground2 = createSprite(400,250,10,700);
  invisibleground2.visible = true;
  
  gameOver = createSprite(200,200);
  gameOver.addImage( "running", gameOverImg);
  gameOver.visible = false;
  gameOver.scale = 0.5; 

  begin = createSprite(200,300,50,50)
  begin.addImage("running", beginImg)
  begin.visible = false;
  begin.scale = 0.5;

  holeGroup = new Group();
  powerGroup = new Group();
  
} 

function draw() { 
  background(180);
if (gameState === SERVE) {
  begin.visible = true;

  textSize(20);
  fill(255);
  fill("blue");
  text("PRESS SPACE TO START THE GAME",200,350);
  boy.visible = false;

  if (keyWentDown("space")) {
    begin.visible = false;
    gameState = PLAY;
  }
}
  if (gameState === PLAY) {
   
   boy.visible = true;
    boy.x=World.mouseX;
    path.velocityY=4;

    boy.collide(invisibleground2);
    boy.collide(invisibleground1);
  
    boy.setCollider("circle",0,0,550);
    boy.debug = true;
  
    if(path.y > 400){
    path.y = height/2;
    }
  
  if (powerGroup.isTouching(boy)) {
    powerGroup.destroyEach();
    treasureCollection = treasureCollection + 150; 
  }
    boy.collide(invisibleground1);
    boy.collide(invisibleground2);
    createPower();
    createHole();

    if (holeGroup.isTouching(boy)) {
      holeGroup.destroyEach();
      gameState = END
    }
  
  }

if (gameState === END) {
   
  boy.destroy();
  path.velocityY = 0;
  
  gameOver.visible = true;
}
  drawSprites();
   
  textSize(20);
  fill(255);
  fill("blue");
  text("Treasure: "+ treasureCollection,200,30);

}

function createPower() {
  if (frameCount % 410 == 0) {
    power = createSprite(Math.round(random(20,380)));
  power.addAnimation("running", power1Image)
  power.scale = 0.3;
  power.velocityY = 3;
  powerGroup.add(power);
  }
}

function createHole() {
  if (frameCount % 210 == 0) {
    hole = createSprite(Math.round(random(20,380)));
  hole.addAnimation("running", hole1Image)
  hole.scale = 0.5;
  hole.velocityY = 3;
  holeGroup.add(hole);  
  }
  
  
}
