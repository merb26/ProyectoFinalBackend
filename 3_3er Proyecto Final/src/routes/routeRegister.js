import { Router } from "express"
import passport from "passport"
export const routeRegister = Router()

routeRegister
  .get("/", (req, res) => {
    res.render("./register/register")
  })
  .post(
    "/",
    passport.authenticate("signup", {
      successRedirect: "/home",
      failureRedirect: "register/failer",
    })
  )

routeRegister.get("/failer", (req, res) => {
  res.render("./register/errorRegister")
})
