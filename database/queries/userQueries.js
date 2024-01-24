const registerUserQuery =
  "INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)";

const getUserFromEmailQuery = "SELECT * FROM users WHERE email=$1";

module.exports = {
  registerUserQuery,
  getUserFromEmailQuery,
};
