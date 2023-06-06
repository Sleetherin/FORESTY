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
    canvas.width = this.innerWidth;
    canvas.height = 800;

    

    const game = new LevelManager(canvas.width, canvas.height);
   
    let lastTime = 0;

    function animate(timeStamp){

        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        close_info.addEventListener('click', function(){
            info.style.display = 'none';
        });
        ctx.clearRect(0,0,canvas.width,canvas.height);
        game.update(deltaTime);
        game.draw(ctx);

       if(!game.gameOver) requestAnimationFrame(animate);
       
    }
 

    animate(0);
})



