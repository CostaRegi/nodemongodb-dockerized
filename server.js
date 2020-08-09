const express = require("express");
const Participant = require("./routes/participant.route");
const swaggerDocumentNewBeginnings = require("./api-doc/swagger.json");
const swaggerUi = require("swagger-ui-express");
const db = require("./data/db");

const port = process.env.PORT || 8080;
const app = express();
app.use(express.json());

//All participants request are handled by the participant microservice
app.use("/participants", Participant);

//Api documentation
app.use(
  "/api-docs/new-beginnings",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocumentNewBeginnings)
);

app.listen(port, () => {
  console.log(`app listening on ${port}!`);
});
