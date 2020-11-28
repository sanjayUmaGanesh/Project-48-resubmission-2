// Writing Variables

var player,score, bricksG, bricks,bomb,bombG,stars,starG,stand,edges,gameover,goimg,entities;
var gameState = "play";

function preload(){
  //loading Images and Animations

  img = loadImage("Mario stop.jpg");
  bg1img = loadImage("bg2.png")
  brickimg = loadImage("brick.png");
  bombimg = loadImage("bomb3.png");
  starimg = loadImage("star.png");
  goimg = loadImage("gameover.png")
}
function setup() {
  //creating the canvas and edges

  createCanvas(windowWidth, windowHeight);
  edges = createEdgeSprites(); 

  // creating Mario 

  player = createSprite(50,0,10,10);
  player.addImage(img);
  player.scale = 0.3

  // creating the bricks bombs and stars group

  brickG = new Group();
  bombG = new Group();
  starG = new Group();
  entities = new Group();

  // creating score

  score = 0 

  // gameover sprite 

  gameover = createSprite(windowWidth/2,windowHeight/2,10,10);
  gameover.addImage(goimg);
  gameover.visible = false;
  
}
function draw() {
  // styling background and edges

  background("white");
  player.bounceOff(edges[0]);
  player.bounceOff(edges[1]);
  player.bounceOff(edges[2]);

  // describing the play State

  if(gameState === "play"){

     // spawning the bricks,bombs and stars
    spawnstars()
    spawnBricks();
    spawnBombs(); 

    //creating gravity in a line!

    player.velocityY += 0.8
    
    // Creating jump function against gravity

    if(keyWentDown("space")){
      player.velocityY = -10;
    }
    
    // moving Mario right

    if(keyDown("right_arrow")){
      player.x += 5;
    }
   
    // moving Mario left

    if(keyDown("left_arrow")){
      player.x -= 5;
    }
  
    // making mario Stand on the brick without breaking it

    if(player.collide(brickG)){
      player.velocityY = 0;
    } 

    // increasing difficulty

    if(frameCount % 120 === 0){
      entities.velocityX += 40;
    }

    // score function 

    if(player.isTouching(starG)){
      score += 10;
      kill("g", starG)
    }

    // creating the end conditions

    if(player.isTouching(bombG) || player.y > windowHeight){
      gameState = "end";
      console.log("touching")
    }
}

  //defining end state

if(gameState === "end"){

  //making the bricks,player and stars fall if gameover

  brickG.setVelocityYEach(20)
  starG.setVelocityYEach(20);
  player.velocityY = 20

//destroying bombs

  kill("G", bombG);
  

  // displaying gameover in end

  gameover.visible = true;

  // restarting the game
  if(keyDown("r")){
    gameState = "play"
    score = 0
    gameover.visible = false;
    player.x = 50
    player.y = 10
  }
  }

// Other elements

fill("red");
textSize(20)
text("Score: "+score, 210,30);
drawSprites();

}

// Spawning functions

function spawnBricks(){

  // spawning them hundredth frame

  if(frameCount % 100 === 0){

    // brick sprites

     bricks = createSprite(windowWidth,Math.round(random(windowHeight-400,windowHeight-100)));
     bricks.addImage(brickimg)
     bricks.shapeColor = "brown"
     bricks.velocityX = -8;
     brickG.add(bricks);
     entities.add(bricks)
  }
}
function spawnBombs(){

  // spawning them two hundredth frame

  if(frameCount % 200 === 0){

    // bomb sprites

    bomb = createSprite(windowWidth,Math.round(random(windowHeight-400,windowHeight-100)));
    bomb.addImage(bombimg)
    bomb.velocityX = -8;
    bombG.add(bomb);
    entities.add(bomb)
  }
}
function spawnstars(){

  // spawning them three hundredth frame

  if(frameCount % 300 === 0){

    // star sprites

    stars = createSprite(windowWidth,Math.round(random(windowHeight-500,windowHeight-10)));
    stars.addImage(starimg)
    starG.scale = 0.4;
    stars.velocityX = -8;
    starG.add(stars);
    entities.add(stars)
  }
}

//the kill function

function kill(Type,Group){
  if(Type === "G" || Type === "g")
    Group.destroyEach();
  if(Type=== "S" || Type === "s")
    Group.destroy();
}

