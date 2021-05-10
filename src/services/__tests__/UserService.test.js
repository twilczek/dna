const { ObjectID } = require("mongodb");
const { UserService } = require("../index");

describe("User Service", () => {
  it("should create user in db and return full payload without password", async () => {
    const service = new UserService();

    const login = "login";
    const password = "password";
    const name = "username";
    const payload = { login, password, name };
    const response = await service.createUser(payload);

    expect(response).toMatchObject({
      login,
      name,
      createdAt: expect.any(Number),
      _id: expect.any(ObjectID),
    });
  });
});
