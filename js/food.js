class Food{
    constructor(){
        this.image=loadImage("Milk.png");
        this.foodStock=0;
        this.lastFed;
    }
     
    getFoodStock(){
        return this.foodStock;
    //     var getFood= database.ref('food');
    //    getFood.on("value",function(data){
    //         this.foodStock=data.val();
    //     });

    }
    updateFoodStock(state){
        // database.ref('/').update({
        //     food:state
        // });
    this.foodStock=state;
    }
    
                                                                                                       
    deductFoodStock(){
        if(this.foodStock>0){
            this.foodStock=this.foodStock-1;
          }
          else{
            this.foodStock=0;
          }
        //   database.ref('/').update({
        //     food:foodS
        //   });
            
          }
          getFedTime(lastFed){
            this.lastFed=lastFed;
          }

          display(){
            var x=80,y=100;

            imageMode(CENTER);
            image(this.image,720,220,70,70);

            if(this.foodStock!=0){
                for(var i=0;i<this.foodStock;i++){
                    
                    if(i%10===0){
                        x=80;
                        y=y+50;
                    }

                    image(this.image,x,y,50,50);
                    x=x+30;
                   
                }
            }
          }

          bedRoom(){
            background(bedroom,550,500);
          
          }
          washRoom(){
            background(washroom,550,500);
          
          }
          garden(){
            background(garden,550,500);
          
          }
        
}