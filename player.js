import * as visualsModule from "./visuals.js"

export class Player {

    constructor() {
        this.x = 0;
        this.y = 0;
        this.scale = 25;

        /**
         * @type {visualsModule.VisualImageAnimated}
         */
        this.visualImage = visualsModule.MakeVisualImage("./img/Temporary horror")
        console.log(this.visualImage)
        this.visualImage.StartAnimation("run");
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} __context
     */
    Render(__context) {
        this.visualImage.Draw(__context, this.x, this.y, { scale: this.scale });
    }
}