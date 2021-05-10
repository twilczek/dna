const express = require("express");
const { UserController } = require("../controllers");

const getUserRoutes = function () {
  const userRoutes = express.Router();
  userRoutes.route("/create").post((req, res) => {
    return new UserController().createUser(req, res);
  });
  userRoutes
    .route("/:id")
    .get((req, res) => {
      return new UserController().getUser(req, res);
    })
    .patch((req, res) => {
      return new UserController().patchUser(req, res);
    })
    .delete((req, res) => {
      return new UserController().deleteUser(req, res);
    });

  return userRoutes;
};

module.exports = getUserRoutes;
