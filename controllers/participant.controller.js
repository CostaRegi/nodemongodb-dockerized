const Participant = require("../models/participant.model");
const ReferenceNumberController = require("./reference-number.mock.controller");

// Create and save new participant
exports.create = async (req, res) => {
  //Validate request
  //Validating that first_name, last_name and phone_number are passed because
  //they are used to generate a reference number
  if (
    !req.body ||
    !req.body.first_name ||
    !req.body.last_name ||
    !req.body.phone_number
  ) {
    return res.status(400).send("Invalid details were provided");
  }
  //make sure first_name, last_name and phone_number have the correct format
  if (
    req.body.first_name === 0 ||
    req.body.last_name.length === 0 ||
    req.body.phone_number.length < 4
  ) {
    return res.status(400).send("Invalid details were provided");
  }
  //user reference number microservice to generate the reference number
  let referenceNumber = ReferenceNumberController.createReferenceNumber(
    req.body
  );

  try {
    let newParticipant = new Participant({
      ...req.body,
      reference_number: referenceNumber,
    });

    const persitedParticipant = await newParticipant.save();
    res.status(200).send(persitedParticipant);
  } catch (err) {
    /* In case some error happens menawhile saving to the database
     * a 400 status code is sent as response.
     */
    res.status(400).send("Unable to save participant to database");
  }
};

//update a participant
exports.update = async (req, res) => {
  //Validate body
  if (!req.body) {
    return res.status(400).send("Please fill out all required information");
  }
  try {
    const participant = await Participant.findOneAndUpdate(
      { reference_number: req.params.reference_number },
      { ...req.body },
      { new: true }
    );
    res.status(200).send(participant);
  } catch (err) {
    return handleError(err, req, res);
  }
};

//find one participant
exports.findOneOrFail = async (req, res) => {
  try {
    const participant = await Participant.findOne({
      reference_number: req.params.reference_number,
    });
    if (!participant) {
      res
        .status(404)
        .send(
          `Participant with reference id ${req.params.reference_number}  not found!!!`
        );
    }
    res.status(200).send(participant);
  } catch (err) {
    return handleError(err, req, res);
  }
};

//Delete one participant if it exists otherwise it will send a 404
exports.removeParticipant = async (req, res) => {
  try {
    const pdeleted = await Participant.findOneAndDelete({
      reference_number: req.params.reference_number,
    });
    if (pdeleted) {
      res.status(200).send("Participant removed successfully!");
    } else {
      res
        .status(404)
        .send(
          `Participant with reference id ${req.params.reference_number}  not found!!!`
        );
    }
  } catch (err) {
    return handleError(err, req, res);
  }
};

//Get all participants, this might need to be reviewd to include some sort of pagination option
//when number of users get bigger it could impact performance
exports.list = async (req, res) => {
  try {
    const participants = await Participant.find().exec();
    console.log("I was called");
    if (participants.length === 0) {
      res.status(200).send("No participants found");
    }
    res.status(200).send(participants);
  } catch (err) {
    res.status(500).send(err.message || "Something went wrong");
  }
};

//A utility function to handle errors when user Id does not exist
const handleError = (err, res, req) => {
  if (err.kind === "ObjectId") {
    return res
      .status(404)
      .send(
        `Participant with reference id ${req.params.reference_number} not found`
      );
  } else {
    return res
      .status(500)
      .send("Not able to perform operations internal server error");
  }
};
