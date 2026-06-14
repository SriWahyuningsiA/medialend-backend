const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../app");

const token = jwt.sign(
  {
    id: 1,
    role: "mahasiswa"
  },
  "SECRET_KEY"
);

describe("MAHASISWA API TEST", () => {

  test("GET /api/mahasiswa tanpa token", async () => {

    const response = await request(app)
      .get("/api/mahasiswa");

    expect(response.statusCode)
      .toBe(403);

  });

  test("GET /api/mahasiswa/profile tanpa token", async () => {

    const response = await request(app)
      .get("/api/mahasiswa/profile");

    expect(response.statusCode)
      .toBe(403);

  });

  test("PUT /api/mahasiswa/profile tanpa token", async () => {

    const response = await request(app)
      .put("/api/mahasiswa/profile")
      .send({
        nama: "Testing",
        email: "testing@gmail.com"
      });

    expect(response.statusCode)
      .toBe(403);

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

  });

});