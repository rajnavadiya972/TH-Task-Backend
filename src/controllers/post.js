import client from "../config/database.js";
import { findPostWithLimitAndOffset, findToatlPost, findUserPostWithLimitAndOffset, findToatlUserPost, } from "../../database/queries/postCommentQueries.js";
import { findUserIdFromUuid } from "../../database/queries/userQueries.js";

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

    return res
      .status(200)
      .json({ success: true, data: formattedData, page: page, pageSize: pageSize, totalPages: totalPages });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal server error!", errorMessage: error.message });
  }
};

export const findPostWithCommnet = async (req, res) => {
  const pageSize = req.query.pageSize || 10;
  const page = req.query.page || 1;
  const offset = (page - 1) * pageSize;

  const countPostQuery = findToatlPost;

  const findPostQuery = {
    text: findPostWithLimitAndOffset,
    values: [pageSize, offset],
  };

  return await executeQueryLogic({ req, res, page, pageSize, countPostQuery, findPostQuery });
};

export const findUserPostWithCommnet = async (req, res) => {
  const pageSize = req.query.pageSize || 10;
  const page = req.query.page || 1;
  const offset = (page - 1) * pageSize;
  const userUuid = req.user.id;

  const query = {
    text: findUserIdFromUuid,
    values: [userUuid],
  }
  const user = await runQuery(query)
  const userId = user?.rows?.at(0)?.id;

  const countPostQuery = {
    text: findToatlUserPost,
    values: [userId],
  };

  const findPostQuery = {
    text: findUserPostWithLimitAndOffset,
    values: [userId, pageSize, offset],
  };

  return await executeQueryLogic({ req, res, page, pageSize, countPostQuery, findPostQuery });
};

export const findLoginUser = async (req, res) => {
  return res
    .status(200)
    .json({ success: true, userName: `${req.user.firstname} ${req.user.lastname}`, userEmail: req.user.email });
};
