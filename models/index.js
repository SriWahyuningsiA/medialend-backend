const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const db = {};


db.Sequelize = Sequelize;
db.sequelize = sequelize;

/* ================= MODELS ================= */

db.Mahasiswa = require("./Mahasiswa")(
  sequelize,
  Sequelize.DataTypes
);

db.Admin = require("./Admin")(
  sequelize,
  Sequelize.DataTypes
);

db.Alat = require("./alat")(
  sequelize,
  Sequelize.DataTypes
);

db.Peminjaman = require("./peminjaman")(
  sequelize,
  Sequelize.DataTypes
);

/* ================= EXPORT ================= */

module.exports = db;