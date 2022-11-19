// Imports the classes and modules:
import Timer from "./classes/Timer.mjs";
import Counter from "./classes/Counter.js";
import { images } from "./images.mjs";
import { api } from "./api.mjs";
import { open } from "./score-board.mjs";

// Gets the board element:
const board = document.querySelector("#game-board");

// Adds the shuffle method to the Array prototype:
Array.prototype.shuffle = function() {
    return this.reduce((shuffled, element, index) => {
        // Gets a random index between 0 and the length of the array.
        const random = index + Math.floor( Math.random() * (this.length - index) );
        // Swaps the value:
        [shuffled[random], shuffled[index]] = [shuffled[index], shuffled[random]]
        // Returns the shuffled array:
        return shuffled
    }, [...this]);
}

/**
 * Creates a fruit image element.
 * @param { { src: string, index: number } } image - The image to use.
 * @returns { HTMLImageElement } The fruit image element.
 */
function create(image) {
    const fruit = document.createElement("img");
    fruit.src = image.src;
    fruit.dataset.index = image.index.toString();
    // Initializes the status of the fruit to "unselected":
    fruit.dataset.status = "unselected";
    fruit.classList.add("fruit");
    return fruit;
}

/**
 * Displays a fruit on the board.
 * @param { HTMLImageElement } fruit - The fruit to display.
 */
function display(fruit) {
    // The fruits are added to the board 0 to 2..5 seconds after they are created:
    setTimeout(() => { board.appendChild(fruit); }, Math.floor(Math.random() * 2500));

    // The fruits are masked 2.5 to 5 seconds after they are created:
    setTimeout(() => {
        fruit.classList.add("masked");
        // The event listeners are added when the fruit is masked:
        fruit.addEventListener("click", Timer.initialize);
        fruit.addEventListener("click", reveal);
    }, 2500 + Math.floor(Math.random() * 2500));
}

/**
 * Reveal a fruit.
 * @param { MouseEvent } event - The click event.
 */
function reveal({ target}) {
    // Removes the .masked class from the fruit:
    target.classList.remove("masked");
    // Sets the status of the fruit to "selected":
    target.dataset.status = "selected";
    // Gets the selected fruits:
    const selected = document.querySelectorAll(`[data-status="selected"]`);
    // If there are 2 selected fruits, they are checked for a match.
    if (selected.length === 2) { match(selected); }
}

/**
 * Checks if the selected fruits are a match.
 * @param { NodeListOf<HTMLImageElement> } fruits - The selected fruits.
 */
function match(fruits) {
    // Increments the counter of moves:
    Counter.increment();
    // For each fruit, the status is updated according to the match.
    fruits.forEach(fruit => {
        if (fruits[0].dataset.index === fruits[1].dataset.index) {
            fruit.dataset.status = "matched";
            fruit.removeEventListener("click", reveal);
        } else {
            fruit.dataset.status = "unmatched";
            // The fruits are masked 0.5 seconds after they are unmatched.
            setTimeout(() => fruits.forEach(fruit => { fruit.classList.add("masked"); }), 500);
        }
    })
    // If all the fruits are matched, the game ends.
    if (document.querySelectorAll( `[data-status="matched"]`).length === images.length * 2) { end(); }
    // If the timer is above 5 minutes, the game ends. The player is allowed to complete a pair even after the timer is above 5 minutes.
    else if (Timer.elapsed > 180000) { end(false); }
}

/**
 * Ends the game.
 * Saves the score and opens the score board.
 * @param { boolean } [victory=true] - Whether the player won or not.
 */
function end(victory = true) {
    const moves = Counter.counter;
    const time = Timer.stop();
    if (victory) {
        api.scores.save(moves, time, false).then(score => {
            api.scores.get.highest().then(scores => open(scores, score));
        });
    } else { api.scores.get.highest().then(scores => open(scores, { moves, time }, false)) }
}

/**
 * Initializes the game.
 */
function initialize() {
    // Resets the counter of moves and the timer:
    Counter.reset();
    Timer.reset();
    // Get the fruits and removes them from the board:
    const fruits = board.childNodes;
    board.replaceChildren();
    // If the board is not empty, the fruits are shuffled and displayed.
    if (fruits.length) { [...fruits].shuffle().forEach(display); }
    // Else, the fruits are created, shuffled and displayed.
    else { [...images, ...images].shuffle().map(create).forEach(display); }
}

// Exports the initialize method:
export { initialize };