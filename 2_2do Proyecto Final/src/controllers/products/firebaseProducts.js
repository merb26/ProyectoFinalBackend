const { ProductsDaoFirebase } = require("../../daos/products/firebase")

const container = new ProductsDaoFirebase()

const controllerProductsFirebase = {
  getProducts: async (req, res) => {
    const products = await container.getAll()
    res.render("./products/listProducts", { products })
  },
  getProduct: async (req, res) => {
    const id = req.params.id

    const product = await container.getById(id)

    res.render("./products/updateProduct", { product })
  },
  saveProduct: async (req, res) => {
    const product = { ...req.body, timestamp: Date.now() }

    container.save(product)

    res.redirect("/api/products")
  },
  updateProduct: async (req, res) => {
    const id = req.params.id
    const product = { ...req.body, id }

    container.update(product)

    res.json({})
  },
  removeProduct: async (req, res) => {
    const id = req.params.id

    container.deleteById(id)
  },
}

module.exports = { controllerProductsFirebase }
