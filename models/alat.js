module.exports = (sequelize, DataTypes) => {

  const Alat = sequelize.define("Alat", {

    nama_alat: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    kode_alat: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    status: {
      type: DataTypes.STRING,
      defaultValue: "tersedia",
    },

  });

  return Alat;
};