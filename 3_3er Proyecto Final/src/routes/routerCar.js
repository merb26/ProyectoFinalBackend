import { Router } from "express"

import { loginMongodb } from "../controllers/login.js"
import { controllerCars } from "../controllers/mongodbCars.js"

// http://localhost:8080/car
export const routerCar = Router()

/* -------------------------------------------------------------------------- */
/*                   Listar productos guardados del carrito                   */
/* -------------------------------------------------------------------------- */
routerCar.get("/1/products", loginMongodb.authentic, controllerCars.getCars)

/* -------------------------------------------------------------------------- */
/*                       Guardar un producto al carrito                       */
/* -------------------------------------------------------------------------- */
routerCar.post(
  "/:id/products",
  loginMongodb.authentic,
  controllerCars.saveProductOnCar
)

/* -------------------------------------------------------------------------- */
/*                      Eliminar un producto del carrito                      */
/* -------------------------------------------------------------------------- */
routerCar.delete(
  "/1/products/:id_prod",
  loginMongodb.authentic,
  controllerCars.removeProductoOnCar
)

/* -------------------------------------------------------------------------- */
/*                             Eliminar un carrito                            */
/* -------------------------------------------------------------------------- */
routerCar.delete("/:id", loginMongodb.authentic, controllerCars.removeCar)
