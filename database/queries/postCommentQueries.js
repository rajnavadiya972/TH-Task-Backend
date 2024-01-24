const addPostQuery =
  "INSERT INTO post_data (title, description, user_id) VALUES ($1, $2, $3)";
const addCommentQuery =
  "INSERT INTO comment_data (description, user_id, post_id) VALUES ($1, $2, $3)";

module.exports = {
  addCommentQuery,
  addPostQuery,
};
