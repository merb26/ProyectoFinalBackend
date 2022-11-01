import { Router } from "express"
export const routeLogin = Router()

import passport from "../apis/passportLocal.js"

routeLogin.get("/", (req, res) => {
  res.json({ message: "home login" })
})

routeLogin.post(
  "/",
  passport.authenticate("login", {
    successRedirect: "/home",
    failureRedirect: "/",
  })
)
