import database from "infra/database.js";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public;")
});

test('GET /api/v1/migrations should return 200', async () => {
  const response1 = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response1.status).toBe(200);

  const response1Body = await response1.json();
  expect(Array.isArray(response1Body)).toBe(true);
  expect(response1Body.length).toBeGreaterThan(0);
})
