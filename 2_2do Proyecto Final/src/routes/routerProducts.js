const { Router } = require("express")
const Container = require("../containers/file")
const { ProductsDaoMongo } = require("../daos/products/mongoDB")
const { ProductsDaoFirebase } = require("../daos/products/firebase")

const container = new Container("./src/dbs/products.json")
const containerMongoDB = new ProductsDaoMongo()
const containerFirebase = new ProductsDaoFirebase()

// http://localhost:8080/api/products
const routerProducts = Router()

let isAdministrator = true

/* -------------------------------------------------------------------------- */
/*                         Listar todos los productos                         */
/* -------------------------------------------------------------------------- */
routerProducts.get("/", async (req, res) => {
  // const products = await container.getAll()

  //MongoDB
  // const products = await containerMongoDB.getAll()

  //Firebase
  const products = await containerFirebase.getAll()

  res.render("./products/listProducts", { products, isAdministrator })
})

/* -------------------------------------------------------------------------- */
/*                     Formulario para guardar o ingresar                     */
/* -------------------------------------------------------------------------- */
routerProducts.get("/formSave", async (req, res) => {
  res.render("./products/addProduct")
})

/* -------------------------------------------------------------------------- */
/*                   Formulario para actualizar o modificar                   */
/* -------------------------------------------------------------------------- */
routerProducts.get("/formUpdate/:id", async (req, res) => {
  const id = req.params.id
  // const product = await container.getById(id)

  //MongoDB
  // const product = await containerMongoDB.getById(id)

  //Firebase
  const product = await containerFirebase.getById(id)

  res.render("./products/updateProduct", { product })
})

/* -------------------------------------------------------------------------- */
/*                              Guardar producto                              */
/* -------------------------------------------------------------------------- */
routerProducts.post("/", async (req, res) => {
  const product = { ...req.body, timestamp: Date.now() }
  // container.save(product)

  //MongoDB
  // containerMongoDB.save(product)

  //Firebase
  containerFirebase.save(product)

  res.redirect("/api/products")
})

/* -------------------------------------------------------------------------- */
/*                             Modificar producto                             */
/* -------------------------------------------------------------------------- */
routerProducts.put("/:id", async (req, res) => {
  // container.update(product)

  //MongoDB
  // const _id = req.params.id
  // const product = { ...req.body, _id }
  // containerMongoDB.update(product)

  //Firebase
  const id = req.params.id
  const product = { ...req.body, id }
  containerFirebase.update(product)

  res.json({})
})

/* -------------------------------------------------------------------------- */
/*                               Borrar producto                              */
/* -------------------------------------------------------------------------- */
routerProducts.delete("/:id", (req, res) => {
  // container.deleteById(id)

  //MongoDB
  // const _id = req.params.id
  // containerMongoDB.deleteById(_id)

  //Firebase
  const id = req.params.id
  containerFirebase.deleteById(id)
})

module.exports = routerProducts
