exports.verifyCreateOfferBody = function verifyCreateOfferBody(body) {
  return (
    body &&
    body.category &&
    body.category.length &&
    body.startDate &&
    body.startDate.length &&
    !!Date.parse(body.startDate) &&
    body.endDate &&
    body.endDate.length &&
    Date.parse(body.endDate) &&
    body.username &&
    body.username.length
  );
};

const categories = [
  "IT",
  "Food & Drinks",
  "Office",
  "Courier",
  "Shop Assistant",
];

exports.verifyCategory = function verifyCategory(category) {
  return categories.includes(category);
};
