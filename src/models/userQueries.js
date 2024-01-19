const registerUserQuery =
  "INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)";

module.exports = {
  registerUserQuery,
};
