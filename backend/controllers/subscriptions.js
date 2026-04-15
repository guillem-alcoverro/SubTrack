const { subscriptionsModel } = require("../models")
const router = require("express").Router()

router.get("/", (request, response) => {
    const subscriptions = subscriptionsModel.getAllSubscriptions()
    response.json(subscriptions)
})

router.get("/:id", (request, response) => {
    const { id } = request.params
    if (!id) {
        return response.status(400).json({ error: "Missing subscription ID" })
    }
    const subscription = subscriptionsModel.getSubscriptionsById(id)
    if (!subscription) {
        return response.status(404).json({ error: "Subscription not found" })
    }
    response.json(subscription)
})

router.post("/", (request, response) => {
    const { name, category, price, dateStart, dateEnd, frequency, icon } = request.body
    if (!name || !category || !price) {
        return response.status(400).json({ error: "Missing required fields: name, category, price" })
    }
    const subscription = subscriptionsModel.createSubscriptions({
        name,
        category,
        price,
        dateStart,
        dateEnd,
        frequency,
        icon
    })
    response.status(201).json(subscription)
})

module.exports = router