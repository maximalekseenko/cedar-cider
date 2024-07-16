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

        __context.moveTo(5,100);
        __context.lineTo(5,5);
        __context.lineTo(100,5);

        __context.moveTo(650,5);
        __context.lineTo(745,5);
        __context.lineTo(745,100);
        
        __context.moveTo(745,400);
        __context.lineTo(745,495);
        __context.lineTo(650,495);
        
        __context.moveTo(100,495);
        __context.lineTo(5,495);
        __context.lineTo(5,400);
        __context.lineWidth = 1;
        __context.stroke();
    }
}