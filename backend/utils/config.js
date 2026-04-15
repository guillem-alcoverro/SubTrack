require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";

const PORT = process.env.PORT || 8000;

const SQLITE_URL = isProduction 
  ? (process.env.SQLITE_URL || "subscriptions.db") 
  : ":memory:";

module.exports = { PORT, SQLITE_URL }