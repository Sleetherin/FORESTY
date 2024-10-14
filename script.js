/**
 *  This is the main JavaScript file
 */



//all the levels
import {LevelManager} from "../levels/levelManager.js";


window.addEventListener('load', function(){
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext('2d');
    const close_info = document.getElementById("close_button");
    const info = document.getElementById("how_to_play");
    const pauseButton = document.getElementById("pause_button");
    let isPaused = false;

    canvas.width = this.innerWidth;
    canvas.height = 800;

    

    const game = new LevelManager(canvas.width, canvas.height);
    let lastTime = 0;



    function animate(timeStamp){
        if(!isPaused)
        {   
            const deltaTime = timeStamp - lastTime;
            lastTime = timeStamp;
            ctx.clearRect(0,0,canvas.width,canvas.height);
            game.update(deltaTime);
            game.draw(ctx);
        }
        else
        {
            game.ui.showPauseOverlay(ctx);
        }
       if(!game.gameOver) requestAnimationFrame(animate); 
    }

    pauseButton.addEventListener("click",function() 
    {
       isPaused = !isPaused;
       pauseButton.textContent = isPaused ? "Resume" : "Pause";
    });

    close_info.addEventListener("click", function(){
        info.style.display = "none";
    });
 

    animate(0);
})



