const mongoose = require("mongoose")

const carsCollection = "cars"

const carSchema = new mongoose.Schema({
  timestamp: { type: String },
  products: { type: Array },
})

module.exports = mongoose.model(carsCollection, carSchema)
