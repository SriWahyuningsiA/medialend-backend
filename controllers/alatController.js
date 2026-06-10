const db = require("../models");

const Alat = db.Alat;

/* GET ALL */
exports.getAll = async (req, res) => {
  try {

    const data = await Alat.findAll();

    res.json(data);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};

/* CREATE */
exports.create = async (req, res) => {
  try {

    const data = await Alat.create(req.body);

    res.json(data);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};

/* UPDATE */
exports.update = async (req, res) => {
  try {

    await Alat.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    res.json({
      message: "Alat berhasil diupdate",
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};

/* DELETE */
exports.delete = async (req, res) => {
  try {

    await Alat.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.json({
      message: "Alat berhasil dihapus",
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};