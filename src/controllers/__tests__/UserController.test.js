const { UserController } = require("../index");

const login = "login";
const password = "password";
const name = "username";

function setupDeps() {
  const statusCodeMock = td.func();
  const jsonResponseMock = td.func();
  const mockRes = {
    status: statusCodeMock,
    json: jsonResponseMock,
  };
  return {
    statusCodeMock,
    jsonResponseMock,
    mockRes,
  };
}

describe("UserController", () => {
  describe("createUser", () => {
    const incompletePayloads = [
      {},
      { login },
      { login, password },
      { name },
      { name, password },
      { password },
    ];
    incompletePayloads.forEach((payload) => {
      it("should return 400 error if request body is missing", async () => {
        const userController = new UserController({});
        const { statusCodeMock, jsonResponseMock, mockRes } = setupDeps();

        await userController.createUser({ body: payload }, mockRes);

        td.verify(statusCodeMock(400));
        td.verify(
          jsonResponseMock({
            success: false,
            message: "Missing or incorrect user creation data",
          })
        );
      });
    });

    it("should call create user if request data is complete", async () => {
      const serviceCreateUserMock = td.func();
      const userController = new UserController({
        createUser: serviceCreateUserMock,
      });
      const statusCodeMock = td.func();
      const jsonResponseMock = td.func();
      const mockRes = { status: statusCodeMock, json: jsonResponseMock };

      await userController.createUser(
        { body: { login, name, password } },
        mockRes
      );

      td.verify(statusCodeMock(200));
      td.verify(serviceCreateUserMock({ login, name, password }));
    });
  });

  describe("getUser", () => {
    it("should return error if missing id param", async () => {
      const userController = new UserController({});
      const { statusCodeMock, jsonResponseMock, mockRes } = setupDeps();

      await userController.getUser({ params: {} }, mockRes);

      td.verify(statusCodeMock(400));
      td.verify(
        jsonResponseMock({
          success: false,
          message: "Missing user selector",
        })
      );
    });

    it("should call service function if id is provided", async () => {
      const findUserMock = td.func();
      const userController = new UserController({ findUser: findUserMock });
      const { statusCodeMock, mockRes } = setupDeps();

      const userId = "some-user-id";

      await userController.getUser({ params: { id: userId } }, mockRes);

      td.verify(statusCodeMock(200));
      td.verify(findUserMock(userId));
    });
  });

  describe("patchUser", () => {
    it("should validate patch body contains fields that can be updated", async () => {
      const userController = new UserController({});
      const { statusCodeMock, jsonResponseMock, mockRes } = setupDeps();

      const userId = "some-user-id";

      await userController.patchUser(
        { params: { id: userId }, body: { else: "val" } },
        mockRes
      );

      td.verify(statusCodeMock(400));
      td.verify(
        jsonResponseMock({ success: false, message: "No data to update" })
      );
    });

    it("should call service data if payload is correct", async () => {
      const patchUser = td.func();
      const userController = new UserController({ patchUser });
      const { statusCodeMock, mockRes } = setupDeps();
      const newLogin = "newLogin";
      const userId = "some-user-id";

      await userController.patchUser(
        {
          params: { id: userId },
          body: { login: newLogin, something: "else" },
        },
        mockRes
      );

      td.verify(statusCodeMock(200));
      td.verify(patchUser(userId, { login: newLogin }));
    });
  });
});
