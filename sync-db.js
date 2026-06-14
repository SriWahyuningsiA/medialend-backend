const sequelize = require("./config/database");
require("./models");

async function run() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    console.log("Database siap");
    process.exit(0);

  } catch (err) {

    console.error(err);
    process.exit(1);

  }
}

run();