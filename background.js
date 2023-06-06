export default class Layer{
    constructor(game, width, height, speedModifier, image){
       this.game = game;
       this.width = width;
       this.height = height;
       this.speedModifier = speedModifier;
       this.image = image;
       this.x = 0;
       this.y = 0;
    }
    update(){
       if(this.x < -this.width) this.x = 0;
       else this.x -= this.game.speed * this.speedModifier;
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width + 0.4, this.y, this.width, this.height);

    }
}

export class Background{
    constructor(game){
        this.game = game;
        this.width = 1200;
        this.height = 800;
        this.layerImage = document.getElementById('background');
        this.layer1 = new Layer(this.game, this.width, this.height, 1, this.layerImage);
        this.backgroundLayers = [this.layer1];
    }
    update(){
        this.backgroundLayers.forEach(layer => {
            layer.update();
        })
    }
    draw(context){
        this.backgroundLayers.forEach(layer => {
            layer.draw(context);
        })
    }
}

export class BackgroundII{
    constructor(game){
        this.game = game;
        this.width = 1200;
        this.height = 800;
        this.layerImage = document.getElementById('background2');
        this.layer1 = new Layer(this.game, this.width, this.height, 1, this.layerImage);
        this.backgroundLayers = [this.layer1];
    }
    update(){
        this.backgroundLayers.forEach(layer => {
            layer.update();
        })
    }
    draw(context){
        this.backgroundLayers.forEach(layer => {
            layer.draw(context);
        })
    }
}

export class BackgroundIII{
    constructor(game){
        this.game = game;
        this.width = 1200;
        this.height = 800;
        this.layerImage = document.getElementById('background3');
        this.layer1 = new Layer(this.game, this.width, this.height, 1, this.layerImage);
        this.backgroundLayers = [this.layer1];
    }
    update(){
        this.backgroundLayers.forEach(layer => {
            layer.update();
        })
    }
    draw(context){
        this.backgroundLayers.forEach(layer => {
            layer.draw(context);
        })
    }
}

export class BackgroundIV{
    constructor(game){
        this.game = game;
        this.width = 1200;
        this.height = 800;
        this.layerImage = document.getElementById('background4');
        this.layer1 = new Layer(this.game, this.width, this.height, 1, this.layerImage);
        this.backgroundLayers = [this.layer1];
    }
    update(){
        this.backgroundLayers.forEach(layer => {
            layer.update();
        })
    }
    draw(context){
        this.backgroundLayers.forEach(layer => {
            layer.draw(context);
        })
    }
}

export class BackgroundV{
    constructor(game){
        this.game = game;
        this.width = 1200;
        this.height = 800;
        this.layerImage = document.getElementById('background5');
        this.layer1 = new Layer(this.game, this.width, this.height, 1, this.layerImage);
        this.backgroundLayers = [this.layer1];
    }
    update(){
        this.backgroundLayers.forEach(layer => {
            layer.update();
        })
    }
    draw(context){
        this.backgroundLayers.forEach(layer => {
            layer.draw(context);
        })
    }
}







