//Create variables here


var dog,dogImg,happyDogImg,database,foodS,foodStock;
var feed,addFood;
var lastFed,fedTime,currentTime;
var foodObj,food;
var garden,washroom,bedroom;
var gameState,readState;


function preload()
{
  //load images here
  dogImg = loadImage("./images/dogImg.png");
  happyDogImg = loadImage("./images/dogImg1.png");
  garden=loadImage("./images/Garden.png");
  washroom=loadImage("./images/Wash Room.png");
  bedroom=loadImage("./images/Bed Room.png");

}

function setup() {
  createCanvas(1000, 500);
  database=firebase.database();

  foodObj=new Food();

  feed=createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  dog=createSprite(800,200,150,150);
  dog.addImage("happy",happyDogImg);
  dog.addImage("dog",dogImg);
  dog.scale=0.3;

  foodStock=database.ref('food');
  foodStock.on("value",readStock);

  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val()
  });


}


function draw() {  
  background(46,139,87);
  //foodObj.display();

  // if(foodS!==undefined){

    fedTime=database.ref('FeedTime');
    fedTime.on("value",function(data){
      lastFed=data.val();
    })



    fill(255,255,254);
    textSize(15);
    if(lastFed>=12){
      var t=lastFed%12;
      if(t===0){
        text("Last Feed: 12PM",350,30);
      }
      else{
        text("Last Feed: "+ t + "PM",350,30);
      }
      
    }
    else if(lastFed===0){
      text("Last Feed: 12AM ",350,30);
    }
    else{
      text("Last Feed: "+ lastFed + "AM",350,30);
    }
  
  //add styles here
 // dog.display();
  
  //text("food remaining: "+ foodS,200,50);
  // if(keyWentDown(UP_ARROW)){
  //   writeStock(foodS);
  //    dog.addImage(happyDogImg);
  // }
  // if(keyWentUp(UP_ARROW)){
  //   dog.addImage("dog",dogImg);
  // }
  currentTime=hour();
  if(currentTime===(lastFed+1)){
    update("Playing");
    foodObj.garden();
  }
  else if(currentTime===(lastFed+2)){
    update("Sleeping");
    foodObj.bedRoom();

  }
  else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
    foodObj.washRoom();
  }
  else{
    update("Hungry");
    foodObj.display();
  }
  if(gameState!=="Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }
  else{
    feed.show();
    addFood.show();
    dog.addImage(dogImg);
  }
  drawSprites();
}
  



function readStock(data){
foodS=data.val();
foodObj.updateFoodStock(foodS);

}

function writeStock(foodS){
  if(foodS<=0){
    foodS=0;
  }
  else{
    foodS=foodS-1;
  }
  database.ref('/').update({
    food:foodS
  });
    
  }

  function feedDog(){
    dog.addImage("happy",happyDogImg);
  
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    
    database.ref('/').update({
      food:foodObj.getFoodStock(),
      FeedTime:hour(),
      gameState:"Hungry"  
    });
  }

  function addFoods(){
   
    
    foodS++;
    database.ref('/').update({
      food:foodS
    });
    dog.addImage("dog",dogImg)
  }

  function update(state){
    database.ref('/').update({
      gameState:state
    });
  }





