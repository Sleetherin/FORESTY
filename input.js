export class InputHandler{
    constructor(game){
        this.game = game;
        this.touchY = '';
        this.touchTreshold = 30;
        window.addEventListener('keydown', e => {
            this.game.lastKey = 'P' + e.key;
        });
        window.addEventListener('keyup', e => {
            this.game.lastKey = 'R' + e.key;
        });
        // window.addEventListener('touchstart', e => {
        //     this.touchY = e.changedTouches[0].pageY;
        // });
        // window.addEventListener('touchmove', e => {
        //     const swipeDistance = e.changedTouches[0].pageY - this.touchY;
        //     if(swipeDistance < -this.touchTreshold){
        //         this.game.lastkey = 'SwipeUp';
        //     }
        // });
        // window.addEventListener('touchend', e => {
        //     console.log(e.changedTouches[0].pageY);
        // });
    }
}