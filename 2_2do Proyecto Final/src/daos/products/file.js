const Container = require("../../containers/file")

class ProductsDaoFile extends Container {
  constructor() {
    const fileURL = "./src/dbs/products.json"
    super(fileURL)
  }
}

module.exports = { ProductsDaoFile }
