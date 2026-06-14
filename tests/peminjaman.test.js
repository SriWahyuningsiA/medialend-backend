const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../app");

const token = jwt.sign(
  {
    id: 1,
    role: "mahasiswa"
  },
  "SECRET_KEY"
);

describe("PEMINJAMAN API TEST", () => {

  test("GET /api/peminjaman tanpa token", async () => {

    const response = await request(app)
      .get("/api/peminjaman");

    expect(response.statusCode)
      .toBe(403);

  });

  test("GET /api/peminjaman/user tanpa token", async () => {

    const response = await request(app)
      .get("/api/peminjaman/user");

    expect(response.statusCode)
      .toBe(403);

  });

  test("GET /api/peminjaman/saya tanpa token", async () => {

    const response = await request(app)
      .get("/api/peminjaman/saya");

    expect(response.statusCode)
      .toBe(403);

  });

  test("POST /api/peminjaman tanpa token", async () => {

    const response = await request(app)
      .post("/api/peminjaman")
      .send({
        alat_id: 1,
        tanggal_pinjam: "2026-06-14"
      });

    expect(response.statusCode)
      .toBe(403);

  });

  test("POST /api/peminjaman/pinjam tanpa token", async () => {

    const response = await request(app)
      .post("/api/peminjaman/pinjam")
      .send({
        alat_id: 1,
        tanggal_pinjam: "2026-06-14"
      });

    expect(response.statusCode)
      .toBe(403);

  });

  test("PUT /api/peminjaman/terima/1 tanpa token", async () => {

    const response = await request(app)
      .put("/api/peminjaman/terima/1");

    expect(response.statusCode)
      .toBe(403);

  });

  test("PUT /api/peminjaman/tolak/1 tanpa token", async () => {

    const response = await request(app)
      .put("/api/peminjaman/tolak/1");

    expect(response.statusCode)
      .toBe(403);

  });

  test("PUT /api/peminjaman/kembali/1 tanpa token", async () => {

    const response = await request(app)
      .put("/api/peminjaman/kembali/1");

    expect(response.statusCode)
      .toBe(403);

  });

  test("GET /api/peminjaman dengan token", async () => {

    const response = await request(app)
      .get("/api/peminjaman")
      .set(
        "Authorization",
        `Bearer ${token}`
      );

    expect(
      [200, 500]
    ).toContain(response.statusCode);

  });

  test("GET /api/peminjaman/user dengan token", async () => {

    const response = await request(app)
      .get("/api/peminjaman/user")
      .set(
        "Authorization",
        `Bearer ${token}`
      );

    expect(
      [200, 500]
    ).toContain(response.statusCode);

  });

  test("GET /api/peminjaman/saya dengan token", async () => {

    const response = await request(app)
      .get("/api/peminjaman/saya")
      .set(
        "Authorization",
        `Bearer ${token}`
      );

    expect(
      [200, 500]
    ).toContain(response.statusCode);

  });

  test("POST /api/peminjaman/pinjam dengan token", async () => {

    const response = await request(app)
      .post("/api/peminjaman/pinjam")
      .set(
        "Authorization",
        `Bearer ${token}`
      )
      .send({
        alat_id: 2,
        tanggal_pinjam: "2026-06-14",
        catatan: "Testing"
      });

    expect(
      [200, 400, 404, 500]
    ).toContain(response.statusCode);

  });

  test("PUT /api/peminjaman/terima/1 dengan token", async () => {

    const response = await request(app)
      .put("/api/peminjaman/terima/1")
      .set(
        "Authorization",
        `Bearer ${token}`
      );

    expect(
      [200, 404, 500]
    ).toContain(response.statusCode);

  });

  test("PUT /api/peminjaman/tolak/1 dengan token", async () => {

    const response = await request(app)
      .put("/api/peminjaman/tolak/1")
      .set(
        "Authorization",
        `Bearer ${token}`
      );

    expect(
      [200, 404, 500]
    ).toContain(response.statusCode);

  });

  test("PUT /api/peminjaman/kembali/1 dengan token", async () => {

    const response = await request(app)
      .put("/api/peminjaman/kembali/1")
      .set(
        "Authorization",
        `Bearer ${token}`
      );

    expect(
      [200, 404, 500]
    ).toContain(response.statusCode);

  });

});