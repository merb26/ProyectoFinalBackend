import mongoose from "mongoose"

const carsCollection = "cars"

const carSchema = new mongoose.Schema({
  timestamp: { type: String },
  products: { type: Array },
})

export default mongoose.model(carsCollection, carSchema)
