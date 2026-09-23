/**
 *  This is the main JavaScript file
 */

import { isPaused, togglePause } from './pauseState.js';
import { UI } from './UI.js';
import { LevelManager } from './levels/levelManager.js';

window.addEventListener('load', function () {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext('2d');
    const closeInfo = document.getElementById("close_button");
    const info = document.getElementById("how_to_play");
    const pauseButton = document.getElementById("pause_button");

    const GAME_WIDTH = 1200;
    const GAME_HEIGHT = 800;

    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;

    const game = new LevelManager(GAME_WIDTH, GAME_HEIGHT);
    const ui = new UI({ width: GAME_WIDTH, height: GAME_HEIGHT });

    let lastTime = 0;

    function updatePauseButton() {
        pauseButton.textContent = isPaused ? "Resume" : "Pause";
    }

    function toggleGamePause() {
        togglePause();
        updatePauseButton();
    }

    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!isPaused) {
            game.update(deltaTime);
        }

        game.draw(ctx);

        if (isPaused) {
            ui.showPauseOverlay(ctx);
        }

        requestAnimationFrame(animate);
    }

    pauseButton.addEventListener("click", toggleGamePause);

    window.addEventListener("keydown", (event) => {
        if (event.key.toLowerCase() === "p" && !event.repeat) {
            event.preventDefault();
            toggleGamePause();
        }
    });

    closeInfo.addEventListener("click", function () {
        info.style.display = "none";
    });

    requestAnimationFrame(animate);
});