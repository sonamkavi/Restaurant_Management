// tests/auth.test.js
const request = require("supertest");
const app = require("../server"); // Correct import path to server.js

describe("POST /api/auth/login", () => {
  it("should send OTP on valid credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "testuser@example.com", password: "password123" });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("OTP sent to your email");
  });

  it("should return error for invalid credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "wronguser@example.com", password: "wrongpassword" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Invalid credentials");
  });
});
