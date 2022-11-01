import { Router } from "express"
export const routeLogin = Router()

routeLogin.get("/", (req, res) => {
  res.json({ message: "home login" })
})
