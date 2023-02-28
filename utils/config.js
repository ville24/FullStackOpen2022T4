require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
let PASSWORD = process.env.PASSWORD

module.exports = {
  MONGODB_URI,
  PORT,
  PASSWORD
}