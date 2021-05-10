const { ObjectID } = require("mongodb");
const { userCollectionName } = require("../config");
const { database } = require("../storage/index");

class UserRepository {
  constructor(collectionName = userCollectionName) {
    this.collection = database.getCollection(collectionName);
  }

  async create(payload) {
    return this.collection.insertOne(payload);
  }

  async findById(id) {
    return this.collection.findOne(
      { _id: ObjectID(id) },
      { projection: ["_id", "createdAt", "name", "login"] }
    );
  }

  async updateOne(id, patchPayload) {
    await this.collection.updateOne(
      { _id: ObjectID(id) },
      { $set: patchPayload }
    );
    return this.findById(id);
  }

  async deleteById(id) {
    return await this.collection.deleteOne({ _id: ObjectID(id) });
  }
}

module.exports = UserRepository;
