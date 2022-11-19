/**
 * @property { function } increment: Increments the counter.
 * @property { function } display: Displays the counter.
 * @property { function } reset: Resets the counter.
 * @property { number } counter: The number of moves.
 * @property {HTMLElement} document: The HTML element that displays the counter.
 */
export default class Counter {
    static counter = 0;
    static document = document.querySelector("#counter");

    /**
     * Increments the counter.
     */
    static increment() {
        Counter.counter++;
        Counter.display();
    }

    /**
     * Displays the counter.
     */
    static display() { Counter.document.innerHTML = `${Counter.counter}`; }

    /**
     * Resets the counter.
     */
    static reset() {
        Counter.counter = 0;
        Counter.display();
    }
}