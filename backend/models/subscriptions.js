const db = require("../utils/db")

const getAllSubscriptions = () => {
    const q = db.prepare(`
        SELECT * FROM subscriptions
    `)
    return q.all()
}

const getSubscriptionsById = (id) => {
    const q = db.prepare(`
        SELECT * FROM subscriptions WHERE id = ?
    `)
    return q.get(id)
}

const createSubscriptions = (subscriptions) => {
    const q = db.prepare(`
        INSERT INTO subscriptions (name, category, price, dateStart, dateEnd, frequency, icon)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `)
    const result = q.run(
        subscriptions.name,
        subscriptions.category,
        subscriptions.price,
        subscriptions.dateStart ?? new Date().toLocaleDateString(),
        subscriptions.dateEnd ?? null,
        subscriptions.frequency ?? "monthly",
        subscriptions.icon ?? "https://placehold.co/150x150?text=TEMPLATE"
    )
    return getSubscriptionsById(result.lastInsertRowid)
}

module.exports = { getAllSubscriptions, getSubscriptionsById, createSubscriptions }