import bcrypt from "bcrypt";

import client from "../config/database.js";
import { registerUserQuery, getUserFromEmailQuery } from "../../database/queries/userQueries.js";
import { setUserToken } from "../services/jwtUtils.js";

const runQuery = async (query) => {
  const result = await client.query(query);
  return result;
};

export const registerUser = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  const hashPassword = bcrypt.hashSync(password, 10);

  const query = {
    text: registerUserQuery,
    values: [firstname, lastname, email, hashPassword],
  };

  try {
    const result = await runQuery(query);
    return res
      .status(201)
      .json({ success: true, message: "User Created Successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal server error!", errorMessage: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const query = {
    text: getUserFromEmailQuery,
    values: [email],
  };

  try {
    const result = await runQuery(query);

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ success: false, error: "User not found." });
    }

    const isPasswordRight = bcrypt.compareSync(
      password,
      result?.rows?.at(0)?.password
    );

    if (!isPasswordRight) {
      return res
        .status(401)
        .json({ success: false, error: "Please Enter correct email or password!" });
    }

    const token = setUserToken(result?.rows?.at(0));

    return res
      .status(200)
      .json({ success: true, message: "User LogIn Successfully!", token: token });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal server error!", errorMessage: error.message });
  }
};
