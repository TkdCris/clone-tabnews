import database from "infra/database.js";

async function cleanDatabase () {
  await database.query("drop schema public cascade; create schema public;")
}

beforeAll(cleanDatabase);

test('GET /api/v1/migrations should return 200', async () => {
  const response1 = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response1.status).toBe(200);

  const response1Body = await response1.json();
  console.log("GET /api/v1/migrations 1", response1Body);

  expect(Array.isArray(response1Body)).toBe(true);
  expect(response1Body.length).toBeGreaterThan(0);
})
