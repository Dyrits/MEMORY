// Imports the model:
const Score = require("../models/Score");

module.exports = {
    /**
     * Handle the GET request to the /api/api routes.
     */
    get : {
        /**
         * Handle the GET request to the /api/api routes.
         * By default, the highest scores are retrieved (which is the only handler available).
         */
        highest: async ({ query }, response, next) => {
            try {
                // Retrieve the scores using the limit parameter if it is provided:
                const scores = await Score.get.highest(Number(query.limit));
                // Send the api as a response to the client:
                response.status(200).json(scores);
            // Pass the error to the middleware that handles errors:
            } catch (error) { next(error); }
        }
    },
    /**
     * Handle the DELETE request to the /api/api routes.
     */
    delete: {
        /**
         * Handle the DELETE request to the /api/api routes.
         * Deletes all the scores.
         */
        all: async (request, response, next) => {
            try {
                // Delete all the scores:
                await Score.delete.all();
                // Send a response to the client:
                response.status(202).json({ message: "The scores have been deleted." });
            // Pass the error to the middleware that handles errors:
            } catch (error) { next(error); }
        }
    },
    /**
     * Handle the POST request to the /api/api route.
     * Create a new Score entity and save it into the database.
     */
    save: async ({ body }, response, next) => {
        try {
            // Create a new Score entity:
            const score = new Score(body.moves, body.time);
            // Save the score in the database:
            await score.save();
            // Send the saved score back to the client:
            response.status(201).json(score);
        }
        // Pass the error to the middleware that handles errors:
        catch(error) { next(error); }
    }
};