const sequelize = require("../config/database");

afterAll(async () => {
  await sequelize.close();
});