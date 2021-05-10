const { ObjectID } = require("mongodb");
const { userCollectionName } = require("../config");
const { database } = require("../storage/index");

const projection = ["_id", "createdAt", "name", "login"];
class UserRepository {
  constructor(collectionName = userCollectionName) {
    this.collection = database.getCollection(collectionName);
  }

  async create(payload) {
    return this.collection.insertOne(payload);
  }

  findByName(name) {
    return this.collection.findOne({ name }, { projection });
  }

  async findById(id) {
    return this.collection.findOne({ _id: ObjectID(id) }, { projection });
  }

  async updateOne(id, patchPayload) {
    await this.collection.updateOne(
      { _id: ObjectID(id) },
      { $set: patchPayload }
    );
    return this.findById(id);
  }

  async deleteById(id) {
    return this.collection.deleteOne({ _id: ObjectID(id) });
  }
}

module.exports = UserRepository;
