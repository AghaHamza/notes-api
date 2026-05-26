const jwt = require("jsonwebtoken");
const AppError = require("./appError");

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return next(new AppError("Unauthorized", 401));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(new AppError("Invalid token", 403));
    }
    req.user = decoded;
    next();
  });
}

module.exports = authMiddleware;
