const express = require("express");
const participantController = require("../controllers/participant.controller");

const router = express.Router();
//Retrieve all participants
router.get("/", participantController.list);

// Create a participant
router.post("/", participantController.create);

//Retrieve a participant
router.get("/:reference_number", participantController.findOneOrFail);

//Update a participant
router.put("/:reference_number", participantController.update);

//delete a participant
router.delete("/:reference_number", participantController.removeParticipant);

module.exports = router;
