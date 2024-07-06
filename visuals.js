/**
 * @type {[imagePath: string]: HTMLImageElement}
 */
const LOADED_IMAGES = {}

export class AppVisuals {
    static async LoadImage(__imagePath) {
        return new Promise((resolve, reject) => {
            var _image = new Image();
            _image.onload = () => {
                LOADED_IMAGES[__imagePath] = _image;
                resolve(_image);
            }
            _image.onerror = reject;
            _image.src = __imagePath;
        });
    }
    static GetImage(__imagePath) {
        console.log(LOADED_IMAGES);
        var _image = LOADED_IMAGES[__imagePath];
        console.assert(_image == undefined, "AAASDASD");

        return _image;
    }
}