const express = require("express");

const router = express.Router();

const mahasiswaController = require(
  "../controllers/mahasiswaController"
);

const authMiddleware = require(
  "../middleware/auth"
);

/* ================= GET ALL ================= */

router.get(
  "/",
  authMiddleware,
  mahasiswaController.getAll
);

/* ================= GET PROFILE ================= */

router.get(
  "/profile",
  authMiddleware,
  mahasiswaController.getProfile
);

/* ================= UPDATE PROFILE ================= */

router.put(
  "/profile",
  authMiddleware,
  mahasiswaController.updateProfile
);

module.exports = router;