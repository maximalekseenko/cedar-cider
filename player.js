import * as visualsModule from "./visuals.js"

export class Player {

    constructor() {
        this.x = 0;
        this.y = 0;
        this.w = 100;
        this.h = 100;

        /**
         * @type {VisualImage}
         */
        this.visualImage = visualsModule.MakeVisualImage("./img/Temporary horror")
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} __context
     */
    Render(__context) {
        this.visualImage.Draw(__context, this.w, this.h);
    }
}