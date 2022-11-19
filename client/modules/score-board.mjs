// Imports the Timer class:
import Timer from "./classes/Timer.mjs";

/**
* Opens the modal and sets up the display.
* @param { { moves: number, time: number}[] } scores - The scores to display.
* @param { { moves: number, time: number } | null } [current=null] - The score of the player.
* @param { boolean | null } [victory=null] - True if the player won, false if the player lost, null if the game is not started.
*
 */
function open(scores, current = null, victory = null) {
    // Gets the modal and displays it:
    document.querySelector("#score-board").style.display = "block";
    // Empties the result section:
    const result = document.querySelector("#result");
    result.replaceChildren()
    // If a score is provided, it is displayed.
    if (victory && current) {
        // Creates and add the outcome first paragraph:
        let paragraph = document.createElement("p");
        paragraph.textContent = `You completed the game!`;
        result.append(paragraph);
        // Creates and add the outcome second paragraph:
        paragraph = document.createElement("p");
        paragraph.textContent = `Moves: ${current.moves} | Time: ${Timer.format(current.time)}`;
        result.append(paragraph);
    } else if (victory === false) {
        // Creates and add the outcome text:
        let paragraph = document.createElement("p");
        paragraph.textContent = `You lost! You ran out of time!`;
        result.append(paragraph);
        result.classList.add("red");
    }
    // Gets the list of scores and empties it:
    const list = document.querySelector("#scores-list");
    list.replaceChildren();
    // If scores are provided, they are displayed. Else, a message is displayed.
    if (scores.length) {
        // For each score, a list item is created and added to the list.
        scores.forEach((score, index) => {
            const element = document.createElement("li");
            element.innerHTML = `${index + 1} - Moves: ${score.moves} | Time: ${Timer.format(score.time)}`;
            if (current && current.moves === score.moves && current.time === score.time) {
                element.classList.add("green");
            }
            list.appendChild(element);
        })
    } else {
        const element = document.createElement("li");
        element.innerHTML = "No scores available yet.";
        list.appendChild(element);
    }

}

/**
 * Closes the modal.
 */
function close() { document.querySelector("#score-board").style.display = "none"; }

// Exports the functions:
export { open, close };