const { Router } = require("express")
const controllerProductsMongodb = require("../controllers/products/mongodbProducts")
const Container = require("../containers/file")
const { ProductsDaoMongo } = require("../daos/products/mongoDB")
const { ProductsDaoFirebase } = require("../daos/products/firebase")

const container = new Container()
const containerMongoDB = new ProductsDaoMongo()
const containerFirebase = new ProductsDaoFirebase()

const { controllerProducts } = require("../utils/chooseDatabase")

// http://localhost:8080/api/products
const routerProducts = Router()

let isAdministrator = true

/* -------------------------------------------------------------------------- */
/*                         Listar todos los productos                         */
/* -------------------------------------------------------------------------- */
routerProducts.get("/", controllerProducts.getProducts)

/* -------------------------------------------------------------------------- */
/*                     Formulario para guardar o ingresar                     */
/* -------------------------------------------------------------------------- */
routerProducts.get("/formSave", async (req, res) => {
  res.render("./products/addProduct")
})

/* -------------------------------------------------------------------------- */
/*                   Formulario para actualizar o modificar                   */
/* -------------------------------------------------------------------------- */
routerProducts.get("/formUpdate/:id", controllerProducts.getProduct)

/* -------------------------------------------------------------------------- */
/*                              Guardar producto                              */
/* -------------------------------------------------------------------------- */
routerProducts.post("/", controllerProducts.saveProduct)

/* -------------------------------------------------------------------------- */
/*                             Modificar producto                             */
/* -------------------------------------------------------------------------- */
routerProducts.put("/:id", controllerProducts.updateProduct)

/* -------------------------------------------------------------------------- */
/*                               Borrar producto                              */
/* -------------------------------------------------------------------------- */
routerProducts.delete("/:id", controllerProducts.removeProduct)

module.exports = routerProducts
