// Imports the modules:
import { api } from "./modules/api.mjs";
import { initialize } from "./modules/game.mjs";
import { open, close } from "./modules/score-board.mjs";

// Initializes the game:
window.onload = async function() {
    // Synchronizes the local storage with the database:
    await api.scores.sync();
    const scores = await api.scores.get.highest();
    open(scores);
    const rank = document.querySelector("#controls-rank");
    rank.addEventListener("click", () => open(scores));
    // Initializes the game when the user clicks on the start button:
    const start = document.querySelector("#controls-start");
    start.addEventListener("click", close);
    start.addEventListener("click", initialize);
    // @Note: Most of the game logic is in the game.mjs module.
}

