/**  
*/
import { Player } from '../player.js';
import { InputHandler } from '../input.js';
import { BackgroundIV } from '../background.js';
import { Buggy_Ghost, Blue_Ghost } from '../enemy.js';
import { UI } from '../UI.js';
import { BlueyGetsHit, CollisionAnimation } from '../collisionAnimation.js';



export class Level4{
    constructor(width,height){
        this.width = width;
        this.height = height;
        this.topMargin = 200;
        this.speed = 0.2;
        this.background = new BackgroundIV(this);
        this.player = new Player(this,0);
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
        this.enemyInterval = 1000;
        this.groundEnemyInterval = 1000;
        this.time = 0;
        this.maxTime = 70000;
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
      this.player.restartPlayer();
   }
    update(deltaTime){
       this.time += deltaTime;
       this.background.update();
       this.player.update(deltaTime);
       //handle our charming enemies
         if(this.enemyTimer > this.enemyInterval && !this.levelOver){
          this.enemyTimer = 0;
          if((Math.floor(Math.random() * 10) + 1) <= 7) this.addFlyingEnemy();
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
               this.collisions.push(new BlueyGetsHit(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
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
      this.ui.floatingTextAppear(context,0);
      this.ui.floatingWhichLevelTextAppear(context, "FOUR - LATE EVENING");
      this.ui.showGhostyAmmo(context);
    }
    addFlyingEnemy()
    {
      this.flying_enemies.push(new Buggy_Ghost(this));
    }
    addGroundEnemy()
    {
      this.ground_enemies.push(new Blue_Ghost(this));
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

