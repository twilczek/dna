module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: ["airbnb-base", "prettier", "plugin:prettier/recommended"],
  plugins: ["prettier", "jest"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "prettier/prettier": "error",
  },
  globals: {
    td: "readonly",
  },
};
