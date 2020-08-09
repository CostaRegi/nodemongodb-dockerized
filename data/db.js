const mongoose = require("mongoose");

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB,
} = process.env;

//Database connection string
const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

//Connect to the database
mongoose
  .connect(url, {
    useNewUrlParser: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    connectTimeoutMS: 10000,
  })
  .then(function () {
    //Only here for development purpose should be removed for production
    console.log("MongoDB is connected");
  })
  .catch(function (err) {
    console.log(err);
  });
