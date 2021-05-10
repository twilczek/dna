const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { getUserRoutes, getJobOfferRoutes } = require("./src/routes");

const app = express();
const port = process.env.NODE_ENV === "testing" ? 4000 : 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/users", getUserRoutes());
app.use("/offers", getJobOfferRoutes());

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Listening on port ${port}!`));

module.exports = {
  app,
};
