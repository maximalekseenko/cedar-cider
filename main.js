import {Game} from "./game.js";


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



    game.Initialize(canvas);

    function animate() {
        game.Render(ctx);
        requestAnimationFrame(animate);
    }
    animate()
})