import products from "../models/products.js"

export class ContainerProducts {
  constructor() {}
  /* -------------------------------------------------------------------------- */
  /*                                    save                                    */
  /* -------------------------------------------------------------------------- */
  async save(obj) {
    const product = new products(obj)
    product.save()
  }

  /* -------------------------------------------------------------------------- */
  /*                                    update                                    */
  /* -------------------------------------------------------------------------- */
  async update(obj) {
    const { _id, name, description, code, urlPicture, price, stock } = obj
    await products.updateOne(
      { _id },
      {
        $set: {
          name,
          description,
          code,
          urlPicture,
          price,
          stock,
        },
      }
    )
  }

  /* -------------------------------------------------------------------------- */
  /*                                   getById                                  */
  /* -------------------------------------------------------------------------- */
  async getById(_id) {
    return products.findOne({ _id })
  }

  /* -------------------------------------------------------------------------- */
  /*                                   getAll                                   */
  /* -------------------------------------------------------------------------- */
  async getAll() {
    return products.find({})
  }

  /* -------------------------------------------------------------------------- */
  /*                                 deleteById                                 */
  /* -------------------------------------------------------------------------- */
  async deleteById(_id) {
    await products.deleteOne({ _id })
  }
}