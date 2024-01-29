import express from "express";

import { findPostWithCommnet, findLoginUser, findUserPostWithCommnet } from "../controllers/post.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = express.Router();

router.get("/post", authenticateToken, findPostWithCommnet);
router.get("/user/post", authenticateToken, findUserPostWithCommnet);
router.get("/user", authenticateToken, findLoginUser);

export default router;
