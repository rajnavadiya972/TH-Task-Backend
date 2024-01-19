const errorHandler = (err, req, res, next) => {
  res.status(500).json({ error: "Bad Request!", errorMessage: err.message });
};

module.exports = {
  errorHandler,
};
