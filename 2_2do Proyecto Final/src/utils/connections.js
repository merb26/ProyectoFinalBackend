const { mongoose } = require("mongoose")

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

const firebase = async () => {}

module.exports = { mongoDB, firebase }
