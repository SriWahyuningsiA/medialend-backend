require("dotenv").config();

console.log("MYSQLHOST:", process.env.MYSQLHOST);

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const app = express();

app.set("trust proxy", 1);

/* ================= DATABASE ================= */

const sequelize = require("./config/database");

/* ================= MODELS ================= */

const models = require("./models");

const {
  Mahasiswa,
  Admin,
  Alat,
  Peminjaman,
} = models;

/* ================= ROUTES ================= */

const alatRoutes = require(
  "./routes/alatRoutes"
);

const peminjamanRoutes = require(
  "./routes/peminjamanRoutes"
);

const authRoutes = require(
  "./routes/authRoutes"
);

const mahasiswaRoute = require(
  "./routes/mahasiswaRoute"
);

/* ================= RELATION ================= */

if (Mahasiswa && Peminjaman) {

  Mahasiswa.hasMany(Peminjaman);

  Peminjaman.belongsTo(Mahasiswa);

}

if (Alat && Peminjaman) {

  Alat.hasMany(Peminjaman);

  Peminjaman.belongsTo(Alat);

}

/* ================= MIDDLEWARE ================= */

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
});

app.use(limiter);

app.use(helmet());

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "OPTIONS"
    ],
    allowedHeaders: [
      "Content-Type",
      "Authorization"
    ]
  })
);

app.options("*", cors());

app.use(express.json());

/* ================= ROUTES ================= */

app.use(
  "/api/alat",
  alatRoutes
);

app.use(
  "/api/peminjaman",
  peminjamanRoutes
);

app.use(
  "/api/mahasiswa",
  mahasiswaRoute
);

app.use(
  "/api",
  authRoutes
);

/* ================= TEST API ================= */

app.get("/", (req, res) => {

  res.send(
    "Server MediaLend jalan"
  );

});

/* ================= DATABASE CONNECTION ================= */

sequelize.authenticate()

  .then(() => {

    console.log(
      "Database terhubung"
    );

  })

  .catch((err) => {

    console.log(
      "Database error"
    );

    console.log(err);

  });

/* ================= SYNC TABLE ================= */

sequelize.sync({ alter: true })

  .then(() => {

    console.log(
      "Tabel siap"
    );

  })

  .catch((err) => {

    console.log(
      "Sync error"
    );

    console.log(err);

  });

/* ================= SERVER ================= */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server jalan di port ${PORT}`);
});