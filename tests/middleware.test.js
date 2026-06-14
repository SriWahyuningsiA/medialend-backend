const request = require("supertest");
const app = require("../app");

describe("MIDDLEWARE AUTH TEST", () => {

  test("Token tidak valid", async () => {

    const response = await request(app)
      .get("/api/mahasiswa")
      .set("Authorization", "Bearer token_salah");

    expect(response.statusCode).toBe(401);

  });

});