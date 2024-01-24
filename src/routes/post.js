const express = require("express");
const router = express.Router();

const { findPostWithCommnet } = require("../controllers/post");
const { authenticateToken } = require("../middlewares/authenticateToken");

router.get("/post", authenticateToken, findPostWithCommnet);

module.exports = router;
