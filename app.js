const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();

/* ================= MODELS ================= */

const models = require("./models");

const {
  Mahasiswa,
  Alat,
  Peminjaman,
} = models;

/* ================= ROUTES ================= */

const alatRoutes = require("./routes/alatRoutes");
const peminjamanRoutes = require("./routes/peminjamanRoutes");
const authRoutes = require("./routes/authRoutes");
const mahasiswaRoute = require("./routes/mahasiswaRoute");

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
app.use(cors());
app.use(express.json());

/* ================= ROUTES ================= */

app.use("/api/alat", alatRoutes);

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
  res.send("Server MediaLend jalan");
});

/* ================= EXPORT ================= */

module.exports = app;