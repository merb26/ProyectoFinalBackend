import { Router } from "express"
import passport from "passport"
export const routeRegister = Router()

import { countries } from "../apis/prefijosInternacionales.js"

// /register

routeRegister.get("/", (req, res) => {
  const prefixes = []

  countries.forEach(country => {
    prefixes.push({ country: country[0], prefixe: country[2] })
  })

  res.render("./register/register", { prefixes })
})

routeRegister.post(
  "/",
  passport.authenticate("signup", {
    successRedirect: "/products",
    failureRedirect: "/register/failer",
  })
)

routeRegister.get("/failer", (req, res) =>
  res.render("./register/errorRegister")
)
