const { OffersController } = require("../index");

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

const category = "category";
const startDate = "startDate";
const endDate = "endDate";
const username = "username";

describe("OffersController", () => {
  describe("save", () => {
    const wrongPayloads = [
      {},
      { category },
      { category, startDate },
      { endDate },
      { endDate, startDate },
      { startDate, endDate, category, username }, // startDate endDate are not of date type
    ];
    wrongPayloads.forEach((payload) => {
      it("should return 400 error if request body is missing necessary data", async () => {
        const offerController = new OffersController({});
        const { statusCodeMock, jsonResponseMock, mockRes } = setupDeps();

        await offerController.save({ body: payload }, mockRes);

        td.verify(statusCodeMock(400));
        td.verify(
          jsonResponseMock({
            success: false,
            message: "Missing or incorrect offer creation data",
          })
        );
      });
    });
    it("should throw 400 error if category is different than ones supported", async () => {
      const offerController = new OffersController({});
      const { statusCodeMock, jsonResponseMock, mockRes } = setupDeps();
      const payload = {
        category,
        startDate: "2010-10-10",
        endDate: "2010-10-11",
        username,
      };

      await offerController.save({ body: payload }, mockRes);

      td.verify(statusCodeMock(400));
      td.verify(
        jsonResponseMock({
          success: false,
          message:
            "Category must be one of IT, Food & Drinks, Office, Courier, Shop Assistant",
        })
      );
    });

    it("should call save offer when payload is valid", async () => {
      const saveOfferMock = td.func();
      const offerController = new OffersController({
        saveOffer: saveOfferMock,
      });
      const { statusCodeMock, mockRes } = setupDeps();
      const validCategory = "IT";
      const payload = {
        category: validCategory,
        startDate: "2010-10-10",
        endDate: "2010-10-11",
        username,
      };

      await offerController.save({ body: payload }, mockRes);

      td.verify(statusCodeMock(200));
      td.verify(saveOfferMock(payload));
    });
  });
});
