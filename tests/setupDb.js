const { database } = require("../src/storage");

beforeAll(async () => {
  await database.getConnection();
});
