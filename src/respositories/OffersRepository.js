const { offersCollectionName } = require("../config");
const { database } = require("../storage/index");

module.exports = class OffersRepository {
  constructor(collectionName = offersCollectionName) {
    this.collection = database.getCollection(collectionName);
  }

  async save(payload) {
    return this.collection.insertOne(payload);
  }
};
