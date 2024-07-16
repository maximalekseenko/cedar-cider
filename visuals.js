/** Module for working with images, that have additional functional, 
 * that is not present in build-in interpretations.
 * 
 * Each image, that you pass into this module's functions must have some additional information in form of json file in same directory.
 * That file is called "image's metadata". Metadata's contains are based on its image's type (Seek bellow).
 * 
 * The product of combining image and its metadata is {@link VisualImage}.
 * 
 * Images of different types require different {@link VisualImage}s.
 * To ensure usage of correct images with correct {@link VisualImage}s,
 * creation of a new instance of {@link VisualImage} should be done through {@link MakeVisualImage} function.
 * That function finds correct {@link VisualImage} in {@link VISUAL_IMAGE_TYPES} 
 * by comparing their {@link VisualImage.type} with type in provided image's metadata.
 * 
 * Here is the list of most commonly used {@link VisualImage}s (for others look in {@link VISUAL_IMAGE_TYPES}):
 * * {@link VisualImageAnimations} is used for an image that contains a series of animations in it.
 * Can be used to represent a character or an object on the scene.
 * * {@link VisualImageParallax} is used for an image that contains multiple layers of images, that imitates depth.
 * Can be used to represent a background.
 * 
 * Before creating a {@link VisualImage}, you must load it's image and metadata.
 * To do so, call and await {@link LoadImage} function to finish.
 * **Do not forget to unload images that you no longer need**: 
 * Unload specific image(s) with {@link UnloadImage} or all images with {@link UnloadAllImages}.
 * 
 * {@link VisualImage} has set of functions for interacting with it. 
 * Main one is {@link VisualImage.Draw}. This function will render image on provided canvas and coordinates.
 * The way {@link VisualImage.Draw} behaves and treats coordinates is defined by its type.
 * 
 * If you are planing to make custom type, consider taking a look at docs of {@link VisualImage} for more information.
 * 
 * @see {@link LoadImage}
 * @see {@link MakeVisualImage}
 * @see {@link VISUAL_IMAGE_TYPES}
 * @see {@link VisualImage.Draw}
 * 
 * @module visualsModule
 * 
 * @author maxim alekseenko
*/



/** 
 * @typedef {Object} Metadata 
 * @property {string} type
 * @property {string} version
*/



/** Class that combines image and it's metadata into a single object (no you cant date it).
 * @abstract @class 
 * 
 * ## When creating derivatives
 * 
 * By default every metadata file must contain `type` and `version` fields.
 * 
 * When making a derivative from this class, make sure to:
 * * Override {@link VisualImage.Draw} function;
 * * Add new class into {@link VISUAL_IMAGE_TYPES};
 * * Override {@link VisualImage.constructor};
 */
export class VisualImage {

    /** Name of this metadata's type.
     * @type {string}
     */
    static type = undefined;


    /** Version of metadata's type.
     * @type {string}
     */
    static version = undefined;


    constructor(__image, __metadata) {

        /** Html component for this image.
         * @type {HTMLImageElement}
         */
        this.image = __image;

        /** 
         * @type {Metadata}
         */
        this.metadata = __metadata;
    }


    /** Function for rendering this metadata's image on provided canvas at provided location.
     * 
     * This function is used by {@link VisualImage.Draw}, which provides this metadata
     * 
     * @virtual
     * 
     * @param {CanvasRenderingContext2D} __context Context from a canvas to render on.
     * @param {number} __x Location on x axis.
     * @param {number} __y Location on y axis.
     * @param {{[arg_name:string]: any}} __argv Dictionary of extra arguments for this function.
     */
    Draw(__context, __x, __y, __argv) { throw "An abstract VisualImage is used. Use derivatives"; }
}



/** Data for an image, containing set of animations, defined by frames on this image.
 * 
 * @class
 * 
 * @extends VisualImage
 */
export class VisualImageAnimated extends VisualImage {


    /** @override */
    static type = "Animated";


    /** @override */
    static version = "1";


    /** Cotains next
     * 
     */
    constructor(__image, __metadata) {
        super(__image, __metadata);

        /** Data of a single animation.
         * @typedef {Object} AnimationsMetadata
         * 
         * @property {[x: number, y: number, w: number, h: number][]} frames
         * List of frame's positions on the image.
         * 
         * Each frame is represented as an array of four numbers:
         * * `0`(`x`) - frame's position on x axis on the image;
         * * `1`(`y`) - frame's position on y axis on the image;
         * * `2`(`w`) - frame's width;
         * * `3`(`h`) - frame's height;
         * 
         * @property {{[animation_name: string]: AnimationData;}} animations
         * Dictionary of animations, defined by frames and timestamps.
         * 
         * @typedef {Object} AnimationData
         * @property  {([index: number]|[x: number, y: number, w: number, h: number][])} frames 
         * List of frames in this animation. May be defined in two ways:
         * 1. List of frames by their indexes in {@link VisualImageAnimated.frames};
         * 2. List of frame definitions like in {@link VisualImageAnimated.frames};
         * 
         * @property  {boolean} duration_based 
         * Defines if {@link AnimationData.duration} is used for frame changing instead of {@link AnimationData.timestamps}.
         * 
         * @property  {number} duration 
         * Duration of this animation. 
         * 
         * Used only if {@link AnimationData.duration_based} is `true`.
         * 
         * @property {boolean} repeat
         * Should animation run in repeat or say on last frame on finish.
         * 
         * @property  {number[]} timestamps 
         * List of timestamps in seconds from start of animation. 
         * 
         * Each timestamp at index starts corresponding frame in {@link AnimationData.frames} at index. 
         * 
         * Used only if {@link AnimationData.duration_based} is `false`.
         */


        /**
         * @type {AnimationsMetadata}
         */
        this.metadata;

        // Metadata fixes.
        // - Animation fixes.
        for (const [_animation_name, _animation_data] of Object.entries(this.metadata.animations)) {

            // Fix animation timestamps.
            if (_animation_data.timestamps.length == 0)
                _animation_data.timestamps = Array.from(
                    { length: _animation_data.frames.length },
                    (_, _frame_index) => _frame_index / _animation_data.frames.length
                );
                console.log(_animation_data.timestamps);
        }



        this.currentAnimationName = undefined;
        this.currentAnimationStartTime = undefined;
    }


    StartAnimation(__animationName) {
        this.currentAnimationName = __animationName;
        this.currentAnimationStartTime = Date.now();
    }


    __GetCurrentFrame(__default = 0) {
        var _animation = this.metadata.animations[this.currentAnimationName];
        var _frameIndex = 0;
        var _progress = (Date.now() - this.currentAnimationStartTime) / _animation.duration;

        // repeat fix
        if (_animation.repeat) _progress %= 1.0;

        for (let _timestampIndex = _animation.timestamps.length -1; _timestampIndex >= 0; _timestampIndex--) {
            if (_animation.timestamps[_timestampIndex] <= _progress) {
                _frameIndex = _timestampIndex;
                break;
            }
        }

        return _animation.frames[_frameIndex];
    }


    /** 
     * @override
     * @param {CanvasRenderingContext2D} __context
     * @param {number} __x 
     * @param {number} __y 
     * @param {{[arg_name:string]: any}} __argv 
     */
    Draw(__context, __x, __y, __argv) {
        var _frame = this.__GetCurrentFrame();
        __context.drawImage(this.image,
            ..._frame,
            __x, __y,
            _frame[2] * __argv.scale,
            _frame[3] * __argv.scale,
        );
    }
}



/** Hash for loaded images.
 * @type {{[path: string]: [HTMLImageElement, Object];}}
 */
const LOADED_IMAGES = {};



/**
 * 
 * @param {string} __path 
 * @returns {[image: HTMLImageElement, metadata: ImageData]}
 */
function GetLoadedImage(__path) {
    return LOADED_IMAGES[__path];
}


export const VISUAL_IMAGE_TYPES = [
    VisualImageAnimated,
    VisualImage,
];



function GetVisualImageType(__type) {
    return VISUAL_IMAGE_TYPES.find((_visualImageType => _visualImageType.type == __type));
}



/**
 * 
 * @param {string} __path 
 * @returns {VisualImage}
 */
export function MakeVisualImage(__path) {
    var [_image, _metadata] = GetLoadedImage(__path);
    var _visualImageType = GetVisualImageType(_metadata.type);

    return new _visualImageType(_image, _metadata);

}



/** Loads Image into hash.
 * 
 * Loaded image and its metadata must have the same name and location.
 * 
 * By default, image extension is `png`, and metadata's is `json`. Use {@link __image_extension} and {@link __metadata_extension} to change this behavior.
 * 
 * Oh! And when if you use an svg, make sure that `<svg>` element has `width` and `height` parameters set up.
  * 
 * @see {@link GetImage} to access hashed data.
 * 
 * @see {@link UnloadImage} and {@link UnloadAllImages} to remove data from hash.
 * 
 * @param {string} __path 
 * Path to image and metadata minus extension.
 * 
 * Note that image shares its name with its metadata.
 * 
 * @param {string?} __image_extension 
 * Extension of image file.
 * 
 * @param {string?} __metadata_extension
 * Extension of metadata file.
 * 
 * @returns {Promise<ImageWithMetadata>} Loaded image with metadata imbedded inside.
 */
export async function LoadImage(__path, __image_extension = "png", __metadata_extension = "json") {

    return new Promise((_resolve, _reject) => {

        /** New image for loaded data. @type {HTMLImageElement} */
        var _image = new Image();

        /** New metadata for loaded data. @type {Object} */
        var _metadata = undefined;

        Promise.all([

            // Load image.
            new Promise((_resolve) => {

                // Set resolve on load.
                _image.onload = () => _resolve();

                // Set image to load.
                _image.onerror = _reject;
                _image.src = `${__path}.${__image_extension}`;
            }),

            // Load metadata.
            new Promise((_resolve) => {
                fetch(`${__path}.${__metadata_extension}`)
                    .then((_response) => _response.json())
                    .then((_json) => _metadata = _json)
                    .then(() => _resolve());
            }),
        ]).then(() => {

            // Save loaded data.
            LOADED_IMAGES[__path] = [_image, _metadata];
            _resolve(LOADED_IMAGES[__path]);
        });
    });
}


export function UnloadImage(__path) { }
export function UnloadAllImages() { }