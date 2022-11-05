import { Router } from "express"
export const routeLogin = Router()

import passport from "../apis/passportLocal.js"

routeLogin
  .get("/", async (req, res) => {
    res.render("./login/login")
  })
  .post(
    "/",
    passport.authenticate("login", {
      failureRedirect: "/errorSesion",
    }),
    async (req, res) => {
      res.redirect("/products")
    }
  )
  .get("/logout", async (req, res, next) => {
    req.logOut(err => {
      if (err) {
        return next(err)
      }

      res.render("./login/login")
    })
  })

routeLogin.get("/errorSesion", (req, res) => {
  res.render("./login/errorSesion")
})
