const express = require("express")
const bodyParser = require("body-parser")

const serverExpress = express()

const routerProducts = require("./routes/routerProducts")
const routerCar = require("./routes/routerCar")

serverExpress.use(bodyParser.urlencoded({ extended: false }))
serverExpress.use(express.json())
serverExpress.use(express.static("public"))

serverExpress.get("/", (req, res) => {
  res.render("index")
})

serverExpress.use("/api/products", routerProducts)
serverExpress.use("/api/car", routerCar)

serverExpress.set("view engine", "pug")
serverExpress.set("views", "./views")

const PORT = process.env.PORT || 8080
serverExpress.listen(PORT, () => {
  console.log(`*****Running to port: ${PORT}*****`)
})

serverExpress.use("*", (req, res) => {
  res.json({
    error: -2,
    description: `Ruta: ${req.url} Método: ${req.method} no implementada`,
  })
})
