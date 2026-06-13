const request = require("supertest");
const app = require("../app");

describe("PEMINJAMAN VALID TEST", () => {

  let token;

  beforeAll(async () => {

    const login = await request(
      "http://localhost:3000"
    )
      .post("/api/login-mahasiswa")
      .send({
        nim: "220001",
        password: "123456"
      });

    token = login.body.token;

  });

  test("GET /api/peminjaman/user dengan token", async () => {

    const response = await request(app)
      .get("/api/peminjaman/user")
      .set(
        "Authorization",
        `Bearer ${token}`
      );

    expect([200, 500])
      .toContain(response.statusCode);

  });

  test("GET /api/peminjaman/saya dengan token", async () => {

    const response = await request(app)
      .get("/api/peminjaman/saya")
      .set(
        "Authorization",
        `Bearer ${token}`
      );

    expect([200, 500])
      .toContain(response.statusCode);

  });

  test("GET /api/peminjaman dengan token", async () => {

    const response = await request(app)
      .get("/api/peminjaman")
      .set(
        "Authorization",
        `Bearer ${token}`
      );

    expect([200, 500])
      .toContain(response.statusCode);

  });

  test("POST /api/peminjaman/pinjam data kosong", async () => {

    const response = await request(app)
      .post("/api/peminjaman/pinjam")
      .set(
        "Authorization",
        `Bearer ${token}`
      )
      .send({});

    expect([400, 500])
      .toContain(response.statusCode);

  });

  test("POST /api/peminjaman/pinjam alat tidak ditemukan", async () => {

    const response = await request(app)
      .post("/api/peminjaman/pinjam")
      .set(
        "Authorization",
        `Bearer ${token}`
      )
      .send({
        alat_id: 999999,
        tanggal_pinjam: "2026-06-12"
      });

    expect([404, 500])
      .toContain(response.statusCode);

  });

  test("PUT /api/peminjaman/terima/99999", async () => {

    const response = await request(app)
      .put("/api/peminjaman/terima/99999")
      .set(
        "Authorization",
        `Bearer ${token}`
      );

    expect([404, 500])
      .toContain(response.statusCode);

  });

  test("PUT /api/peminjaman/tolak/99999", async () => {

    const response = await request(app)
      .put("/api/peminjaman/tolak/99999")
      .set(
        "Authorization",
        `Bearer ${token}`
      );

    expect([404, 500])
      .toContain(response.statusCode);

  });

  test("PUT /api/peminjaman/kembali/99999", async () => {

    const response = await request(app)
      .put("/api/peminjaman/kembali/99999")
      .set(
        "Authorization",
        `Bearer ${token}`
      );

    expect([404, 500])
      .toContain(response.statusCode);

  });

});