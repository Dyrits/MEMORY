/**
* Handles the storage of the scores in the local storage.
* @note The local storage is used as a fallback if the connection to the database fails.
 */
export const storage = {
    scores: {
        get: {
            /**
             * Gets the sorted highest scores from the local storage.
             * @returns { { moves: number, time: number }[] } - The sorted highest scores.
             */
            highest: () => JSON.parse(localStorage.getItem("scores") || "[]")
                    .sort((score$a, score$b) => score$a.time - score$b.time)
        },
        /**
         * Saves a score in the local storage (up to 20 scores can be stored).
         * @param { { moves: number, time: number } } score - The score to save.
         * @returns { { moves: number, time: number } } - The saved score.
        */
        save: (score) => {
            // Gets the scores from the local storage:
            const scores = storage.scores.get.highest();
            // Adds the new score:
            scores.push(score);
            // Sets the scores in the local storage, slicing the array to keep only the 20 highest scores:
            localStorage.setItem(
                "scores",
                JSON.stringify(scores.sort((score$a, score$b) => score$a.time - score$b.time).slice(0, 20))
            );
            return score;
        }
    }
}