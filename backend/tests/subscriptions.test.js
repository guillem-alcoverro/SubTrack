const supertest = require("supertest")
const assert = require('node:assert')
const { test, describe, before } = require('node:test')
const db = require("../utils/db")
const app = require("../app")
const api = supertest(app)
const { name } = require("../utils/db")

before(async () => {
  await db.exec("DELETE FROM subscriptions")
})

describe("POST /api/subscriptions", () => {
  test("should create a new subscription", async () => {
    const newSubscription = {
        "name": "Netflix",
        "category": "entertainment",
        "price": 14.99,
        "dateStart": "15/4/2026",
    }

    const response = await api
      .post("/api/subscriptions")
      .send(newSubscription)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    assert.strictEqual(response.body.name, newSubscription.name)
    assert.strictEqual(response.body.category, newSubscription.category)
    assert.strictEqual(response.body.price, newSubscription.price)
    assert.strictEqual(response.body.dateStart, newSubscription.dateStart)
    assert.strictEqual(response.body.dateEnd, null)
    assert.strictEqual(response.body.billingCycle, "monthly")
  })
})