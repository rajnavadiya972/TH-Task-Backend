import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

const authenticateToken = (req, res, next) => {
  const header = req.headers["authorization"];
  if (!header) {
    return res.status(401).json({ error: "Unauthorized access!" });
  }
  const token = header.split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden" });
    }
    req.user = user;
    next();
  });
};

export {
  authenticateToken,
};
