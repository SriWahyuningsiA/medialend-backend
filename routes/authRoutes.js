const express = require("express");

const {
  body,
  validationResult,
} = require("express-validator");

const router = express.Router();

const authController = require(
  "../controllers/authController"
);

/* ================= VALIDATION ================= */

const validate = (req, res, next) => {

  const errors =
    validationResult(req);

  if (!errors.isEmpty()) {

    return res.status(400).json({
      errors: errors.array(),
    });

  }

  next();

};

/* ================= LOGIN MAHASISWA ================= */

router.post(
  "/login-mahasiswa",

  [
    body("nim")
      .notEmpty()
      .withMessage("NIM wajib diisi"),

    body("password")
      .notEmpty()
      .withMessage("Password wajib diisi"),
  ],

  validate,

  authController.loginMahasiswa
);

/* ================= LOGIN ADMIN ================= */

router.post(
  "/login-admin",

  [
    body("username")
      .notEmpty()
      .withMessage("Username wajib diisi"),

    body("password")
      .notEmpty()
      .withMessage("Password wajib diisi"),
  ],

  validate,

  authController.loginAdmin
);

module.exports = router;