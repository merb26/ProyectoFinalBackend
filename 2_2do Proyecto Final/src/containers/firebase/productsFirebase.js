const admin = require("firebase-admin")

const { firebase } = require("../../utils/connections")

class ContainerProducts {
  constructor(serviceAccount) {
    firebase(serviceAccount)
    this.db = admin.firestore()
    this.query = this.db.collection("products")
  }
  /* -------------------------------------------------------------------------- */
  /*                                    save                                    */
  /* -------------------------------------------------------------------------- */
  async save(obj) {
    try {
      const doc = this.query.doc()
      await doc.create(obj)
    } catch (error) {
      console.log(error)
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                                    update                                    */
  /* -------------------------------------------------------------------------- */
  async update(obj) {
    try {
      const doc = this.query.doc(`${obj.id}`)
      await doc.update(obj)
    } catch (error) {
      console.log(error)
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                                   getById                                  */
  /* -------------------------------------------------------------------------- */
  async getById(id) {
    try {
      const doc = this.query.doc(id)
      const item = await doc.get()
      let product = item.data()
      product = { ...product, id }
      return product
    } catch (error) {
      console.log(error)
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                                   getAll                                   */
  /* -------------------------------------------------------------------------- */
  async getAll() {
    try {
      const querySnapshot = await this.query.get()
      const docs = querySnapshot.docs

      const products = docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        description: doc.data().description,
        code: doc.data().code,
        price: doc.data().price,
        stock: doc.data().stock,
        timestamp: doc.data().timestamp,
        urlPicture: doc.data().urlPicture,
      }))

      return products
    } catch (error) {
      console.log(error)
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                                 deleteById                                 */
  /* -------------------------------------------------------------------------- */
  async deleteById(id) {
    try {
      const doc = this.query.doc(`${id}`)
      await doc.delete()
    } catch (error) {
      console.log(error)
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                                  deleteAll                                 */
  /* -------------------------------------------------------------------------- */
  async deleteAll() {}
}

module.exports = ContainerProducts
