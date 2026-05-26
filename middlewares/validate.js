const { validationResult } = require("express-validator");
const AppError = require("./appError");

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const Message = errors.array()[0].msg;
    next(new AppError(Message, 400));
  }
  next();
}

module.exports = validate;
