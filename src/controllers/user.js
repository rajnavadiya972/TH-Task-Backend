const { client } = require("../config/database");
const { registerUserQuery } = require("../models/userQueries");
const bcrypt = require("bcrypt");

const registerUser = async (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;

  const hashPassword = bcrypt.hashSync(password, 10);

  const query = {
    text: registerUserQuery,
    values: [firstname, lastname, email, hashPassword],
  };

  try {
    const result = await client.query(query);
    return res.status(201).json({ message: "User Created Successfully!" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registerUser,
};
