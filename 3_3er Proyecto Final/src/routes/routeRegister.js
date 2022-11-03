import { Router } from "express"
import passport from "passport"
export const routeRegister = Router()

import { e } from "../apis/prefijosInternacionales.js"

routeRegister
  .get("/", (req, res) => {
    const prefijos = []

    e.forEach(pais => {
      prefijos.push({ pais: pais[0], prefijo: pais[2] })
    })

    res.render("./register/register", { prefijos })
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
