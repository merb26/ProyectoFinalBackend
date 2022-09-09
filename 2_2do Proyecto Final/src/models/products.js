const mongoose = require("mongoose")

const productsCollection = "products"

const productSchema = new mongoose.Schema({
  nombre: { type: String, require: true, max: 100 },
  prueba: { type: Number, require: true },
})

export const products = mongoose.model(productsCollection, productSchema)
