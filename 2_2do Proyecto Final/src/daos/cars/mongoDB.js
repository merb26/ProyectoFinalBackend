const mongoDB = require("../../../../3_3er Proyecto Final/src/containers/carsMongoDB")

class CarsDaoMongo extends mongoDB {
  constructor() {
    super(
      "mongodb+srv://merb:XcKp9WciORH5TlCS@cluster0.4ryuos8.mongodb.net/ecommerce"
    )
  }

  async desconnected() {}
}

module.exports = { CarsDaoMongo }
