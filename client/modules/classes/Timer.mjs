/**
 * Handles the timer for the game.
 * @property { function } initialize: Initializes the timer.
 * @property { function } start: Starts the timer.
 * @property { function } stop: Stops the timer.
 * @property { function } reset: Resets the timer.
 * @property { function } display: Displays the timer.
 * @property { HTMLElement } timer: The HTML element that displays the timer.
 * @property { HTMLElement } progress: The HTML element that displays the progress bar.
 * @property { NodeJS.Timer } interval: The HTML element that displays the timer.
 * @property { number } start: The date in milliseconds when the timer started.
 * @property { number } elapsed: The number of milliseconds elapsed.
 */
export default class Timer {
    static timer = document.querySelector("#timer");
    static progress = document.querySelector("#progress-bar");
    static interval = null;
    static start = null;
    static elapsed = 0;

    /**
     * Initialize the timer.
     */
    static initialize () {
        if (!Timer.interval) {
            // Initializes the start time:
            Timer.start = Date.now();
            // Initializes the interval to update the timer every 10 milliseconds:
            Timer.interval = setInterval(() => {
                // Calculates the time elapsed with the Date.now() method, being more accurate:
                Timer.elapsed = Date.now() - Timer.start;
                // Displays the elapsed time:
                Timer.display();
            }, 10);
        }
    }
    /**
     * Stop the timer and returns the elapsed time.
     */
    static stop () {
        Timer.elapsed = Date.now() - Timer.start;
        // Stops the timer, clearing the interval:
        clearInterval(Timer.interval);
        Timer.interval = null;
        return Timer.elapsed;
    }

    /*
     * Formats the time from milliseconds to minutes, seconds and centiseconds.
     * @params { number } [time=Timer.elapsed] - The time in milliseconds.
     * @returns { string } The formatted time.
    */
    static format(time = Timer.elapsed) {
        const minutes = Math.floor(time / 60000);
        const seconds = ((time % 60000) / 1000).toFixed(0);
        const centiseconds = Math.floor((time % 1000) / 10);
        return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}:${centiseconds < 10 ? "0" : ""}${centiseconds}`;
    }

    /**
     * Displays the time on the DOM timer element.
     */
    static display() {
        Timer.timer.innerHTML = Timer.format();
        Timer.progress.value = Timer.elapsed;
    }

    /*
     ** Resets the timer:
     */
    static reset() {
        // Strops the timer if it is running:
        Timer.interval && Timer.stop();
        Timer.elapsed = 0;
        Timer.display();
    }
}

