// Initializes a new image:
const image = new Image();
image.src = "assets/fruits.png";
image.onload = split;

// Initializes an array to hold the images:
const images = [];

/**
 * Splits the image into 18 images.
 * The images are drawn from the original image (on a virtual canvas), and are added to the images array.
 */
function split() {
    // Creates a virtual canvas:
    const canvas = document.createElement("canvas");
    for (let index = 0; index < 18; index++) {
        // Define the size and gets the context of the virtual canvas:
        canvas.width = image.width;
        canvas.height = image.height / 18;
        const context = canvas.getContext("2d");
        // Draws the image on the virtual canvas:
        context.drawImage(image, 0, index * canvas.height, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
        // Pushes the image to the images array, with the index (to use it as identifier):
        images.push({ src: canvas.toDataURL(), index });
    }
}

// Exports the images array:
export { images };




