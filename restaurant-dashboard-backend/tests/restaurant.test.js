// tests/restaurant.test.js
const request = require("supertest");
const app = require("../server"); // Import the correct file (server.js)

describe("POST /api/restaurant", () => {
  it("should create a new restaurant", async () => {
    const res = await request(app).post("/api/restaurant").send({
      name: "Test Restaurant",
      owner: "John Doe",
      mobileNumber: "1234567890",
      email: "test@restaurant.com",
      status: "active",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Test Restaurant");
    expect(res.body.owner).toBe("John Doe");
    expect(res.body.mobileNumber).toBe("1234567890");
    expect(res.body.email).toBe("test@restaurant.com");
  });
});
