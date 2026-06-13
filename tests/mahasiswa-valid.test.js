const request = require("supertest");
const app = require("../app");

describe("MAHASISWA CONTROLLER COVERAGE TEST", () => {

  let token = "";

  beforeAll(async () => {

    const login = await request(app)
      .post("/api/login-mahasiswa")
      .send({
        nim: "220099",
        password: "123456"
      });

    token = login.body.token;

  });

  test("GET /api/mahasiswa dengan token", async () => {

    const response = await request(app)
      .get("/api/mahasiswa")
      .set(
        "Authorization",
        `Bearer ${token}`
      );

    expect(response.statusCode)
      .toBe(200);

    expect(Array.isArray(response.body))
      .toBe(true);

  });

  test("GET /api/mahasiswa/profile dengan token", async () => {

    const response = await request(app)
      .get("/api/mahasiswa/profile")
      .set(
        "Authorization",
        `Bearer ${token}`
      );

    expect(response.statusCode)
      .toBe(200);

    expect(response.body)
      .toHaveProperty("id");

  });

  test("PUT /api/mahasiswa/profile dengan token", async () => {

    const response = await request(app)
      .put("/api/mahasiswa/profile")
      .set(
        "Authorization",
        `Bearer ${token}`
      )
      .send({
        nama: "Mahasiswa Testing",
        email: "testing@test.com"
      });

    expect(response.statusCode)
      .toBe(200);

    expect(response.body.message)
      .toBe("Profile berhasil diupdate");

  });

});