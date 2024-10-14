export class UI{
    constructor(game){
        this.game = game;
        this.fontSize = 39;
        this.fontFamily = "'Bangers', cursive";
        this.color = 'yellow';
        this.width = this.game.width;
        this.height = this.game.height;
    }

    /* Score and Timer*/
    floatingTextAppear(context, i)
    {
       context.save();
       context.shadowOffsetX = 2;
       context.shadowOffsetY = 2;
       context.shadowColor = 'black';
       context.shadowBlur = 0;
       context.font = this.fontSize + 'px ' + this.fontFamily;
       context.textAlign = 'left';
       context.fillStyle = this.color;
       //score
       if(i > 0) context.fillText('Score: ' + this.game.score, 20, 50);
       //timer
       context.fontSize = this.fontSize * 0.8 + 'px ' + this.fontFamily;
       context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 20, 80);
       context.restore(); 
    }

    floatingWhichLevelTextAppear(context, levelText)
    {
        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'black';
        context.shadowBlur = 0;
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'center';
        context.fillStyle = this.color;
        context.fillText('Level ' + levelText, 800, 65);
        context.restore();
    }

    showGhostyAmmo(context)
    {
       context.save();
       context.font = this.fontSize *  0.5 + 'px ' + this.fontFamily;
       context.textAlign = 'left';
       context.fillStyle = this.color;
       for(let i = 0; i < this.game.ammo; i++)
       {
         context.fillRect(20 + 5 * i,90,3,this.fontSize * 0.7);
       }
       context.restore();
    }

    showWinningMessage(context,message)
    {
        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'black';
        context.shadowBlur = 0;
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'center';
        context.fillStyle = this.color;
        context.fillText(message, 800, 380);
        context.restore();
    }

    showPauseOverlay(context) {
        context.save();
        context.fillStyle = 'rgba(0, 0, 0, 0.5)'; 
        context.fillRect(0, 0, this.width, this.height); 
    
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.fillText('Game Paused', this.width / 2, this.height / 2); 
        context.restore();
    }
    
}

 
