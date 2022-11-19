// Dependencies:
const express = require("express");

// Imports the controller used to handle the requests:
const controller = require("../controllers/scores");

// Initializes the router:
const router = express.Router();

// POST /api/api - Saves a score:
router.post("/scores", controller.save);

// GET /api/api - Gets the (highest) api:
router.get("/scores", controller.get.highest);

// DELETE /api/api - Deletes all the api:
router.delete("/scores", controller.delete.all);

// Exports the router:
module.exports = router;