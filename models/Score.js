// Imports the module that contains the database connection:
const database = require("../data/database");

/**
 * Represents a score in the database.
 * @property { number } _id - The id of the score.
 * @property { string } moves - The number of moves made by the player.
 * @property { string } time - The time it took the player to complete the game in milliseconds.
 * @note: The name of the player could be saved as well but the project requirements do not mention it.
 */
class Score {

    constructor(moves, time) {
        this.moves = moves;
        this.time = time;
        this._id = null;
    }

    /*
    According to the project requirements, it is only necessary to be able to save a score, and retrieve the highest ones.
    Therefore, only the following methods are implemented:
    - save: save the score entity in the database.
    - get.highest: retrieve the highest api from the database.
    - delete.all: delete all the api from the database.
     */


    /**
    * Get score(s) from the database.
    * @property { function } highest - Retrieves the highest api from the database asynchronously.
    * @note: Others static methods could be implemented to retrieve api based on other criteria.
    */
    static get = {
        /**
        * Get the highest api from the database.
        * The api are sorted by the time made by the player, then the number of moves.
        * @param { number } limit - The number of api to retrieve. Default value: 20.
        * @returns { {Score}[] } - The array of Score objects.
        */
        highest: async (limit = 20) => await database.schema.collection("scores")
            .find({})
            .sort({time: 1, moves: 1})
            .limit(limit)
            .toArray()
    };

    /**
    * Delete score(s) from the database.
    * @property { function } all - Deletes all the api from the database asynchronously.
     */
    static delete = {
        /**
         * Delete all the api from the database asynchronously.
         */
        all: async () => { await database.schema.collection("scores").deleteMany({}); }
    }

    /**
     * Save the score entity in the database asynchronously.
     * @returns { Score } - The score entity with the _id property set.
     */
    save = async () => await database.schema.collection("scores").insertOne(this);
}

// Exports the class:
module.exports = Score;