// Imports MongoClient:
const { MongoClient } = require("mongodb");

module.exports = {
    // The URI is defined in the .env file, or it is set to the default value.
    _uri: process.env.NODE_ENV === "production" ? process.env.MONGODB_URI : "mongodb://localhost:27017/",
    /**
     * Connect to the database using MongoClient.
     */
    connect: async function() {
        console.info("Connecting to database...");
        try {
            const client = await MongoClient.connect(this._uri);
            if (client) {
                console.info("The connection to the database is successful. Retrieving the schema...");
                this._schema = client.db("memory");
                this._schema ? console.info("The schema has been initialized.") : console.error("The schema has not been initialized.");
            }
        } catch (error) { throw { message: "The connection to the database could not been established." } }
    },
    /**
     * Gets the schema of the database if it has been initialized.
     */
    get schema() {
        if (!this._schema) {
            throw { message: "The connection to the database has not been established." }
        }
        return this._schema;
    }
}