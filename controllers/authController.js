const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { Mahasiswa, Admin } = require("../models");

const SECRET_KEY = "SECRET_KEY";

// ==========================
// 🔹 LOGIN MAHASISWA
// ==========================
exports.loginMahasiswa = async (req, res) => {
  try {
    const { nim, password } = req.body;

    if (!nim || !password) {
      return res.status(400).json({
        message: "NIM dan Password wajib diisi",
      });
    }

    const cleanNim = nim.trim();

    let user = await Mahasiswa.findOne({
      where: { nim: cleanNim },
    });

    // AUTO REGISTER
    if (!user) {
      const hash = await bcrypt.hash(password, 10);

      user = await Mahasiswa.create({
        nama: "Mahasiswa Baru",
        nim: cleanNim,
        password: hash,
        role: "mahasiswa",
      });
    }

    // ==========================
    // 🔥 FIX PASSWORD (HANYA BCRYPT)
    // ==========================
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Password salah",
      });
    }

    const token = jwt.sign(
      { id: user.id, role: "mahasiswa" },
      SECRET_KEY,
      { expiresIn: "1d" }
    );

    return res.json({
      message: "Login mahasiswa berhasil",
      token,
      user: {
        id: user.id,
        nama: user.nama,
        nim: user.nim,
        role: "mahasiswa",
      },
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// 🔹 LOGIN ADMIN
// ==========================
exports.loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username dan Password wajib diisi",
      });
    }

    const cleanUsername = username.trim();

    const user = await Admin.findOne({
      where: { username: cleanUsername },
    });

    if (!user) {
      return res.status(404).json({
        message: "Admin tidak ditemukan",
      });
    }

    // ==========================
    // 🔥 FIX PASSWORD (HANYA BCRYPT)
    // ==========================
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Password salah",
      });
    }

    const token = jwt.sign(
      { id: user.id, role: "admin" },
      SECRET_KEY,
      { expiresIn: "1d" }
    );

    return res.json({
      message: "Login admin berhasil",
      token,
      user: {
        id: user.id,
        nama: user.nama,
        username: user.username,
        role: "admin",
      },
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};