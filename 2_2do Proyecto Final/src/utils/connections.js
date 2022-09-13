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

const firebase = async serviceAccount => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })

  console.log("Connected database Firebase")
}

module.exports = { mongoDB, firebase }
