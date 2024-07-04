import { Player } from "./player.js";

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
    Initialize(__canvas) {
        __canvas.width = 500;
        __canvas.height = 500;

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