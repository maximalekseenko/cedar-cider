import { Player } from "./player.js";
import { AppVisuals } from "./visuals.js"

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

        __canvas.width = 500;
        __canvas.height = 500;

        await Promise.all([
            AppVisuals.LoadImage("./img/Temporary horror.svg")
        ]);
        this.player = new Player();
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} __context
     */
    Render(__context) {
        this.player.Render(__context)
    }
}