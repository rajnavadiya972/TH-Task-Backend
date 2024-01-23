const registerUserQuery =
  "INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)";
const addPostQuery =
  "INSERT INTO post_data (title, description, user_id) VALUES ($1, $2, $3)";
const addCommentQuery =
  "INSERT INTO comment_data (description, user_id, post_id) VALUES ($1, $2, $3)";

const getUserFromEmailQuery = "SELECT * FROM users WHERE email=$1";

module.exports = {
  registerUserQuery,
  getUserFromEmailQuery,
  addPostQuery,
  addCommentQuery,
};
