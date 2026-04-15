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
            frequency TEXT NOT NULL CHECK(frequency IN ('weekly', 'monthly', 'annual')),
            icon TEXT NOT NULL
        )
    `)
}

module.exports = { initDb, subscriptionsModel }