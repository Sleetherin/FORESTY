/**  
*/

import { Player } from '../player.js';
import { InputHandler } from '../input.js';
import { BackgroundIII } from '../background.js';
import { Angry_Ghost } from '../enemy.js';
import { UI } from '../UI.js';
import { CollisionAnimation } from '../collisionAnimation.js';


export class Level3 {
    constructor(width,height){
        this.width = width;
        this.height = height;
        this.topMargin = 200;
        this.speed = 0.2;
        this.background = new BackgroundIII(this);
        this.player = new Player(this,150);
        this.lastKey = undefined;
        this.input = new InputHandler(this);
        this.ui = new UI(this);
        this.maxScore = 60;
        this.collisions = [];
        this.enemies = [];
        this.enemyTimer = 0;
        this.enemyInterval = 1000;
        this.time = 0;
        this.maxTime = 60000;
        this.levelOver = false;
    }
    reset(){
      this.enemyTimer = 0;
      this.collisions = [];
      this.enemies = [];
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
         if((Math.floor(Math.random() * 10) + 1) <= 7) this.addEnemy();
      } else{
         this.enemyTimer += deltaTime;
      }
         this.enemies.forEach(enemy => {
            enemy.update(deltaTime);
            if(enemy.markedForDeletion) this.enemies = this.enemies.filter(e => e != enemy);
            if(this.checkCollision(this.player,enemy)){
              enemy.markedForDeletion = true;
              this.collisions.push(new CollisionAnimation(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
            } 
            if(enemy.x < 0)
            {
               this.reset();
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
       this.enemies.forEach(enemy => {
          enemy.draw(context);
       });
       this.collisions.forEach(collision => {
        collision.draw(context);
     });
       this.ui.floatingTextAppear(context, 0);
       this.ui.floatingWhichLevelTextAppear(context, "THREE - TWILIGHT");
    }
    addEnemy(){
        this.enemies.push(new Angry_Ghost(this));
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
      if(this.time >= this.maxTime)
      { 
         this.levelOver = true;
         return true;
      }
   }
     
}

