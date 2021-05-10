/* eslint-disable global-require */
module.exports = {
  database:
    process.env.NODE_ENV === "testing"
      ? require("./MongoInMemory")
      : require("./Mongo"),
};
