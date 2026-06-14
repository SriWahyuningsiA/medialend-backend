const request = require("supertest");
const app = require("../app");

describe("AUTH TEST", () => {

  test("Login mahasiswa berhasil", async () => {

    const response = await request(app)
      .post("/api/login-mahasiswa")
      .send({
        nim: "1234",
        password: "123456"
      });

    expect(response.statusCode)
      .toBe(200);

  });

  test("Login mahasiswa gagal jika NIM kosong", async () => {

    const response = await request(app)
      .post("/api/login-mahasiswa")
      .send({
        nim: "",
        password: "123456"
      });

    expect(response.statusCode)
      .toBe(400);

  });

  test("Login mahasiswa gagal jika password kosong", async () => {

    const response = await request(app)
      .post("/api/login-mahasiswa")
      .send({
        nim: "1234",
        password: ""
      });

    expect(response.statusCode)
      .toBe(400);

  });

  test("Login mahasiswa dengan NIM baru", async () => {

    const response = await request(app)
      .post("/api/login-mahasiswa")
      .send({
        nim: "987654321",
        password: "123456"
      });

    expect(response.statusCode)
      .toBe(200);

  });

});