const { mongoose } = require("mongoose")
const admin = require("firebase-admin")

const mongoDB = async URL => {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("Connected database MongoDB")
  } catch (error) {
    console.log(error)
  }
}

const firebase = async () => {
  try {
    const serviceAccount = require("./ecommerce-c8bee-firebase-adminsdk-kyc5y-19969d793c.json")
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
    console.log("Connected to Firebase")
  } catch (error) {
    console.log(error)
  }
}

module.exports = { mongoDB, firebase }
