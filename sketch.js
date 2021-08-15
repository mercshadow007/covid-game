var path,boy,mask,vacciene,sanitizer,virus;
var pathImg,boyImg,maskImg,vaccieneImg,sanitizerImg,virusImg;
var treasureCollection = 0;
var maskG,vaccieneG,sanitizerG,virusGroup;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  maskImg = loadImage("mask.png");
  vaccieneImg = loadImage("vacciene.png");
  sanitizerImg = loadImage("sanitizer.jpg");
virusImg = loadImage("covid.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(400,600);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(70,580,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
  
maskG=new Group();
vaccieneG=new Group();
sanitizerG=new Group();
virusGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
    createMask();
    createVacciene();
    createSanitizer();
    createVirus();

    if (maskG.isTouching(boy)) {
      maskG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (vaccieneG.isTouching(boy)) {
      vaccieneG.destroyEach();
      treasureCollection=treasureCollection+100;
      
    }else if(sanitizerG.isTouching(boy)) {
      sanitizerG.destroyEach();
      treasureCollection= treasureCollection + 150;
      
    }else{
      if(virusGroup.isTouching(boy)) {
        gameState=END;
        
        boy.addAnimation("SahilRunning",endImg);
        boy.x=200;
        boy.y=300;
        boy.scale=0.6;
        
        maskG.destroyEach();
        vaccieneG.destroyEach();
        sanitizerG.destroyEach();
        virusGroup.destroyEach();
        
        maskG.setVelocityYEach(0);
        vaccieneG.setVelocityYEach(0);
        sanitizerG.setVelocityYEach(0);
        virusGroup.setVelocityYEach(0);
     
    }
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);
  }

}

function createMask() {
  if (World.frameCount % 200 == 0) {
  var mask = createSprite(Math.round(random(50, 350),40, 10, 10));
  mask.addImage(maskImg);
  mask.scale=0.10;
  mask.velocityY = 3;
  mask.lifetime = 150;
  maskG.add(mask);
  }
}

function createVacciene() {
  if (World.frameCount % 530 == 0) {
  var vacciene = createSprite(Math.round(random(50, 350),40, 10, 10));
  vacciene.addImage(vaccieneImg);
  vacciene.scale=0.10;
  vacciene.velocityY = 3;
  vacciene.lifetime = 150;
  vaccieneG.add(vacciene);
}
}

function createSanitizer() {
  if (World.frameCount % 530== 0) {
  var sanitizer= createSprite(Math.round(random(50, 350),40, 10, 10));
  sanitizer.addImage(sanitizerImg);
  sanitizer.scale=0.12;
  sanitizer.velocityY = 3;
  sanitizer.lifetime = 150;
  sanitizerG.add(sanitizer);
  }
}

function createVirus(){
  if (World.frameCount % 200 == 0) {
  var virus = createSprite(Math.round(random(50, 350),40, 10, 10));
  virus.addImage(virusImg);
  virus.scale=0.1;
  virus.velocityY = 3;
  virus.lifetime = 150;
  virusGroup.add(virus);
  }
}