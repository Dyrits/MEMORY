// Dependencies:
const path = require("path");
const express = require("express");

// Imports the module that contains the database connection:
const database = require("./data/database");

const app = express();

// Dictionary of middlewares:
const middlewares = {
    errors: require("./middlewares/errors"),
}

// Dictionary of routes:
const routes = {
    api: require("./routes/api"),
}

// Allows the server to parse JSON data:
app.use(express.json());

// Allows the server to use static files:
app.use(express.static("client/"));

// Sends the index.html file to the client:
app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "client/index.html"));
});

// Uses the dedicated route for the /api path:
app.use("/api", routes.api);

// The error middleware must be the last one to be used, since the request is passed to it only if an error occurs.
app.use(middlewares.errors);

// The other routes are handled with a 404 error.
app.use("*", (request, response) => {
    response.status(404).json({ message: "The requested resource was not found." });
});

// Connects to the database and starts the server:
database.connect()
    .catch(error => {
        console.error(error);
        // If the connection to the database fails, the local storage is used instead.
        console.error("The connection to the database has failed. The application will use the local storage instead.");
    })
    .finally(() => {
        // The port and the host are defined in the .env file, or they are set to the default values.
        const port = process.env.PORT || 3000;
        const address = process.env.URI || `http://localhost:${port}`;
        // The server is started, even if the database connection failed:
        app.listen(port, () => {
            console.info(`The server started on port ${port}.`);
            console.info(`The webpage is available at ${address}.`);

        });
});