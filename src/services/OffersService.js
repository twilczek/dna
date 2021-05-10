const OffersRepository = require("../respositories/OffersRepository");
const UserService = require("./UserService");

module.exports = class OffersService {
  constructor(userService = new UserService()) {
    this.repository = new OffersRepository();
    this.userService = userService;
  }

  async saveOffer(payload) {
    const { username } = payload;
    const user = await this.userService.findByName(username);
    if (!user) {
      throw new Error(`Username ${username} does not exist`);
    }
    const saveRes = await this.repository.save(payload);
    return {
      _id: saveRes.insertedId,
      ...payload,
    };
  }
};
