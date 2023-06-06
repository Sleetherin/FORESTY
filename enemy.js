class Enemy{
    constructor(speed){
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.markedForDeletion = false;
        this.speedX = speed;
    }
    update(deltaTime){
        this.x -= this.speedX;
        this.y += this.speedY;
       if(this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if(this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        }else{
            this.frameTimer += deltaTime;
       }
        //we check if enemy is off screen
        if(this.x + this.width < 0) this.markedForDeletion = true;

    }
    draw(context){
       context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}

export class Dark_Ghost extends Enemy{
    constructor(game){
        super(game.speed);
        this.game = game;
        this.width = 60;
        this.height = 70;
        this.x = this.game.width;
        this.y = Math.random() * this.game.height * 0.4;
        this.speedX = 3;
        this.speedY = 0;
        this.maxFrame = 5;
        this.image = document.getElementById('darky');
    }
    update(deltaTime){
        super.update(deltaTime);
    }
}


export class Flying_Sandwich extends Enemy{
    constructor(game){
        super(game.speed);
        this.game = game;
        this.width = 140;
        this.height = 110;
        this.x = this.game.width;
        this.y = Math.random() * this.game.height * 0.4 ;
        this.speedX = 3;
        this.speedY = 0;
        this.maxFrame = 19;
        this.image = document.getElementById('sandwichey');
    }
    update(deltaTime){
        super.update(deltaTime);
    }
}

export class Angry_Ghost extends Enemy{
    constructor(game){
        super(game.speed);
        this.game = game;
        this.width = 100;
        this.height = 120;
        this.x = this.game.width;
        this.y = Math.random() * this.game.height * 0.4;
        this.speedX = 5;
        this.speedY = 0;
        this.maxFrame = 10;
        this.image = document.getElementById('angry');
    }
    update(deltaTime){
        super.update(deltaTime);
    }
}

export class Blue_Ghost extends Enemy{
    constructor(game){
        super(game.speed);
        this.game = game;
        this.width = 90;
        this.height = 75;
        this.x = this.game.width - this.width;
        this.y = this.game.height - (this.height * 3.8);
        this.speedX = 4;
        this.speedY = 0;
        this.maxFrame = 16;
        this.image = document.getElementById('bluey');
    }
    update(deltaTime){
        super.update(deltaTime);
    }
}

export class Buggy_Ghost extends Enemy{
    constructor(game){
        super(game.speed);
        this.game = game;
        this.width = 110;
        this.height = 80;
        this.x = this.game.width;
        this.y = Math.random() * this.game.height * 0.5;
        this.speedX = 4;
        this.speedY = 0;
        this.maxFrame = 14;
        this.image = document.getElementById('buggy');
    }
    update(deltaTime){
        super.update(deltaTime);
    }
}

export class Fluffy_Monster extends Enemy{
    constructor(game){
        super(game.speed);
        this.game = game;
        this.width = 120;
        this.height = 98;
        this.x = this.game.width;
        this.y = this.game.height - (this.height * 2.8);
        this.speedX = 3;
        this.speedY = 0;
        this.maxFrame = 12;
        this.image = document.getElementById('fluffy');
    }
    update(deltaTime){
        super.update(deltaTime);
    }
}

