# Memory

## Table of contents
- [Related content](#related-content)
- [Technologies](#technologies-and-tools)
- [Installation](#installation)
- [Status](#status)
    - [Features](#features)
    - [Issues](#issues)
- [Contributing](#contributing)
- [Licence](#licence)
- [Contact](#contact)

## Related content
This project is part of a technical test for a job application. The test was to create a web application that implements the game "Memory".

## Technologies and tools
<a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/></a>
<a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/></a>
<a href="https://sass-lang.com" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/sass/sass-original.svg" alt="sass" width="40" height="40"/></a>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/></a>
<a href="https://nodejs.org" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/></a>
<a href="https://expressjs.com" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/></a>
<a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/></a>
<a href="https://www.docker.com/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg" alt="docker" width="40" height="40"/></a>

## Installation
- Clone the repository
- Install the dependencies with `npm install`
- (Requires Docker) Start the database with `npm run docker:database:start` (or `docker-compose up`)  
If Docker is not installed, the local storage of the browser will be used instead.
- Start the server with `npm run node:server:start` (or `node app.js`)  

If there are no environment variables set, the server will start on port 3000. Check the terminal for more information.

## Status
The project has been completed.

### Features
The specifications are described in the dedicated [document](https://github.com/Dyrits/MEMORY/blob/main/specifications.pdf).
A few changes have been made, such as:
- The fruits are not displayed as squares, but as circles. They are displayed a few seconds at the start of the game before being hidden.
- The scores and the results are displayed in a modal window.
- The local storage is used to store the scores if the database is not available.
- The already revealed fruits have a different border (in order to help the players), as well as the fruits that are selected or already matched.

### Issues
The project has been made to run locally.  
To run it on a server, the endpoint defined in the `client/modules/api.mjs` module must be redefined, and an `.env` file must be created with the information of the server and the database. 
It mays require to install the dependency `dotenv` and import it to the files using the environment variables.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate (if any).

## Licence
[![Licence](https://img.shields.io/github/license/Ileriayo/markdown-badges?style=for-the-badge)](./LICENSE)

## Contact
Created by [Dylan J. Gerrits](https://github.com/Dyrits).
