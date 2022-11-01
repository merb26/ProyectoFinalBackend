import mongoose from "mongoose"

const nameCollection = "users"

const schemaUser = new mongoose.Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
})

export default mongoose.model(nameCollection, schemaUser)
