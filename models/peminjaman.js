module.exports = (sequelize, DataTypes) => {
  const Peminjaman = sequelize.define("Peminjaman", {
    tanggal_pinjam: DataTypes.DATE,
    tanggal_kembali: DataTypes.DATE,
    status: {
      type: DataTypes.STRING,
      defaultValue: "dipinjam"
    }
  });

  return Peminjaman;
};