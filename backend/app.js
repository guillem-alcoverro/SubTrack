const cors = require('cors');
const express = require("express")
const { initDb } = require("./models")

const subscriptionsRouter = require("./controllers/subscriptions")

initDb()

const app = express()
app.use(cors({
  origin: 'http://localhost:5173' // Vite development server URL
}));
app.use(express.json())

app.use("/api/subscriptions", subscriptionsRouter)

app.get("/", (request, response) => {
    response.send(`<html><head></head><body><h1>REST API</h1></body></html>`)
})

module.exports = app