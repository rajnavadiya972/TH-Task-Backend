const { client } = require("../config/database");
const {
  findPostWithLimitAndOffset,
  findToatlPost,
} = require("../models/postCommentQueries");

const runQuery = async (query) => {
  const result = await client.query(query);
  return result;
};

const findPostWithCommnet = async (req, res, next) => {
  const pageSize = req.query.pageSize || 10;
  const page = req.query.page || 1;
  const offset = (page - 1) * pageSize;

  const query = {
    text: findPostWithLimitAndOffset,
    values: [pageSize, offset],
  };

  try {
    const countPost = await runQuery(findToatlPost);
    const totalPages = Math.ceil(countPost?.rows?.at(0)?.count / pageSize);

    const result = await runQuery(query);
    const formattedData = [];
    let currentPost = null;

    result.rows.forEach((row) => {
      if (!currentPost || currentPost.post_id !== row.post_id) {
        const {
          post_id,
          post_title,
          post_description,
          post_user_firstname,
          post_user_lastname,
        } = row;
        currentPost = {
          post_id: post_id,
          post_title: post_title,
          post_description: post_description,
          post_user_firstname: post_user_firstname,
          post_user_lastname: post_user_lastname,
          comments: [],
        };
        formattedData.push(currentPost);
      }
      if (row.comment_id) {
        const {
          comment_id,
          comment_description,
          comment_user_firstname,
          comment_user_lastname,
        } = row;
        currentPost.comments.push({
          comment_id: comment_id,
          comment_description: comment_description,
          comment_user_firstname: comment_user_firstname,
          comment_user_lastname: comment_user_lastname,
        });
      }
    });

    res.status(200).json({
      data: formattedData,
      totalPages: totalPages,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findPostWithCommnet,
};
