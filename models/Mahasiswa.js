module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Mahasiswa",
    {
      nama: DataTypes.STRING,
      nim: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      tableName: "mahasiswa",
    }
  );
};