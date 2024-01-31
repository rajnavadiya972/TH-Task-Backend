import express from "express";

import { registerUser, loginUser } from "../controllers/user.js";
import { signupValidationRules, validateData } from "../middlewares/signupDataValidator.js";

const router = express.Router();

router.post("/signup", signupValidationRules, validateData, registerUser);
router.post("/signin", loginUser);

export default router;
