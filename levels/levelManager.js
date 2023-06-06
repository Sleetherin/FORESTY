import {Level1}  from "./level1.js";
import {Level2} from "./level2.js";
import {Level3} from "./level3.js";
import {Level4} from "./level4.js";
import {Level5} from "./level5.js";
import { StartGameMessage } from "./messagesUI/startGameMessage.js";
import { WinGameMessage } from "./messagesUI/winGameMessage.js";



export class LevelManager {
  constructor(width, height){
    this.width = width;
    this.height = height;
    this.level = 1;
    this.levels = [
      new StartGameMessage(this.width,this.height),
      new Level1(this.width,this.height), 
      new Level2(this.width,this.height), 
      new Level3(this.width,this.height),
      new Level4(this.width,this.height),
      new Level5(this.width,this.height),
      new WinGameMessage(this.width,this.height),];
    this.currentLevel = this.levels[this.level - 1];
    this.buttonClicked = false;
    this.gameOver = false;
    this.playButton = document.getElementById('play_button');
    this.howToPlayButton = document.getElementById('info_button');
    this.howToPlayInformation = document.getElementById('how_to_play');
    this.closeButton = document.getElementById('close_button');
  }
      
     
  update(deltaTime) 
  {
    
  
    this.currentLevel = this.levels[this.level - 1];
    this.currentLevel.update(deltaTime);
    
    if(this.currentLevel.levelOver || this.gameOver)
    {
        if(this.level < this.levels.length){
          this.gameOver = false;
          this.level++;
        }
      else
      { 
        if(!this.buttonClicked) this.playButton.style.display="block";
       
        this.playButton.addEventListener('click', ()=>{
          this.buttonClicked = true;
          this.playButton.style.display = 'none';
          this.level = 1;
        });
        
      }

     }

    this.howToPlayButton.addEventListener('click', ()=> {
      this.howToPlayInformation.style.display = 'block';
      this.closeButton.style.display = 'block';
    });
  }

  
        
  draw(context) 
  {
    this.currentLevel.draw(context);
  }

}


    