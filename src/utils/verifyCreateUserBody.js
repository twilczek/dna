exports.verifyCreateUserBody = function verifyCreateUserBody(body) {
  return (
    body &&
    body.login &&
    body.login.length &&
    body.password &&
    body.password.length &&
    body.name &&
    body.name.length
  );
};
