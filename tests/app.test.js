const { ObjectID } = require("mongodb");
const request = require("supertest");
const omit = require("lodash.omit");
const { userCollectionName } = require("../src/config");
const { database } = require("../src/storage");
const { app } = require("../app");

const login = "login";
const name = "name";
const password = "password";
const testUserId = "60993538cfc0468e4d93249d";

function getTestUser() {
  return {
    login,
    name,
    password,
    createdAt: new Date().valueOf(),
    _id: ObjectID(testUserId),
  };
}

async function setupUsersCollection() {
  const users = await database.getCollection(userCollectionName);
  const userDocument = getTestUser();
  await users.insertOne(userDocument);
  return userDocument;
}

describe("App", () => {
  describe("Users", () => {
    afterEach(async () => {
      const users = await database.getCollection(userCollectionName);
      await users.deleteMany({});
    });

    it("create user", async () => {
      const result = await request(app).post("/users/create").send({
        login,
        name,
        password,
      });

      expect(result.status).toBe(200);
      expect(result.body).toMatchObject({
        login,
        name,
        createdAt: expect.any(Number),
        _id: expect.any(String),
      });
    });

    it("get user", async () => {
      const userDocument = await setupUsersCollection();

      const result = await request(app).get(`/users/${testUserId}`);

      expect(result.body).toEqual(
        omit({ ...userDocument, _id: testUserId }, ["password"])
      );
    });

    it("update user", async () => {
      const userDocument = await setupUsersCollection();

      const update = { name: "newName" };
      const result = await request(app)
        .patch(`/users/${testUserId}`)
        .send(update);

      expect(result.body).toEqual(
        omit({ ...userDocument, ...update, _id: testUserId }, ["password"])
      );
    });

    it("delete user", async () => {
      await setupUsersCollection();

      const result = await request(app).delete(`/users/${testUserId}`);

      expect(result.status).toEqual(200);
    });
  });
  describe("Offers", () => {
    it("should create offer when connected user exist", async () => {
      const userDocument = await setupUsersCollection();
      const offerPayload = {
        category: "IT",
        startDate: "2010-10-10",
        endDate: "2010-10-11",
        username: userDocument.name,
      };

      const result = await request(app).post(`/offers/save`).send(offerPayload);

      expect(result.body).toEqual({
        ...offerPayload,
        _id: expect.any(String),
      });
    });
  });
});
