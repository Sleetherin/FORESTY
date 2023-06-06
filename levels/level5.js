/**  
*/

import { Player } from '../player.js';
import { InputHandler } from '../input.js';
import { BackgroundV } from '../background.js';
import { Buggy_Ghost,Dark_Ghost,Angry_Ghost,Fluffy_Monster} from '../enemy.js';
import { UI } from '../UI.js';
import { FluffyGetsHit, CollisionAnimation } from '../collisionAnimation.js';


export class Level5 {
    constructor(width,height){
        this.width = width;
        this.height = height;
        this.topMargin = 200;
        this.speed = 2;
        this.background = new BackgroundV(this);
        this.player = new Player(this,1);
        this.lastKey = undefined;
        this.input = new InputHandler(this);
        this.ui = new UI(this);
        this.ammo = 10;
        this.maxAmmo = 20;
        this.ammoTimer = 0;
        this.ammoInterval = 1000;
        this.collisions = [];
        this.flying_enemies = [];
        this.ground_enemies = [];
        this.enemyTimer = 0;
        this.groundEnemyTimer = 0;
        this.enemyInterval = 3000;
        this.groundEnemyInterval = 1000;
        this.score = 0;
        this.maxScore = 50;
        this.time = 0;
        this.maxTime = 80000;
        this.levelOver = false;
    }
    reset(){
      this.enemyTimer = 0;
      this.groundEnemyTimer = 0;
      this.collisions = [];
      this.flying_enemies = [];
      this.ground_enemies = [];
      this.time = 0;
      this.levelOver = false;
      this.ammo = 20;
      this.score = 0;
      this.player.restartPlayer();
    }
   update(deltaTime){
      this.time += deltaTime;
      this.background.update();
      this.player.update(deltaTime);
      //handle our charming enemies
        if(this.enemyTimer > this.enemyInterval && !this.levelOver){
            this.enemyTimer = 0;
            this.addFlyingEnemy((Math.floor(Math.random() * 10) + 1));
        } else{
         this.enemyTimer += deltaTime;
        }

        if(this.groundEnemyTimer > this.groundEnemyInterval && !this.levelOver){
           this.groundEnemyTimer = 0;
           if((Math.floor(Math.random() * 10) + 1) >= 9) this.addGroundEnemy();
        } else{
           this.groundEnemyTimer += deltaTime;
        }


        //you have your own weapon now attack them
        this.flying_enemies.forEach(enemy => {
           enemy.update(deltaTime);
           if(enemy.markedForDeletion) this.flying_enemies = this.flying_enemies.filter(e => e != enemy);
           if(this.checkCollision(this.player,enemy)){
              enemy.markedForDeletion = true;
              this.collisions.push(new CollisionAnimation(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
              this.score= this.score + 1;
            } 
            if(enemy.x < 0)
            {
               this.reset();
            }
        });
  
        
        this.ground_enemies.forEach(enemy => {
           enemy.update(deltaTime);
        if(enemy.markedForDeletion) this.ground_enemies = this.ground_enemies.filter(e => e != enemy);
        if(this.checkCollision(this.player,enemy)){
          this.levelOver = true;
          this.reset();
        } 
        this.player.projectiles.forEach(projectile => {
           if(this.checkCollision(projectile, enemy)){
              enemy.markedForDeletion = true;
              this.collisions.push(new FluffyGetsHit(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
              this.score = this.score + 1;
           }
        })
      });
      
      //handle collisions
      this.collisions.forEach((collision) => {
         collision.update(deltaTime);
         if(collision.markedForDeletion) this.collisions = this.collisions.filter(c => c != collision);
      })

      //handle ammo
      if(this.ammoTimer > this.ammoInterval)
      {
         if(this.ammo < this.maxAmmo)
         {
            this.ammo++;
         }
         this.ammoTimer = 0;
      }else
      {
         this.ammoTimer += deltaTime * 0.5;
      }
      

      //handle repeat the level or go to the next level
     this.isCompleted();

    
   }

   draw(context){
      this.background.draw(context);
      this.player.draw(context);
      this.flying_enemies.forEach(enemy => {
         enemy.draw(context);
      });
      this.ground_enemies.forEach(enemy => {
        enemy.draw(context);
     });
      this.collisions.forEach(collision => {
       collision.draw(context);
    });
     this.ui.floatingTextAppear(context,1);
     this.ui.floatingWhichLevelTextAppear(context, "FIVE - MIDNIGHT");
     this.ui.showGhostyAmmo(context);
   }
   addFlyingEnemy(i)
   {
      if(i < 5) this.flying_enemies.push(new Buggy_Ghost(this));
      if(i === 5) this.flying_enemies.push(new Dark_Ghost(this));
      if(i > 5) this.flying_enemies.push(new Angry_Ghost(this));
   }
 
   addGroundEnemy()
   {
     this.ground_enemies.push(new Fluffy_Monster(this));
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
      else if(this.score > this.winningScore)
      {
         this.levelOver = true;
         return true;
      }
   }
}

