const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 500;
const horizon = 100;
const GROUND = 383;
const imgSize = 100;


let ninja;
let ninjaAnimR;
let ninjaAnimL;

let canvas;
let bg = [];
let playing = false;
let gameOver = false;

let bomb;
const bombObject = { 
  x: 50,
  y: 0,
  w: imgSize,
  h: imgSize,
  speed: 5,
}

let dart;
const dartObject = { 
  x: 150,
  y: 0,
  w: imgSize,
  h: imgSize,
  speed: 3,
}






function preload() {

  const NinjaRSpriteSheet = loadSpriteSheet("img/NinjaR.png", 64, 64, 6);
  const NinjaLSpriteSheet = loadSpriteSheet("img/NinjaL.png", 64, 64, 6);

  ninjaAnimR = loadAnimation(NinjaRSpriteSheet);
  ninjaAnimL = loadAnimation(NinjaLSpriteSheet);
  ninja = createSprite(CANVAS_WIDTH / 2, GROUND, 64, 64);
  ninja.moveSpeed = 6;

  bombObject.image = loasImage("img/bomb.png");
  dartObject.image = loadImage("img/dart.png");

}

function setup() {
  canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  bg = loadImage('img/background.png');
  ninja.addAnimation("moveR", ninjaAnimR);
  ninja.addAnimation("moveL", ninjaAnimL);
  ninja.addImage("still", loadImage("img/Ninja-1.png"));
  ninja.setDefaultCollider()
}



function draw() {

  background(bg);
  if(playing){
    update(ninja);
  } else {
    drawGameIntro();}
}
  

function  drawGameIntro(){
  fill(252, 223, 0);
  textSize(50);
  text('click mouse to start', 100 ,100);
}

function mousePressed(){
  playing = true;
}


function drawBomb(bombObject) {

  if(bombObject.y < 0  || bombObject.y > height - bombObject.h){
    bombObject.speed *= -1;
  }
  bombObject.y += bombObject.speed;

  image(bombObject.image, bombObject.x, bombObject.y, bombObject.w, bombObject.h);

  
}

function drawDart(dartObject){
  
  if(dartObject.y < 0  || dartObject.y > height - dartObject.h){
    dartObject.speed *= -1;
  }

  dartObject.y += dartObject.speed;
  
  image(dartObject.image, dartObject.x, dartObject.y, dartObject.w, dartObject.h);

}



function update(object) {
  if (keyDown("left") || keyDown("right")) {
    if (keyDown("left")) {
      object.addSpeed(2, 180);
      object.mirrorX(-1);
    }
    if (keyDown("right")) {
      object.addSpeed(2, 0);
      object.mirrorX(1);
    }
  } else {
    object.setSpeed(0);
  }
  drawObject(object);
}



function drawObject(object) {
  if (object.getSpeed() > 0.0001) {
    object.changeAnimation("moveR");
  } else {
    object.changeImage("still");
  }
  ninja.limitSpeed(ninja.moveSpeed);
  drawSprite(object);
}






