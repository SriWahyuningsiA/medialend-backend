const request = require("supertest");

describe("AUTH TEST", () => {

  test("Login mahasiswa berhasil", async () => {

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

  test("Login mahasiswa gagal jika NIM kosong", async () => {

    const response = await request(
      "http://localhost:3000"
    )
      .post("/api/login-mahasiswa")
      .send({
        nim: "",
        password: "123456"
      });

    expect(response.statusCode)
      .toBe(400);

  });

  test("Login mahasiswa gagal jika password kosong", async () => {

    const response = await request(
      "http://localhost:3000"
    )
      .post("/api/login-mahasiswa")
      .send({
        nim: "1234",
        password: ""
      });

    expect(response.statusCode)
      .toBe(400);

  });

  test("Login admin gagal jika username kosong", async () => {

    const response = await request(
      "http://localhost:3000"
    )
      .post("/api/login-admin")
      .send({
        username: "",
        password: "admin123"
      });

    expect(response.statusCode)
      .toBe(400);

  });

  test("Login admin gagal jika password kosong", async () => {

    const response = await request(
      "http://localhost:3000"
    )
      .post("/api/login-admin")
      .send({
        username: "admin",
        password: ""
      });

    expect(response.statusCode)
      .toBe(400);

  });

  test("Login admin gagal jika admin tidak ditemukan", async () => {

    const response = await request(
      "http://localhost:3000"
    )
      .post("/api/login-admin")
      .send({
        username: "admin_tidak_ada",
        password: "123456"
      });

    expect(
      [404, 401]
    ).toContain(response.statusCode);

  });

});