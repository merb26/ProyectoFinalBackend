const productsFirebase = require("../../containers/firebase/productsFirebase")
const serviceAccount = require("../../utils/ecommerce-c8bee-firebase-adminsdk-kyc5y-19969d793c.json")

class ProductsDaoFirebase extends productsFirebase {
  constructor() {
    super(serviceAccount)
  }
}

module.exports = { ProductsDaoFirebase }
