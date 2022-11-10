import { Router } from "express"

import { loginMongodb } from "../controllers/login.js"
import { controllerProducts } from "../controllers/mongodbProducts.js"

export const routeProducts = Router()

routeProducts.get("/", loginMongodb.authentic, controllerProducts.getProducts)

routeProducts.get("/formSave", loginMongodb.authentic, async (req, res) =>
  res.render("./products/addProduct")
)

routeProducts.get(
  "/formUpdate/:id",
  loginMongodb.authentic,
  controllerProducts.getProductUpdate
)

routeProducts.post("/", loginMongodb.authentic, controllerProducts.saveProduct)

routeProducts.put(
  "/:id",
  loginMongodb.authentic,
  controllerProducts.updateProduct
)

routeProducts.delete(
  "/:id",
  loginMongodb.authentic,
  controllerProducts.removeProduct
)

routeProducts.post(
  "/:id",
  loginMongodb.authentic,
  controllerProducts.getProduct
)
