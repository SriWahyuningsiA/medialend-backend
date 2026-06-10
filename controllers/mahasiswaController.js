const db = require("../models");

const Mahasiswa = db.Mahasiswa;

/* ================= GET ALL ================= */

exports.getAll = async (req, res) => {
  try {

    const data = await Mahasiswa.findAll({
      order: [["id", "DESC"]],
    });

    res.json(data);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

/* ================= GET PROFILE ================= */

exports.getProfile = async (req, res) => {
  try {

    const mahasiswa = await Mahasiswa.findByPk(
      req.user.id
    );

    if (!mahasiswa) {
      return res.status(404).json({
        message: "Mahasiswa tidak ditemukan",
      });
    }

    res.json(mahasiswa);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

/* ================= UPDATE PROFILE ================= */

exports.updateProfile = async (req, res) => {
  try {

    const {
      nama,
      email,
    } = req.body;

    const mahasiswa = await Mahasiswa.findByPk(
      req.user.id
    );

    if (!mahasiswa) {
      return res.status(404).json({
        message: "Mahasiswa tidak ditemukan",
      });
    }

    mahasiswa.nama = nama;
    mahasiswa.email = email;

    await mahasiswa.save();

    res.json({
      message: "Profile berhasil diupdate",
      data: mahasiswa,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = exports;