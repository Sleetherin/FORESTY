export class CollisionAnimation{
    constructor(game, x, y){
        this.game = game;
        this.image = document.getElementById('boom');
        this.spriteWidth = 100;
        this.spriteHeight = 90;
        this.sizeModifier = Math.random() + 0.5;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.x = x - this.width * 0.5;
        this.y = y - this.width * 0.5;
        this.frameX = 0;
        this.maxFrame = 4; 
        this.markedForDeletion = false;
        this.fps = Math.random() * 10 + 15;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
    }
    update(deltaTime){
        this.x -= this.game.speed;
        if(this.frameTimer > this.frameInterval){
            this.frameX++;
            this.frameTimer = 0;
        }else{
            this.frameTimer += deltaTime;
        }
        this.frameX++;
        if(this.frameX > this.maxFrame) this.markedForDeletion = true;
    }
    draw(context){
        context.drawImage(this.image,this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y,this.width, this.height);
    }
}

export class BlueyGetsHit{
    constructor(game, x, y){
        this.game = game;
        this.image = document.getElementById('bluey_hit');
        this.spriteWidth = 90;
        this.spriteHeight = 75;
        this.sizeModifier = Math.random() + 0.5;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.x = x - this.width * 0.5;
        this.y = y - this.width * 0.5;
        this.frameX = 0;
        this.maxFrame = 5; 
        this.markedForDeletion = false;
        this.fps = Math.random() * 10 + 15;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
    }
    update(deltaTime){
        this.x -= this.game.speed;
        if(this.frameTimer > this.frameInterval){
            this.frameX++;
            this.frameTimer = 0;
        }else{
            this.frameTimer += deltaTime;
        }
        this.frameX++;
        if(this.frameX > this.maxFrame) this.markedForDeletion = true;
    }
    draw(context){
        context.drawImage(this.image,this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y,this.width, this.height);
    }
}


export class FluffyGetsHit{
    constructor(game, x, y){
        this.game = game;
        this.image = document.getElementById('fluffy_hit');
        this.spriteWidth = 120;
        this.spriteHeight = 98;
        this.sizeModifier = Math.random() + 0.5;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.x = x - this.width * 0.5;
        this.y = y - this.width * 0.5;
        this.frameX = 0;
        this.maxFrame = 5; 
        this.markedForDeletion = false;
        this.fps = Math.random() * 10 + 15;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
    }
    update(deltaTime){
        this.x -= this.game.speed;
        if(this.frameTimer > this.frameInterval){
            this.frameX++;
            this.frameTimer = 0;
        }else{
            this.frameTimer += deltaTime;
        }
        this.frameX++;
        if(this.frameX > this.maxFrame) this.markedForDeletion = true;
    }
    draw(context){
        context.drawImage(this.image,this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y,this.width, this.height);
    }
}
