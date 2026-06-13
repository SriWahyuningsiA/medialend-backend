const request = require("supertest");
const app = require("../app");

describe("Regression Test Suite - Alat API", () => {

  test("GET /api/alat - mengambil seluruh data alat", async () => {

    const res = await request(app)
      .get("/api/alat");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

  });

  test("GET /api/alat - data memiliki field nama_alat", async () => {

    const res = await request(app)
      .get("/api/alat");

    expect(res.statusCode).toBe(200);

    if (res.body.length > 0) {
      expect(res.body[0])
        .toHaveProperty("nama_alat");
    }

  });

  test("POST /api/alat - berhasil menambah alat", async () => {

    const res = await request(app)
      .post("/api/alat")
      .send({
        nama_alat: "Kamera Test",
        kode_alat: `KT-${Date.now()}`
      });

    expect(res.statusCode).toBe(200);
    expect(res.body)
      .toHaveProperty("id");

  });

  test("POST /api/alat - gagal tanpa nama_alat", async () => {

    const res = await request(app)
      .post("/api/alat")
      .send({
        kode_alat: "TEST001"
      });

    expect(res.statusCode).toBe(500);

  });

  test("POST /api/alat - gagal tanpa kode_alat", async () => {

    const res = await request(app)
      .post("/api/alat")
      .send({
        nama_alat: "Laptop"
      });

    expect(res.statusCode).toBe(500);

  });

  test("PUT /api/alat/:id - update alat", async () => {

    const alatBaru = await request(app)
      .post("/api/alat")
      .send({
        nama_alat: "Proyektor",
        kode_alat: `PR-${Date.now()}`
      });

    const res = await request(app)
      .put(`/api/alat/${alatBaru.body.id}`)
      .send({
        nama_alat: "Proyektor Update"
      });

    expect(res.statusCode).toBe(200);

    expect(res.body.message)
      .toBe("Alat berhasil diupdate");

  });

  test("DELETE /api/alat/:id - hapus alat", async () => {

    const alatBaru = await request(app)
      .post("/api/alat")
      .send({
        nama_alat: "Mouse",
        kode_alat: `MS-${Date.now()}`
      });

    const res = await request(app)
      .delete(`/api/alat/${alatBaru.body.id}`);

    expect(res.statusCode).toBe(200);

    expect(res.body.message)
      .toBe("Alat berhasil dihapus");

  });

});