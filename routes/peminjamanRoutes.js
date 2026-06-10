const express = require("express");
const router = express.Router();

const peminjamanController = require(
  "../controllers/peminjamanController"
);

const authMiddleware = require(
  "../middleware/auth"
);

/* ================= CREATE PEMINJAMAN ================= */

router.post(
  "/",
  authMiddleware,
  peminjamanController.create
);

/* ================= PINJAM ALAT ================= */

router.post(
  "/pinjam",
  authMiddleware,
  peminjamanController.pinjam
);

/* ================= TERIMA PENGAJUAN ================= */

router.put(
  "/terima/:id",
  authMiddleware,
  peminjamanController.terima
);

/* ================= TOLAK PENGAJUAN ================= */

router.put(
  "/tolak/:id",
  authMiddleware,
  peminjamanController.tolak
);

/* ================= KEMBALIKAN ================= */

router.put(
  "/kembali/:id",
  authMiddleware,
  peminjamanController.kembali
);

/* ================= RIWAYAT USER ================= */

router.get(
  "/user",
  authMiddleware,
  peminjamanController.getUser
);

/* ================= GET BY USER ================= */

router.get(
  "/saya",
  authMiddleware,
  peminjamanController.getByUser
);

/* ================= GET ALL ================= */

router.get(
  "/",
  authMiddleware,
  peminjamanController.getAll
);

module.exports = router;