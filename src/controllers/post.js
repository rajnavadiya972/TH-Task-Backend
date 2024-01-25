const { client } = require("../config/database");
const {
  findPostWithLimitAndOffset,
  findToatlPost,
  findUserPostWithLimitAndOffset,
  findToatlUserPost,
} = require("../../database/queries/postCommentQueries");

const runQuery = async (query) => {
  const result = await client.query(query);
  return result;
};

const executeQueryLogic = async (props) => {
  const { req, res, page, pageSize, countPostQuery, findPostQuery } = props;
  try {
    const countPost = await runQuery(countPostQuery);
    const totalPages = Math.ceil(countPost?.rows?.at(0)?.count / pageSize);

    const result = await runQuery(findPostQuery);
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

    return res.status(200).json({
      data: formattedData,
      page: page,
      pageSize: pageSize,
      totalPages: totalPages,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error!", errorMessage: error.message });
  }
};

const findPostWithCommnet = async (req, res) => {
  const pageSize = req.query.pageSize || 10;
  const page = req.query.page || 1;
  const offset = (page - 1) * pageSize;

  const countPostQuery = findToatlPost;

  const findPostQuery = {
    text: findPostWithLimitAndOffset,
    values: [pageSize, offset],
  };

  return await executeQueryLogic({
    req,
    res,
    page,
    pageSize,
    countPostQuery,
    findPostQuery,
  });
};

const findUserPostWithCommnet = async (req, res) => {
  const pageSize = req.query.pageSize || 10;
  const page = req.query.page || 1;
  const offset = (page - 1) * pageSize;
  const user = req.user.id;

  const countPostQuery = {
    text: findToatlUserPost,
    values: [user],
  };

  const findPostQuery = {
    text: findUserPostWithLimitAndOffset,
    values: [user, pageSize, offset],
  };

  return await executeQueryLogic({
    req,
    res,
    page,
    pageSize,
    countPostQuery,
    findPostQuery,
  });
};

const findLoginUser = async (req, res) => {
  return res.status(200).json({
    userName: `${req.user.firstname} ${req.user.lastname}`,
    userEmail: req.user.email,
  });
};

module.exports = {
  findPostWithCommnet,
  findLoginUser,
  findUserPostWithCommnet,
};
