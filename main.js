import { Game } from "./game.js";


/**
 * @type {Game}
 */
export const game = new Game();

window.addEventListener('load', () => {

    /**
     * @type {HTMLCanvasElement}
     */
    const canvas = document.getElementById('canvas');

    /**
     * @type {CanvasRenderingContext2D}
     */
    const ctx = canvas.getContext('2d');



    function Animate() {
        game.Render(ctx);
        requestAnimationFrame(Animate);
    }

    game.Initialize(canvas).then(
        Animate
    );
})