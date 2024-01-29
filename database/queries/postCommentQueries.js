const addPostQuery = "INSERT INTO post_data (title, description, user_id) VALUES ($1, $2, $3)";
const addCommentQuery = "INSERT INTO comment_data (description, user_id, post_id) VALUES ($1, $2, $3)";

const findPostWithLimitAndOffset = `SELECT
post.id AS post_id,
post.title AS post_title,
post.description AS post_description,
users_post.firstname AS post_user_firstname,
users_post.lastname AS post_user_lastname,
comment.id AS comment_id,
comment.description AS comment_description,
users_comment.firstname AS comment_user_firstname,
users_comment.lastname AS comment_user_lastname
FROM
post_data AS post
JOIN
users AS users_post ON post.user_id = users_post.id
LEFT JOIN
comment_data AS comment ON post.id = comment.post_id
LEFT JOIN
users AS users_comment ON comment.user_id = users_comment.id
WHERE
post.id IN (
    SELECT id FROM post_data ORDER BY id LIMIT $1 OFFSET $2
)
ORDER BY
post.id`;

const findUserPostWithLimitAndOffset = `SELECT
post.id AS post_id,
post.title AS post_title,
post.description AS post_description,
users_post.firstname AS post_user_firstname,
users_post.lastname AS post_user_lastname,
comment.id AS comment_id,
comment.description AS comment_description,
users_comment.firstname AS comment_user_firstname,
users_comment.lastname AS comment_user_lastname
FROM
post_data AS post
JOIN
users AS users_post ON post.user_id = users_post.id
LEFT JOIN
comment_data AS comment ON post.id = comment.post_id
LEFT JOIN
users AS users_comment ON comment.user_id = users_comment.id
WHERE
post.id IN (
    SELECT id FROM post_data where user_id=$1 ORDER BY id LIMIT $2 OFFSET $3
)
ORDER BY
post.id`;

const findToatlPost = "SELECT COUNT(*) FROM post_data";

const findToatlUserPost = "SELECT COUNT(*) FROM post_data where user_id=$1";

export {
  addCommentQuery,
  addPostQuery,
  findPostWithLimitAndOffset,
  findUserPostWithLimitAndOffset,
  findToatlPost,
  findToatlUserPost,
};
