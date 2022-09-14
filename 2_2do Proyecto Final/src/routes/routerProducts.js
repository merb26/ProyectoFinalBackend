const { Router } = require("express")

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
