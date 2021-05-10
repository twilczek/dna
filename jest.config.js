const config = {
  verbose: true,
  setupFilesAfterEnv: [
    "<rootDir>/tests/setupTd.js",
    "<rootDir>/tests/setupDb.js",
  ],
};

module.exports = config;
