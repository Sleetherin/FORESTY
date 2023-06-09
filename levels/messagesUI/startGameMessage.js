export class StartGameMessage
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
       const playButton = document.getElementById("play_button");
       playButton.style.display="block";
       
        playButton.addEventListener('click', ()=>{
          playButton.style.display="none";
          this.levelOver = true;
        });
    }

    draw(context)
    {
       const image = new Image();
       image.src = "assets/images/forest2.jpg";
      
  
       context.save();
       context.drawImage(image,0,0,this.width,this.height);
       context.shadowOffsetX = 2;
       context.shadowOffsetY = 2;
       context.shadowColor = 'black';
       context.shadowBlur = 0;
       context.fillStyle = 'yellow';
       context.font = this.fontSize + 'px ' + this.fontFamily;
       context.textAlign = 'center';
       context.fillText('Guide Ghosty into the forest until it is midnight', 900, 300);
       context.restore();
    }
}