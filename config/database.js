const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "medialend_testing_db",
  "root",
  "",
  {
    host: "localhost",
    dialect: "mysql",
    logging: false,
  }
);

module.exports = sequelize;