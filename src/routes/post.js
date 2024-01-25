const express = require("express");
const router = express.Router();

const {
  findPostWithCommnet,
  findLoginUser,
  findUserPostWithCommnet,
} = require("../controllers/post");
const { authenticateToken } = require("../middlewares/authenticateToken");

router.get("/post", authenticateToken, findPostWithCommnet);
router.get("/user/post", authenticateToken, findUserPostWithCommnet);
router.get("/user", authenticateToken, findLoginUser);

module.exports = router;
