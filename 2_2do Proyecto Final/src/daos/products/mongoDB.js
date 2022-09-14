const ContainerProducts = require("../../containers/mongoDB/productsMongoDB")

class ProductsDaoMongo extends ContainerProducts {
  constructor() {
    super(
      "mongodb+srv://merb:XcKp9WciORH5TlCS@cluster0.4ryuos8.mongodb.net/ecommerce"
    )
  }
}

module.exports = { ProductsDaoMongo }
