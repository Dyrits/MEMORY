import { storage } from "./storage.mjs";

/**
 * Handles the call to the API to get or save the scores. If the API is not available, it uses the local storage.
 * @note: Simple functions could be used instead of an object wrapping them all. It is a matter of personal preferences. It also mirrors the structure of the API.
 */
export const api = {
    scores: {
        endpoint: "http://localhost:3000/api/scores",
        get: {
            /**
             * Gets the highest scores from the API.
             * @params { number } [limit=10] - The number of scores to get.
             * @returns { Promise<{ moves: number, time: number }[]> } - The highest scores.
             */
            highest: async(limit = 10) => {
                try {
                    // Tries to get the scores from the API:
                    const response = await fetch(`${api.scores.endpoint}${limit ? `?limit=${limit}` : ""}`);
                    // Returns the scores, if the response is ok:
                    if (response.ok) { return await response.json(); }
                    // If the response is not ok, it logs the error message and uses the local storage.
                    else {
                        const { message } = await response.json();
                        console.error(message);
                        console.warn("The score could not be retrieved from the database. They will be retrieved from the local storage.");
                        return storage.scores.get.highest();
                    }
                } catch(error) { console.error(error); }
            }
        },
        /**
         * Saves a score in the API.
         * @param { number } moves - The number of moves.
         * @param { number } time - The time in milliseconds.
         * @param { boolean } sync - If true, the score is not saved in the local storage if the API is not available.
         * @returns { Promise<{ moves: number, time: number }> | { moves: number, time: number } } - The saved score.
         */
        save: async(moves, time, sync) => {
            try {
                // Tries to save the score in the API:
                const response = await fetch(api.scores.endpoint, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ moves, time })
                });
                // Returns the score, if the response is ok:
                if (response.ok) { return await response.json(); }
                // If the response is not ok, it logs the error message and uses the local storage.
                else {
                    const { message } = await response.json();
                    console.error(message);
                    if (!sync) {
                        console.warn("The score could not be saved in the database. It will be saved locally.");
                        return storage.scores.save({ moves, time });
                    }
                }
            } catch(error) { console.error(error); }
        },
        /**
         * Synchronizes the scores from the local storage to the API.
         * @returns { Promise<boolean> } - True if the synchronization is successful or unnecessary, false otherwise.
         */
        sync: async() => {
            // Gets the scores from the local storage:
            const $scores = storage.scores.get.highest();
            if ($scores.length) {
                const results = $scores.map( async (score) => await api.scores.save(score.moves, score.time, true));
                // The api returns false if the score could not be saved in the database.
                if (results.every(result => result)) {
                    // If all the promises are resolved, the local storage is cleared:
                    localStorage.removeItem("scores");
                    console.info("The scores have been synced with the database.");
                    return true;
                } else {
                    console.warn("The api could not be synced with the database.");
                    return false;
                }
            } else { return true; }
        }
    }
}