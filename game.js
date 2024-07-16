import { Player } from "./player.js";
import * as visualsModule from "./visuals.js"

/**
 * 
 */
export class Game {
    constructor() {

        this.player;
    }


    /**
     * 
     * @param {HTMLCanvasElement} __canvas 
     */
    async Initialize(__canvas) {

        __canvas.width = 750;
        __canvas.height = 500;

        await Promise.all([
            visualsModule.LoadImage("./img/Temporary horror", "svg")
        ]);
        this.player = new Player();
    }


    /**
     * 
     * @param {CanvasRenderingContext2D} __context
     */
    Render(__context) {
        __context.clearRect(0,0, __context.canvas.width, __context.canvas.height);
        this.player.Render(__context);
    }
}