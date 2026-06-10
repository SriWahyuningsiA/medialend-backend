const db = require("../models");
const Peminjaman = db.Peminjaman;
const Alat = db.Alat;

const { Op } = require("sequelize");

/* ================= PINJAM ALAT ================= */

exports.pinjam = async (req, res) => {
  try {
    const MahasiswaId = req.user.id;

    const {
      alat_id,
      tanggal_pinjam,
      catatan,
    } = req.body;

    if (!alat_id || !tanggal_pinjam) {
      return res.status(400).json({
        message: "alat_id dan tanggal_pinjam wajib diisi",
      });
    }

    const alat = await Alat.findByPk(alat_id);

    if (!alat) {
      return res.status(404).json({
        message: "Alat tidak ditemukan",
      });
    }

    if (alat.status === "dipinjam") {
      return res.status(400).json({
        message: "Alat sedang dipinjam",
      });
    }

    const data = await Peminjaman.create({
      MahasiswaId,
      AlatId: alat_id,
      tanggal_pinjam,
      status: "pending",
      catatan,
    });

    res.json({
      message: "Pengajuan peminjaman berhasil",
      data,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* ================= CREATE ================= */

exports.create = exports.pinjam;

/* ================= TERIMA PENGAJUAN ================= */

exports.terima = async (req, res) => {
  try {
    const { id } = req.params;

    const peminjaman = await Peminjaman.findByPk(id);

    if (!peminjaman) {
      return res.status(404).json({
        message: "Pengajuan tidak ditemukan",
      });
    }

    await peminjaman.update({
      status: "dipinjam",
    });

    await Alat.update(
      {
        status: "dipinjam",
      },
      {
        where: {
          id: peminjaman.AlatId,
        },
      }
    );

    res.json({
      message: "Pengajuan diterima",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* ================= TOLAK PENGAJUAN ================= */

exports.tolak = async (req, res) => {
  try {
    const { id } = req.params;

    const peminjaman = await Peminjaman.findByPk(id);

    if (!peminjaman) {
      return res.status(404).json({
        message: "Pengajuan tidak ditemukan",
      });
    }

    await peminjaman.update({
      status: "ditolak",
    });

    res.json({
      message: "Pengajuan ditolak",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* ================= KEMBALIKAN ================= */

exports.kembali = async (req, res) => {
  try {
    const { id } = req.params;

    const peminjaman = await Peminjaman.findByPk(id);

    if (!peminjaman) {
      return res.status(404).json({
        message: "Data tidak ditemukan",
      });
    }

    await peminjaman.update({
      status: "dikembalikan",
    });

    await Alat.update(
      {
        status: "tersedia",
      },
      {
        where: {
          id: peminjaman.AlatId,
        },
      }
    );

    res.json({
      message: "Alat berhasil dikembalikan",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* ================= RIWAYAT USER ================= */

exports.getUser = async (req, res) => {
  try {
    const MahasiswaId = req.user.id;

    const data = await Peminjaman.findAll({
      where: {
        MahasiswaId,
        AlatId: {
          [Op.ne]: null,
        },
      },

      include: [
        {
          model: Alat,
          attributes: [
            "id",
            "nama_alat",
            "kode_alat",
            "status",
          ],
        },
      ],

      order: [["createdAt", "DESC"]],
    });

    res.json(data);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* ================= GET BY USER ================= */

exports.getByUser = exports.getUser;

/* ================= GET ALL ================= */

exports.getAll = async (req, res) => {
  try {
    const data = await Peminjaman.findAll({
      where: {
        AlatId: {
          [Op.ne]: null,
        },
      },

      include: [
        {
          model: db.Mahasiswa,
          attributes: [
            "id",
            "nama",
            "nim",
          ],
        },

        {
          model: Alat,
          attributes: [
            "id",
            "nama_alat",
            "kode_alat",
            "status",
          ],
        },
      ],

      order: [["createdAt", "DESC"]],
    });

    res.json(data);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = exports;