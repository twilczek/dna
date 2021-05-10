const UserRepository = require("../respositories/UserRepository");

class UserService {
  constructor() {
    this.repository = new UserRepository();
  }

  async createUser({ login, password, name }) {
    const creationTimestamp = new Date().valueOf();
    const insertRes = await this.repository.create({
      login,
      password,
      name,
      createdAt: creationTimestamp,
    });
    return {
      login,
      name,
      createdAt: creationTimestamp,
      _id: insertRes.insertedId,
    };
  }

  async findByName(name) {
    return this.repository.findByName(name);
  }

  async findUser(id) {
    return this.repository.findById(id);
  }

  patchUser(id, patchPayload) {
    return this.repository.updateOne(id, patchPayload);
  }

  async deleteUser(id) {
    return this.repository.deleteById(id);
  }
}

module.exports = UserService;
