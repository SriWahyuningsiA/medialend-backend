const app = require("./app");
const sequelize = require("./config/database");

const PORT = process.env.PORT || 3000;

/* ================= DATABASE CONNECTION ================= */

sequelize
  .authenticate()
  .then(() => {

    console.log("Database terhubung");

    return sequelize.sync({ alter: true });

  })
  .then(() => {

    console.log("Tabel siap");

    app.listen(PORT, () => {

      console.log(
        `Server jalan di http://localhost:${PORT}`
      );

    });

  })
  .catch((err) => {

    console.error(
      "Database error:"
    );

    console.error(err);

  });