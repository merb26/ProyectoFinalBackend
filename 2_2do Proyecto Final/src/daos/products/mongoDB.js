const mongoDB = require("../../containers/mongoDB/productsMongoDB")

class ProductsDaoMongo extends mongoDB {
  constructor() {
    super(
      "mongodb+srv://merb:XcKp9WciORH5TlCS@cluster0.4ryuos8.mongodb.net/ecommerce"
    )
  }
}

module.exports = { ProductsDaoMongo }
