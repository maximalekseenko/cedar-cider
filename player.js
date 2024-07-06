import { AppVisuals } from "./visuals.js"

export class Player {

    constructor() {
        this.x = 0;
        this.y = 0;
        this.w = 100;
        this.h = 100;

        /**
         * @type {HTMLImageElement}
         */
        this.image = AppVisuals.GetImage("./img/Temporary horror.svg")
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} __context
     */
    Render(__context) {
        console.log(this.image);
        __context.drawImage(
            this.image,
            0, 0, this.w, this.h,
            this.x, this.y, this.w, this.h
        );
    }
}