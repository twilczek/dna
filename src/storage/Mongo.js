const MongoClient = require("mongodb");
const { dbName } = require("../config");

const url = "mongodb://127.0.0.1:27017";

class RealDatabase {
  constructor() {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
      if (err) return console.error(err);

      this.db = client.db(dbName);
      console.log(`Initial connection to ${url}, Database: ${dbName}`);
    });
  }

  async connect() {
    const client = await MongoClient.connect(url, { useNewUrlParser: true });
    this.db = client.db(dbName);
    return this.db;
  }

  async getConnection() {
    return this.db ? this.db : this.connect();
  }

  getCollection(collectionName) {
    return this.db.collection(collectionName);
  }
}

module.exports = new RealDatabase();
