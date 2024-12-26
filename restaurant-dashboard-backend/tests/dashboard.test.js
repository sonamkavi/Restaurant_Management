// tests/dashboard.test.js
const request = require("supertest");
const app = require("../server"); // Correct import path to server.js

describe("GET /api/restaurant/dashboard", () => {
  it("should return dashboard data", async () => {
    const res = await request(app).get("/api/restaurant/dashboard");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("totalRestaurants");
    expect(res.body).toHaveProperty("activeRestaurants");
    expect(res.body).toHaveProperty("inactiveRestaurants");
    expect(res.body).toHaveProperty("totalRevenue");
  });
});
