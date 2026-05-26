const express = require("express");
const route = require("express").Router();
const { register, login } = require("../controllers/authController");
const { body } = require("express-validator");
const validate = require("../middlewares/validate");

const registerRules = [
  body("name").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];
const loginRules = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

route.post("/register", registerRules, validate, register);
route.post("/login", loginRules, validate, login);

module.exports = route;
