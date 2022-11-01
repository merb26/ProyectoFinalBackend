import express from "express"
import session from "express-session"
const app = express()
import passport from "passport"
import mongoose, { connect } from "mongoose"
import * as dotenv from "dotenv"
dotenv.config()

import { routeLogin } from "./src/routes/routeLogin.js"
import { routeRegister } from "./src/routes/routeRegister.js"
import { runServer } from "./server.js"

/* -------------------------------------------------------------------------- */
/*                            Configuration MongoDB                           */
/* -------------------------------------------------------------------------- */

const URL = process.env.URL_MONGODB

;(async () => {
  await mongoose.connect(URL).catch(err => {
    throw new Error(err)
  })
})()

/* -------------------------------------------------------------------------- */
/*                                      /                                     */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                      Configuration passport y session                      */
/* -------------------------------------------------------------------------- */

app.use(
  session({
    secret: process.env.SECRET || "mY_seCret",
    cookie: {
      maxAge: 600 * 1000,
      httpOnly: true,
      secure: false,
    },
    rolling: true,
    resave: true,
    saveUninitialized: true,
  })
)

app.use(passport.initialize())
app.use(passport.session())

/* -------------------------------------------------------------------------- */
/*                                      /                                     */
/* -------------------------------------------------------------------------- */

app.use("/", routeLogin)
app.use("/register", routeRegister)

runServer(app)
