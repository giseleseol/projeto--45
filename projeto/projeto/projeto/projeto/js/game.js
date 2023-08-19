class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
    player1 = createSprite(200,500);
    player1.addImage("player1",player_img);
    
    player2 = createSprite(800,500);
    player2.addImage("player2", player_img);
    players=[player1,player2];

        }
    
    play(){
        
                form.hide();

                Player.getPlayerInfo();
                player.getPlayerAtEnd();
                 image(back_img, 0, 0, 1000, 800);
                 var x =100;
                 var y=200;
                 var index =0;
                 drawSprites();
                 for(var plr in allPlayers){
                    
                    
                     index = index+1;
                     x = 500-allPlayers[plr].distance;
                     y=500;
                     
                     players[index -1].x = x;
                     players[index - 1].y = y;
                       
                     if(index === player.index){
                         
                         fill("red");
                         textSize(20);
                         text(allPlayers[plr].name,x-25, y+25);

                         
                     }
                    
                         textSize(25);
                         fill("white");
                         text("Jogador 1: " +allPlayers.player1.score,50,50);
                        text("Jogador 2: " + allPlayers.player2.score, 50, 100);
                 
                 }
                
                if(player.score>=5){
                    gameState = 2; 
                    player.rank += 1;
                    Player.updatePlayerAtEnd(player.rank);
                    player.update();
                    this.showRank();
                    
                }
                 

                if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
                    player.distance -= 10
                    player.update();
                }
                if (keyIsDown(LEFT_ARROW) && player.index !== null) {
                    player.distance += 10
                    player.update();
                }
            
                 if (frameCount % 20 === 0) {
                     scroll = createSprite(random(100, 1000), 0, 100, 100);
                     scroll.velocityY = 6;
                     var rand = Math.round(random(1,5));
                     switch(rand){
                         case 1: scroll.addImage("scroll 1",scroll_img);
                         break;
                         case 2: scroll.addImage("scroll 2", scroll_img);
                     }
                     scrollGroup.add(scroll);
                     
                 }
                 
                  if (player.index !== null) {
                      for (var i = 0; i < fruitGroup.length; i++) {
                          if (scrollGroup.get(i).isTouching(players)) {
                              scrollGroup.get(i).destroy();
                              player.score =player.score+1;
                              player.update();
                              
                          }
                          
                      }
                  }
                

         
         
        
         

    }
    showRank() {
        alert("Incrível!! Você terminou o jogo! Sua classificação é:" +player.rank)
      }

gameOver() {
    textSize(40)
    fill("white")
 text("FIM DE JOGO",displayWidth/2-400,displayHeight/2-200)
    }
    
    end(){
       console.log("O Jogo Terminou");
       console.log(player.rank)
       this.gameOver();
    }
}
