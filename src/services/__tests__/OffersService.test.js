const OffersService = require("../OffersService");

describe("Offers Service", () => {
  it("should return error on save if provided user does not exist", async () => {
    const service = new OffersService();
    const username = "username";
    const payload = {
      category: "IT",
      startDate: "2010-10-10",
      endDate: "2010-10-11",
      username,
    };

    let errorResponse;
    await service.saveOffer(payload).catch((e) => {
      errorResponse = e.message;
    });

    expect(errorResponse).toMatch(`Username ${username} does not exist`);
  });
});
