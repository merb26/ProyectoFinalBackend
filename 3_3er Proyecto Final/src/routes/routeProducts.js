import { Router } from "express"

import { loginMongodb } from "../controllers/login.js"
import { controllerProducts } from "../controllers/mongodbProducts.js"

export const routeProducts = Router()

/* -------------------------------------------------------------------------- */
/*                         Listar todos los productos                         */
/* -------------------------------------------------------------------------- */
routeProducts.get("/", loginMongodb.authentic, controllerProducts.getProducts)

/* -------------------------------------------------------------------------- */
/*                     Formulario para guardar o ingresar                     */
/* -------------------------------------------------------------------------- */
routeProducts.get("/formSave", loginMongodb.authentic, async (req, res) => {
  res.render("./products/addProduct")
})

/* -------------------------------------------------------------------------- */
/*                   Formulario para actualizar o modificar                   */
/* -------------------------------------------------------------------------- */
routeProducts.get(
  "/formUpdate/:id",
  loginMongodb.authentic,
  controllerProducts.getProductUpdate
)

/* -------------------------------------------------------------------------- */
/*                              Guardar producto                              */
/* -------------------------------------------------------------------------- */
routeProducts.post("/", loginMongodb.authentic, controllerProducts.saveProduct)

/* -------------------------------------------------------------------------- */
/*                             Modificar producto                             */
/* -------------------------------------------------------------------------- */
routeProducts.put(
  "/:id",
  loginMongodb.authentic,
  controllerProducts.updateProduct
)

/* -------------------------------------------------------------------------- */
/*                               Borrar producto                              */
/* -------------------------------------------------------------------------- */
routeProducts.delete(
  "/:id",
  loginMongodb.authentic,
  controllerProducts.removeProduct
)

/* -------------------------------------------------------------------------- */
/*                           Muestra producto por id                          */
/* -------------------------------------------------------------------------- */
routeProducts.post("/:id", controllerProducts.getProduct)
