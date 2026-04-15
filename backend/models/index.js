const db = require("../utils/db")
const subscriptionsModel = require("./subscriptions")

const initDb = () => {
    db.exec(`
        CREATE TABLE IF NOT EXISTS subscriptions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            category TEXT NOT NULL,
            price FLOAT NOT NULL,
            dateStart TEXT NOT NULL,
            dateEnd TEXT,
            billingCycle TEXT NOT NULL CHECK(billingCycle IN ('monthly', 'annual')),
            photo TEXT NOT NULL
        )
    `)
}

module.exports = { initDb, subscriptionsModel }