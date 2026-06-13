const request = require("supertest");
const app = require("../app");

describe("AUTH MIDDLEWARE TEST", () => {

  test("Token tidak ada", async () => {

    const response =
      await request(app)
        .get("/api/mahasiswa");

    expect(response.statusCode)
      .toBe(403);

    expect(response.body.message)
      .toBe("Token tidak ada");

  });

  test("Token tidak valid", async () => {

    const response =
      await request(app)
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