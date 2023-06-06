/** 
 *  The first level of the game is simple. 
 *  The player has only to earn 30 points for 30 seconds.
 *  @constructor
 *  @param {number} width - The width of the canvas 
 *  @param {number} height - The height of the canvas
 * 
*/ 

import { Player } from '../player.js';
import { InputHandler } from '../input.js';
import { Background } from '../background.js';
import { Dark_Ghost } from '../enemy.js';
import { UI } from '../UI.js';
import { CollisionAnimation } from '../collisionAnimation.js';



export class Level1{
    constructor(width,height){
        this.width = width;
        this.height = height;
        this.topMargin = 200;
        this.speed = 1;
        this.background = new Background(this);
        this.player = new Player(this, 0);
        this.lastKey = undefined;
        this.input = new InputHandler(this);
        this.ui = new UI(this);
        this.collisions = [];
        this.enemies = [];
        this.enemyTimer = 0;
        this.enemyInterval = 1000;
        this.score = 0;
        this.winningScore = 30;
        this.time = 0;
        this.maxTime = 30000;
        this.ammo = 0;
        this.levelOver = false;
        this.button = document.getElementById('play_button');
    }

    /**
     * Resets the level by reinitializing all properties
     */
    reset(){
      this.enemyTimer = 0;
      this.collisions = [];
      this.enemies = [];
      this.score = 0;
      this.time = 0;
      this.player.restartPlayer();
      this.levelOver = false;
   }

   /**
    * Updates the level by updating all properties and handling collisions
    * @param {number} deltaTime - The time elapsed since the last update
    */
    update(deltaTime){
       this.time += deltaTime;
       this.background.update();
       this.player.update(deltaTime);
       this.button.style.display = "none";
       //Updates player and handles enemies
       if(this.enemyTimer > this.enemyInterval && !this.levelOver){
          this.enemyTimer = 0;
          this.addEnemy();
       } else{
          this.enemyTimer += deltaTime;
       }
        this.enemies.forEach(enemy => {
            enemy.update(deltaTime);
            if(enemy.markedForDeletion) this.enemies = this.enemies.filter(e => e != enemy);
            if(this.checkCollision(this.player,enemy)){
              enemy.markedForDeletion = true;
              this.collisions.push(new CollisionAnimation(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
              this.score++;
            } 
       });


       //Handles collisions
       this.collisions.forEach((collision) => {
          collision.update(deltaTime);
          if(collision.markedForDeletion) this.collisions = this.collisions.filter(c => c != collision);
       });


       //Handles completing the level
      this.isCompleted();
      
    }

    /**
     * Draws the level by drawing all elements and UI elements
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context){
       this.background.draw(context);
       this.player.draw(context);
       this.enemies.forEach(enemy => {
          enemy.draw(context);
       });
       this.collisions.forEach(collision => {
        collision.draw(context);
     });
       this.ui.floatingTextAppear(context, 1);
       this.ui.floatingWhichLevelTextAppear(context, "ONE - EARLY EVENING");
    }
    /**
     * Adds a new enemy to the level
     */
    addEnemy(){
        this.enemies.push(new Dark_Ghost(this));
    }

    /**
     * Checks if there's a collision between two ghosties
     * @param {Object} ghost1 
     * @param {Object} ghost2 
     * @returns 
     */
   checkCollision(ghost1,ghost2){
        return(  ghost1.x < ghost2.x + ghost2.width &&
            ghost1.x + ghost1.width > ghost2.x &&
            ghost1.y < ghost2.y + ghost2.height &&
            ghost1.height + ghost1.y > ghost2.y)
   }



   /**
   * If the player loses they replay the level
   * until they win. If they win, they play the next
   * level. The game has initially five levels planned.
   */
   isCompleted(){
      if(this.time > this.maxTime){ 
         if(this.score < this.winningScore) 
         {
            //put the noise of braking here
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

