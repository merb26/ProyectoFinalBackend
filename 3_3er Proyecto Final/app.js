import yargs from "yargs/yargs"
const args = yargs(process.argv.slice(2)).argv
import express from "express"
import fileUpload from "express-fileupload"
import session from "express-session"
const app = express()
import passport from "passport"
import mongoose from "mongoose"
import { loggerCons, loggerWarn } from "./loggers/logger.js"
import cluster from "cluster"
import numCPUs from "os"
const cpus = numCPUs.cpus().length
import * as dotenv from "dotenv"
dotenv.config()

import { routeLogin } from "./src/routes/routeLogin.js"
import { routeRegister } from "./src/routes/routeRegister.js"
import { routeProducts } from "./src/routes/routeProducts.js"
import { routerCar } from "./src/routes/routerCar.js"
import { routeOrder } from "./src/routes/routeOrder.js"
import { runServer } from "./server.js"

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload())

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

/* -------------------------------------------------------------------------- */
/*                                     PUG                                    */
/* -------------------------------------------------------------------------- */

app.set("views", "./views")
app.set("view engine", "pug")

/* -------------------------------------------------------------------------- */
/*                                      /                                     */
/* -------------------------------------------------------------------------- */

const modo = args.MODO || ""

if (cluster.isPrimary && modo.toLowerCase() == "cluster") {
  loggerCons.info({ level: "info" }, `Master ${process.pid} is running`)

  for (let index = 0; index < cpus; index++) {
    cluster.fork()
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`)
  })
} else {
  app.use("/", routeLogin)
  app.use("/register", routeRegister)
  app.use("/car", routerCar)
  app.use("/products", routeProducts)
  app.use("/order", routeOrder)

  runServer(app)

  app.get("*", async (req, res) => {
    loggerWarn.warn({ url: `${req.url}` }, "Ruta inexistente")
    res.json({ message: "No existe la página" })
  })

  loggerCons.info({ level: "info" }, `Worker ${process.pid} started`)
}
