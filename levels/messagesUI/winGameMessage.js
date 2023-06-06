

export class WinGameMessage
{
    constructor(width,height)
    {
        this.width = width;
        this.height = height;
        this.fontFamily = "'Bangers', cursive";
        this.fontSize = 50;
        this.levelOver = false;
    }

    update(deltaTime)
    {
       this.time += deltaTime;
       setTimeout(() => this.levelOver = true, 1000)
    }

    draw(context)
    {
       const image = new Image();
       image.src = "assets/end.jpg";
       context.save();
       context.drawImage(image,0,0,this.width,this.height);
       context.shadowOffsetX = 2;
       context.shadowOffsetY = 2;
       context.shadowColor = 'black';
       context.shadowBlur = 0;
       context.fillStyle = 'yellow';
       context.font = this.fontSize + 'px ' + this.fontFamily;
       context.textAlign = 'center';
       context.fillText('You won! Play again!!', 900, 300);
       context.restore();
    }
}