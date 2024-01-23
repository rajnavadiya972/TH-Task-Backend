const express = require("express");
const router = express.Router();

const { findPostWithCommnet } = require("../controllers/post");

router.get("/post", findPostWithCommnet);

module.exports = router;
