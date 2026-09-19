export class LevelStartMessage {
    constructor(width, height, title, message) {
        this.width = width;
        this.height = height;
        this.title = title;
        this.message = message;
        this.levelOver = false;

        this.fontFamily = "'Bangers', cursive";
        this.titleFontSize = 60;
        this.messageFontSize = 30;

        this.button = document.getElementById("play_button");

        this.handleClick = () => {
            this.levelOver = true;
            this.button.style.display = "none";
        };

        this.button.addEventListener("click", this.handleClick);
    }

    reset() {
        this.levelOver = false;
        this.button.textContent = "START LEVEL";
        this.button.style.display = "block";
    }

    update() {
        this.button.style.display = "block";
    }

    draw(context) {
        context.save();

        context.fillStyle = "rgba(0, 0, 0, 0.75)";
        context.fillRect(0, 0, this.width, this.height);

        context.textAlign = "center";
        context.fillStyle = "yellow";
        context.font = `${this.titleFontSize}px ${this.fontFamily}`;
        context.fillText(this.title, this.width / 2, 250);

        context.fillStyle = "white";
        context.font = `${this.messageFontSize}px ${this.fontFamily}`;
        context.fillText(this.message, this.width / 2, 340);

        context.restore();
    }
}