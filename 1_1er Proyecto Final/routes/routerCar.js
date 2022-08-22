const { Router } = require("express")

const Container = require("../apis/fileManagement")

const container = new Container("./files/car.json")
const containerProducts = new Container("./files/products.json")

// http://localhost:8080/api/car
const routerCar = Router()

// Listar productos guardados del carrito
routerCar.get("/1/products", async (req, res) => {
  const id = req.params.id
  const car = await container.getById(1)
  const products = car.products
  res.render("./car/productsSelects", { products })
})

// Crear un carrito y devuelve su id
routerCar.post("/", (req, res) => {
  const car = { ...req.body, timestamp: Date.now() }
  container.save(car)
  res.json(car)
})

// Guardar un producto al carrito
routerCar.post("/:id/products", async (req, res) => {
  const idProduct = req.params.id
  const product = await containerProducts.getById(idProduct)
  const car = await container.getById(1)
  car.products.push(product)
  await container.update(car)
  res.redirect("/api/car/1/products")
})

// Eliminar un carrito
routerCar.delete("/:id", async (req, res) => {
  const id = req.params.id
  const message = await container.deleteById(id)
  res.json(message)
})

// Eliminar un producto del carrito
routerCar.delete("/1/products/:id_prod", async (req, res) => {
  const id = 1
  const idProducts = req.params.id_prod
  const car = await container.getById(id)
  const productsUpdate = car.products.filter(
    product => product.id !== parseInt(idProducts)
  )
  car.products = productsUpdate
  console.log(car.products)
  container.replaceFile(car)
})

module.exports = routerCar
