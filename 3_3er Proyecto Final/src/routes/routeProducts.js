import { Router } from "express"

export const routeProducts = Router()

routeProducts.get("/", (req, res) => {
  res.json({ message: "inicio de productos" })
})
