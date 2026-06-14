const request = require("supertest");
const app = require("../app");

describe("ALAT API TEST", () => {

  test("GET /api/alat berhasil", async () => {

    const response = await request(app)
      .get("/api/alat");

    expect(response.statusCode)
      .toBe(200);

  });

  test("GET /api/alat mengembalikan array", async () => {

    const response = await request(app)
      .get("/api/alat");

    expect(
      Array.isArray(response.body)
    ).toBe(true);

  });

  test("POST /api/alat berhasil", async () => {

    const response = await request(app)
      .post("/api/alat")
      .send({
        nama_alat: "Laptop Testing",
        kode_alat: "LT001"
      });

    expect(response.statusCode)
      .toBe(200);

    expect(response.body)
      .toHaveProperty("id");

  });

  test("POST /api/alat dengan nama kosong", async () => {

    const response = await request(app)
      .post("/api/alat")
      .send({
        nama_alat: "",
        kode_alat: "LT002"
      });

    expect(
      [200, 500]
    ).toContain(response.statusCode);

  });

  test("PUT /api/alat update data", async () => {

    const alatBaru = await request(app)
      .post("/api/alat")
      .send({
        nama_alat: "Proyektor Lama",
        kode_alat: "PJ001"
      });

    const response = await request(app)
      .put(`/api/alat/${alatBaru.body.id}`)
      .send({
        nama_alat: "Proyektor Baru"
      });

    expect(response.statusCode)
      .toBe(200);

  });

  test("DELETE /api/alat berhasil", async () => {

    const alatBaru = await request(app)
      .post("/api/alat")
      .send({
        nama_alat: "Mouse",
        kode_alat: "MS001"
      });

    const response = await request(app)
      .delete(`/api/alat/${alatBaru.body.id}`);

    expect(response.statusCode)
      .toBe(200);

  });

});