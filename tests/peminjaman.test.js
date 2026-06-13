const request = require("supertest");
const app = require("../app");

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
        tanggal_pinjam: "2026-06-12"
      });

    expect(response.statusCode)
      .toBe(403);

  });

  test("POST /api/peminjaman/pinjam tanpa token", async () => {

    const response = await request(app)
      .post("/api/peminjaman/pinjam")
      .send({
        alat_id: 1,
        tanggal_pinjam: "2026-06-12"
      });

    expect(response.statusCode)
      .toBe(403);

  });

  test("PUT /api/peminjaman/terima/:id tanpa token", async () => {

    const response = await request(app)
      .put("/api/peminjaman/terima/1");

    expect(response.statusCode)
      .toBe(403);

  });

  test("PUT /api/peminjaman/tolak/:id tanpa token", async () => {

    const response = await request(app)
      .put("/api/peminjaman/tolak/1");

    expect(response.statusCode)
      .toBe(403);

  });

  test("PUT /api/peminjaman/kembali/:id tanpa token", async () => {

    const response = await request(app)
      .put("/api/peminjaman/kembali/1");

    expect(response.statusCode)
      .toBe(403);

  });

});