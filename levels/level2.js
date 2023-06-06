/**  
*/
import { Player } from '../player.js';
import { InputHandler } from '../input.js';
import { BackgroundII } from '../background.js';
import { Flying_Sandwich } from '../enemy.js';
import { UI } from '../UI.js';



export class Level2{
    constructor(width,height){
        this.width = width;
        this.height = height;
        this.topMargin = 200;
        this.speed = 0.2;
        this.background = new BackgroundII(this);
        this.player = new Player(this,50);
        this.lastKey = undefined;
        this.input = new InputHandler(this);
        this.ui = new UI(this);
        this.collisions = [];
        this.flying_enemies = [];
        this.enemyTimer = 0;
        this.enemyInterval = 1000;
        this.score = 0;
        this.winningScore = 40;
        this.time = 0;
        this.maxTime = 50000;
        this.levelOver = false;
    }
    reset(){
      this.enemyTimer = 0;
      this.collisions = [];
      this.flying_enemies = []
      this.score = 0;
      this.time = 0;
      this.levelOver = false;
      this.player.restartPlayer();
   }
    update(deltaTime){
       this.time += deltaTime;
       this.background.update();
       this.player.update(deltaTime);
       //handle our charming enemies
       if(this.enemyTimer > this.enemyInterval && !this.levelOver){
          this.enemyTimer = 0;
          this.addFlyingEnemy();
       } else{
          this.enemyTimer += deltaTime;
       }
        
         this.flying_enemies.forEach(enemy => {
            enemy.update(deltaTime);
            if(enemy.markedForDeletion) this.flying_enemies = this.flying_enemies.filter(e => e != enemy); 
         });

         this.flying_enemies.forEach(enemy => {
            enemy.update(deltaTime);
            if(this.checkCollision(this.player,enemy)){
              enemy.markedForDeletion = true;
              this.score++;
            } 
       });
         
       
       //handle collisions
       this.collisions.forEach((collision) => {
          collision.update(deltaTime);
          if(collision.markedForDeletion) this.collisions = this.collisions.filter(c => c != collision);
       })

      
 
       //handle repeat the level or go to the next level
      this.isCompleted();

     
    }
    draw(context){
       this.background.draw(context);
       this.player.draw(context);
       this.flying_enemies.forEach(enemy => {
          enemy.draw(context);
       });
       this.collisions.forEach(collision => {
        collision.draw(context);
     });
      this.ui.floatingTextAppear(context, 2);
      this.ui.floatingWhichLevelTextAppear(context, "TWO - DUSK");
    }
    addFlyingEnemy()
    {
      this.flying_enemies.push(new Flying_Sandwich(this));
    }

    checkCollision(ghost1,ghost2){
        return(  ghost1.x < ghost2.x + ghost2.width &&
            ghost1.x + ghost1.width > ghost2.x &&
            ghost1.y < ghost2.y + ghost2.height &&
            ghost1.height + ghost1.y > ghost2.y)
    }
   

   /* If the player loses they replay the level
   * until they win. If they win, they play the next
   * level. The game has initially five levels planned.
   */
   isCompleted(){
      if(this.time > this.maxTime){ 
         if(this.score < this.winningScore) 
         {
            this.reset();
         }
      }
      else if(this.score >= this.winningScore)
      {
         this.levelOver = true;
         return true;
      }
   }
}