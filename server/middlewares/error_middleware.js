const errorHandler = (err, req, res, next) => {
  const msg = err.message || "Internal server Error.";
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    success: false,
    statusCode,
    msg,
  });
};

module.exports = errorHandler;
