const registerUserQuery = "INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)";

const getUserFromEmailQuery = "SELECT * FROM users WHERE email=$1";

const findUserIdFromUuid = "SELECT id FROM USERS WHERE user_id=$1";

export {
  registerUserQuery,
  getUserFromEmailQuery,
  findUserIdFromUuid,
};
