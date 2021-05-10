const express = require("express");
const { OffersController } = require("../controllers");

const getJobOffersRoutes = function () {
  const jobOfferRoutes = express.Router();

  jobOfferRoutes.route("/save").post((req, res) => {
    return new OffersController().save(req, res);
  });
  return jobOfferRoutes;
};

module.exports = getJobOffersRoutes;
