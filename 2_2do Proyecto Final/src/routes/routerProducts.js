const { Router } = require("express")
const Container = require("../containers/file")
const { ProductsDaoMongo } = require("../daos/products/mongoDB")

const container = new Container("./src/dbs/products.json")
const containerMongoDB = new ProductsDaoMongo()

// http://localhost:8080/api/products
const routerProducts = Router()

let isAdministrator = true

// Listar todos los productos
routerProducts.get("/", async (req, res) => {
  // const products = await container.getAll()
  const products = await containerMongoDB.getAll()
  res.render("./products/listProducts", { products, isAdministrator })
})

// Formulario para guardar o ingresar
routerProducts.get("/formSave", async (req, res) => {
  res.render("./products/addProduct")
})

// Formulario para actualizar o modificar
routerProducts.get("/formUpdate/:id", async (req, res) => {
  const id = req.params.id
  // const product = await container.getById(id)
  const product = await containerMongoDB.getById(id)
  res.render("./products/updateProduct", { product })
})

// Guardar producto
routerProducts.post("/", async (req, res) => {
  const product = { ...req.body, timestamp: Date.now() }
  // container.save(product)
  containerMongoDB.save(product)
  res.redirect("/api/products")
})

// Modificar producto
routerProducts.put("/:id", async (req, res) => {
  const _id = req.params.id
  const product = { ...req.body, _id }
  // container.update(product)
  containerMongoDB.update(product)
})

// Borrar producto
routerProducts.delete("/:id", (req, res) => {
  const _id = req.params.id
  // container.deleteById(id)
  containerMongoDB.deleteById(_id)
})

module.exports = routerProducts
