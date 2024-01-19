const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

const setUserToken = (user) => {
  const payload = {
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
  };

  const signinOptions = {
    expiresIn: 60 * 60,
  };

  return jwt.sign(payload, JWT_SECRET, signinOptions);
};

module.exports = {
  setUserToken,
};
