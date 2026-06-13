const request = require("supertest");
const app = require("../app");

describe("MAHASISWA API TEST", () => {

  test("GET /api/mahasiswa tanpa token", async () => {

    const response = await request(app)
      .get("/api/mahasiswa");

    expect(response.statusCode)
      .toBe(403);

    expect(response.body.message)
      .toBe("Token tidak ada");

  });

  test("GET /api/mahasiswa/profile tanpa token", async () => {

    const response = await request(app)
      .get("/api/mahasiswa/profile");

    expect(response.statusCode)
      .toBe(403);

    expect(response.body.message)
      .toBe("Token tidak ada");

  });

  test("PUT /api/mahasiswa/profile tanpa token", async () => {

    const response = await request(app)
      .put("/api/mahasiswa/profile")
      .send({
        nama: "Mahasiswa Test"
      });

    expect(response.statusCode)
      .toBe(403);

    expect(response.body.message)
      .toBe("Token tidak ada");

  });

  test("GET /api/mahasiswa token tidak valid", async () => {

    const response = await request(app)
      .get("/api/mahasiswa")
      .set(
        "Authorization",
        "Bearer token_salah"
      );

    expect(response.statusCode)
      .toBe(401);

    expect(response.body.message)
      .toBe("Token tidak valid");

  });

});