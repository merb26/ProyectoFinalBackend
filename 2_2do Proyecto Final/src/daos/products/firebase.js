const productsFirebase = require("../../containers/firebase/productsFirebase")

class ProductsDaoFirebase extends productsFirebase {
  constructor() {
    super("products")
  }
}

module.exports = { ProductsDaoFirebase }
