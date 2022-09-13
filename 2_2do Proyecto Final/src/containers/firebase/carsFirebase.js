const admin = require("firebase-admin")

class ContainerCars {
  constructor(nameCollection) {
    this.db = admin.firestore()
    this.query = this.db.collection(nameCollection)
    this.nameCollection = nameCollection
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

      const car = docs.map(doc => ({
        id: doc.id,
        products: doc.data().products,
        timestamp: doc.data().timestamp,
      }))

      return car
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
  async deleteAll() {
    try {
      await this.db.collection("cities").doc("DC").delete()
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = ContainerCars
