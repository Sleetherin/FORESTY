import { Level1 } from "./level1.js";
import { Level2 } from "./level2.js";
import { Level3 } from "./level3.js";
import { Level4 } from "./level4.js";
import { Level5 } from "./level5.js";
import { StartGameMessage } from "./messagesUI/startGameMessage.js";
import { WinGameMessage } from "./messagesUI/winGameMessage.js";

export class LevelManager {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.levels = [
            new Level1(width, height),
            new Level2(width, height),
            new Level3(width, height),
            new Level4(width, height),
            new Level5(width, height)
        ];

        this.startGameMessage = new StartGameMessage(
            width,
            height,
            "FORESTY",
            "Guide Ghosty into the forest until it is midnight"
        );

        this.levelStartMessages = [
            new StartGameMessage(width, height, "LEVEL ONE", "Eliminate 30 dark ghosts in 30 seconds!"),
            new StartGameMessage(width, height, "LEVEL TWO", "Eliminate 40 sandwich aliens in 50 seconds!"),
            new StartGameMessage(width, height, "LEVEL THREE", "Don't let any angry ghosts pass for 60 seconds"),
            new StartGameMessage(width, height, "LEVEL FOUR", "Destroy blue ghosts using the space button and survive for 70 seconds."),
            new StartGameMessage(width, height, "LEVEL FIVE", "Eliminate 50 monsters during 80 seconds!")
        ];

        this.phase = "start";
        this.currentLevel = this.startGameMessage;
        this.currentLevelIndex = 0;

        this.playButton = document.getElementById("play_button");
        this.winMessage = new WinGameMessage(width, height);

        this.howToPlayButton = document.getElementById("info_button");
        this.howToPlayInformation = document.getElementById("how_to_play");
        this.closeButton = document.getElementById("close_button");

        this.howToPlayButton.addEventListener("click", () => {
            this.howToPlayInformation.style.display = "block";
            this.closeButton.style.display = "block";
        });
    }

    update(deltaTime) {
        if (this.phase === "start") {
            this.currentLevel.update(deltaTime);

            if (this.currentLevel.levelOver) {
                this.phase = "levelStart";
                this.currentLevel = this.levelStartMessages[this.currentLevelIndex];
                this.currentLevel.levelOver = false;
            }

            return;
        }

        if (this.phase === "levelStart") {
            this.currentLevel.update(deltaTime);

            if (this.currentLevel.levelOver) {
                this.phase = "playing";
                this.currentLevel = this.levels[this.currentLevelIndex];
                this.currentLevel.reset();
                this.playButton.style.display = "none";
            }

            return;
        }

        if (this.phase === "playing") {
            this.currentLevel.update(deltaTime);

            if (this.currentLevel.levelOver) {
                this.currentLevelIndex++;

                if (this.currentLevelIndex >= this.levels.length) {
                    this.phase = "won";
                    this.currentLevel = this.winMessage;
                    this.playButton.style.display = "block";
                    this.playButton.textContent = "PLAY AGAIN";
                    return;
                }

                this.phase = "levelStart";
                this.currentLevel = this.levelStartMessages[this.currentLevelIndex];
                this.currentLevel.levelOver = false;
            }

            return;
        }

        if (this.phase === "won") {
            this.currentLevel.update(deltaTime);
        }
    }

    draw(context) {
        this.currentLevel.draw(context);
    }
}