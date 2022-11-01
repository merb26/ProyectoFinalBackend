import express from "express"
const app = express()

import { routeLogin } from "./src/routes/routeLogin.js"
import { routeRegister } from "./src/routes/routeRegister.js"

app.use("/", routeLogin)
app.use("/register", routeRegister)

import { runServer } from "./server.js"
runServer(app)
