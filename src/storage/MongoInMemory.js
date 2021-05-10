const { MongoClient } = require("mongodb");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { dbName } = require("../config");

class InMemoryDatabase {
  constructor() {
    this.connectionSetup = false;
  }

  async connect() {
    try {
      const mongoServer = new MongoMemoryServer();
      const mongoUri = await mongoServer.getUri();
      const connection = await MongoClient.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      this.db = await connection.db(dbName);
      return this.db;
    } catch (e) {
      throw new Error(`DB connection issue: ${e.message}`);
    }
  }

  async getConnection() {
    if (this.connectionSetup) {
      return this.db;
    }
    return this.connect();
  }

  getCollection(collectionName) {
    return this.db.collection(collectionName);
  }
}

module.exports = new InMemoryDatabase();
