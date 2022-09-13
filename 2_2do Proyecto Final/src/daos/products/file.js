const Container = require("../../containers/file")

class ProductsDaoFile extends Container {
  constructor() {
    const fileURL = "../../dbs/products.json"
    super(fileURL)
  }
}

module.exports = ProductsDaoFile
