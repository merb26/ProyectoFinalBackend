import { Router } from "express"
export const routeRegister = Router()

routeRegister.get("/", (req, res) => {
  res.json({ message: "register ok" })
})
