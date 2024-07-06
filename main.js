import { Game } from "./game.js";


window.addEventListener('load', () => {

    /**
     * @type {HTMLCanvasElement}
     */
    const canvas = document.getElementById('runner-canvas');

    /**
     * @type {CanvasRenderingContext2D}
     */
    const ctx = canvas.getContext('2d');

    /**
     * @type {Game}
     */
    const game = new Game();



    function Animate() {
        game.Render(ctx);
        requestAnimationFrame(Animate);
    }

    game.Initialize(canvas).then(
        Animate
    );
})