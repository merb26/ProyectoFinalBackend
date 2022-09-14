const { Router } = require("express")

const { controllerCars } = require("../utils/chooseDatabase")

// http://localhost:8080/api/car
const routerCar = Router()

/* -------------------------------------------------------------------------- */
/*                   Listar productos guardados del carrito                   */
/* -------------------------------------------------------------------------- */
routerCar.get("/1/products", controllerCars.getCars)

/* -------------------------------------------------------------------------- */
/*                       Guardar un producto al carrito                       */
/* -------------------------------------------------------------------------- */
routerCar.post("/:id/products", controllerCars.saveProductOnCar)

/* -------------------------------------------------------------------------- */
/*                      Eliminar un producto del carrito                      */
/* -------------------------------------------------------------------------- */
routerCar.delete("/1/products/:id_prod", controllerCars.removeProductoOnCar)

/* -------------------------------------------------------------------------- */
/*                             Eliminar un carrito                            */
/* -------------------------------------------------------------------------- */
routerCar.delete("/:id", controllerCars.removeCar)

module.exports = routerCar
