const { mongoose } = require("mongoose")

const mongoDB = async () => {
  try {
    const URL =
      "mongodb+srv://merb:XcKp9WciORH5TlCS@cluster0.4ryuos8.mongodb.net/test"
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("Connected database MongoDB")
  } catch (error) {
    console.log(error)
  }
}

module.exports = { mongoDB }
