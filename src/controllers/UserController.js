const { verifyCreateUserBody } = require("../utils/verifyCreateUserBody");

const { UserService } = require("../services");

module.exports = class UserController {
  constructor(userService = new UserService()) {
    this.userService = userService;
  }

  async createUser(req, res) {
    const { body } = req;
    if (!verifyCreateUserBody(body)) {
      res.status(400);
      return res.json(
        this.errorResponse("Missing or incorrect user creation data")
      );
    }
    try {
      const response = await this.userService.createUser(req.body);
      return res.status(200).json(response);
    } catch (e) {
      res.status(500);
      return res.json(this.errorResponse(e.message));
    }
  }

  async getUser(req, res) {
    const { id } = req.params;
    if (!id) {
      res.status(400);
      return res.json(this.errorResponse("Missing user selector"));
    }
    try {
      const response = await this.userService.findUser(id);
      return res.status(200).json(response);
    } catch (e) {
      res.status(500);
      return res.json(this.errorResponse(e.message));
    }
  }

  async patchUser(req, res) {
    const { id } = req.params;
    const { body } = req;
    if (!id) {
      res.status(400);
      return res.json(this.errorResponse("Missing user selector"));
    }
    const writeAbleFields = ["login", "name", "password"];
    const patchPayload = writeAbleFields.reduce((acc, field) => {
      if (body[field]) {
        acc[field] = body[field];
      }
      return acc;
    }, {});
    if (!Object.keys(patchPayload).length) {
      res.status(400);
      return res.json(this.errorResponse("No data to update"));
    }
    try {
      const response = await this.userService.patchUser(id, patchPayload);
      res.status(200);
      return res.json(response);
    } catch (e) {
      res.status(500);
      return res.json(this.errorResponse(e.message));
    }
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    if (!id) {
      res.status(400);
      return res.json(this.errorResponse("Missing user selector"));
    }
    try {
      await this.userService.deleteUser(id);
      return res.sendStatus(200);
    } catch (e) {
      res.status(500);
      return res.json(this.errorResponse(e.message));
    }
  }

  errorResponse(message) {
    return {
      success: false,
      message,
    };
  }
};
