//This is just a mock of the create reference participant number
//We concatenate the first characters of first name and last name plus the 4 last digit of phone number
//this solution would not work on real world scenario because of potential colition
exports.createReferenceNumber = (participant) =>
  `${participant.first_name[0]}${
    participant.last_name[0]
  }-${participant.phone_number.slice(-4)}`.toUpperCase();
