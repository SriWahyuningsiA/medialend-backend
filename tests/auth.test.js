const request = require("supertest");

describe("Login Mahasiswa", () => {

  test("Login berhasil", async () => {

    const response = await request(
      "http://localhost:3000"
    )
      .post("/api/login-mahasiswa")
      .send({
        nim: "1234",
        password: "123456"
      });

    expect(response.statusCode)
      .toBe(200);

  });

});