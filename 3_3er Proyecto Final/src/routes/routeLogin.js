import { Router } from "express"
export const routeLogin = Router()

import passport from "../apis/passportLocal.js"

routeLogin.get("/", async (req, res) => {
  res.render("./login/login")
})

routeLogin.post(
  "/",
  passport.authenticate("login", {
    failureRedirect: "/errorSesion",
    successRedirect: "/products",
  })
)

routeLogin.get("/logout", async (req, res, next) => {
  req.logOut(err => {
    if (err) next(err)

    res.render("./login/login")
  })
})

routeLogin.get("/errorSesion", (req, res) => {
  res.render("./login/errorSesion")
})
