import express from "express";
const router = express.Router();

import { registerUser, loginUser } from "../controllers/user.js";

router.post("/signup", registerUser);
router.post("/signin", loginUser);

export default router;
