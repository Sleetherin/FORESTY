import { Projectile} from './projectile.js';

export class Player{
    constructor(game, leveling){
        this.game = game;
        this.leveling = leveling;
        this.width = 100;
        this.height = 120;
        this.x = 10;
        this.y = 500 - this.leveling;
        this.vy = 0;
        this.weight = 1;
        this.frameX = 0;
        this.frameY = 1;
        this.speedX = 0;
        this.speedY = 0;
        this.maxSpeed = 4;
        this.maxFrame = 29;
        this.fps = 15;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.projectiles = [];
        this.image = document.getElementById('ghosty');
    }
    restartPlayer()
    {
        this.x = 10;
        this.y = 500;
        this.maxFrame = 29;
    }
    setSpeed(speedX,speedY){
       this.speedX = speedX;
       this.speedY = speedY;
    }
    onGround(){
       return this.y >= 500 - this.leveling;
    }
    shoot()
    {
      if(this.game.ammo > 0)
      {
        this.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 30));
        this.game.ammo--;
      }
    }
    update(deltaTime){
         //while-waiting animation
         if(this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if(this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        }else{
            this.frameTimer += deltaTime;
        }
        //move the character 
        if(this.game.lastKey == 'PArrowLeft'){
           this.game.speed = 0;
           this.setSpeed(-this.maxSpeed, 0);
           this.frameY = 0;
           if(this.frameX < this.maxFrame) this.frameX++;
           else this.frameX = 0;
        }else if(this.game.lastKey == 'PArrowRight'){
           this.game.speed = 2;
           this.setSpeed(this.maxSpeed, 0);
           this.frameY = 1;
           if(this.frameX < this.maxFrame) this.frameX++;
           else this.frameX = 0;
        }else if(this.game.lastKey == 'P '){
            this.shoot();
        }
        else{
            this.setSpeed(0,0);
        }
        
        this.x += this.speedX;
        this.y += this.speedY;
        //horizontal boundaries
        if(this.x < 0){
            this.x = 0;
            this.game.speed = 0;
        }else if(this.x > this.game.width - this.width){
            this.x = this.game.width - this.width;
        }
        //vertical boundaries
        if(this.game.lastKey == 'PArrowUp' && this.onGround()) this.vy -= 30;
        this.y += this.vy;
        if(!this.onGround()) this.vy += this.weight;
        else this.vy = 0; 
        //handle projectiles
        this.projectiles.forEach(projectile => {
            projectile.update();
        });
        this.projectiles = this.projectiles.filter(projectile => !projectile.markedForDeletion);
      
    }
    draw(context){
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, 
        this.height, this.x, this.y, this.width, this.height);
        //handle projectiles
        this.projectiles.forEach(projectile => {
            projectile.draw(context);
        });
       
    }
}