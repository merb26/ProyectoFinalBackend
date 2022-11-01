import { Router } from "express"
export const routeLogin = Router()

import passport from "../apis/passportLocal.js"

routeLogin.get("/", (req, res) => {
  res.render("./login/login")
})

routeLogin.post(
  "/",
  passport.authenticate("login", {
    successRedirect: "/home",
    failureRedirect: "/",
  })
)
