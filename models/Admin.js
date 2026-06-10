module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Admin",
    {
      nama: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      tableName: "admin",
    }
  );
};