const { OffersService } = require("../services");
const { BaseController } = require("./BaseController");
const { verifyCategory } = require("../utils/verifyCreateOfferBody");
const { verifyCreateOfferBody } = require("../utils/verifyCreateOfferBody");

const categories = [
  "IT",
  "Food & Drinks",
  "Office",
  "Courier",
  "Shop Assistant",
];

module.exports = class OffersController extends BaseController {
  constructor(offersService = new OffersService()) {
    super();
    this.offersService = offersService;
  }

  async save(req, res) {
    const { body } = req;
    if (!verifyCreateOfferBody(body)) {
      res.status(400);
      return res.json(
        this.errorResponse("Missing or incorrect offer creation data")
      );
    }
    const { category } = body;
    if (!verifyCategory(category)) {
      res.status(400);
      return res.json(
        this.errorResponse(`Category must be one of ${categories.join(", ")}`)
      );
    }
    try {
      const result = await this.offersService.saveOffer(body);
      return res.status(200).json(result);
    } catch (e) {
      res.status(500);
      return res.json(this.errorResponse(e.message));
    }
  }
};
