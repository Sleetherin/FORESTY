export class InputHandler{
    constructor(game){
        this.game = game;
        //this.touchY = '';
        //this.touchTreshold = 30;
        window.addEventListener('keydown', e => {
            this.game.lastKey = 'P' + e.key;
        });
        window.addEventListener('keyup', e => {
            this.game.lastKey = 'R' + e.key;
        });
    }
}

