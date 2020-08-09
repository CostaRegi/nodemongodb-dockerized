const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Participant = new Schema({
  reference_number: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  //Instead of using type date I choose to save it as a string, please note that there is no
  //proper format is defined for the date and no validations are made so it would accept any string,
  date_of_birth: { type: String, required: true },
  phone_number: { type: String, required: true },
  address: { type: String, required: true },
});

module.exports = mongoose.model("Participant", Participant);
