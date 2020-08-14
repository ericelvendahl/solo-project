const app = require("../server");
const testServer = require("supertest");

describe("Testing user routes, ensuring proper logout", () => {
  test("Logout route should always respond with status 200", async () => {
    const response = await testServer(app).post("/api/user/logout");
    expect(response.statusCode).toBe(200);
  });

  test("User route should be protected - must be logged in", async () => {
    const response = await testServer(app).get("/api/user/");
    expect(response.statusCode).toBe(403);
  });

  test("User route should return user if logged in", async () => {
    const agent = testServer.agent(app);
    const response = await agent
      .post("/api/user/login")
      .send({ username: "eric", password: "eric" });
    expect(response.statusCode).toBe(200);

    const userResponse = await agent.get("/api/user/");
    expect(userResponse.statusCode).toBe(200);
    console.log("userResponse is:", userResponse);  
  });
});
