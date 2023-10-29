require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const DB_PASSWORD = process.env.PASSWORD

module.exports = { PORT, MONGODB_URI, DB_PASSWORD }
