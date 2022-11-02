import { Router } from "express"
import { loginMongodb } from "../controllers/login.js"

export const routeProducts = Router()

routeProducts.get("/", loginMongodb.authentic, (req, res) => {
  res.render("./home")
})
