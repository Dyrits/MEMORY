# Memory

A web implementation of the Memory game, created as a technical test for a job application.

## About The Project

The specifications are described in the dedicated [document](https://github.com/Dyrits/MEMORY/blob/main/specifications.pdf). A few changes have been made, such as:

- The fruits are not displayed as squares, but as circles. They are displayed a few seconds at the start of the game before being hidden.
- The scores and the results are displayed in a modal window.
- The local storage is used to store the scores if the database is not available.
- The already revealed fruits have a different border (in order to help the players), as well as the fruits that are selected or already matched.

The project has been made to run locally. To run it on a server, the endpoint defined in the `client/modules/api.mjs` module must be redefined, and an `.env` file must be created with the information of the server and the database. It may require installing the dependency `dotenv` and importing it in the files using the environment variables.

### Status

The project has been completed.

### Built With

- HTML / CSS / Sass
- JavaScript
- Node.js + Express
- MongoDB (via Docker)

## Getting Started

### Prerequisites

- Node.js
- Docker (optional, for the database)

### Installation

- Clone the repository.
- Install the dependencies with `npm install`.
- (Requires Docker) Start the database with `npm run docker:database:start` (or `docker-compose up`). If Docker is not installed, the local storage of the browser will be used instead.
- Start the server with `npm run node:server:start` (or `node app.js`).

If there are no environment variables set, the server will start on port 3000. Check the terminal for more information.

## License

MIT is declared in `package.json`; no license file is present in this repository.

## Contact

Dylan J. Gerrits - [GitHub](https://github.com/Dyrits)
