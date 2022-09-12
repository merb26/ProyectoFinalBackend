const { Router } = require("express")

const Container = require("../containers/file")
const { CarsDaoMongo } = require("../daos/cars/mongoDB")
const { ProductsDaoMongo } = require("../daos/products/mongoDB")

const container = new Container("./src/dbs/car.json")
const containerProducts = new Container("./src/dbs/products.json")

const containerMongoDB = new CarsDaoMongo()
const containerMongoDBProducts = new ProductsDaoMongo()

// http://localhost:8080/api/car
const routerCar = Router()

/* -------------------------------------------------------------------------- */
/*                   Listar productos guardados del carrito                   */
/* -------------------------------------------------------------------------- */
routerCar.get("/1/products", async (req, res) => {
  // const id = req.params.id
  // const car = await container.getById(1)
  // const products = car.products

  //MongoDB
  const car = await containerMongoDB.getAll()
  car.length === 0 ? (products = false) : (products = car[0].products)

  res.render("./car/productsSelects", { products })
})

/* -------------------------------------------------------------------------- */
/*                       Guardar un producto al carrito                       */
/* -------------------------------------------------------------------------- */
routerCar.post("/:id/products", async (req, res) => {
  const idProduct = req.params.id
  // const product = await containerProducts.getById(idProduct)
  // const car = await container.getById(1)
  // car.products.push(product)
  // await container.update(car)

  //MongoDB
  const car = await containerMongoDB.getAll()
  const product = await containerMongoDBProducts.getById(idProduct)
  if (car.length === 0) {
    const car = {
      timestamp: Date.now(),
      products: [product],
    }
    containerMongoDB.save(car)
  } else {
    let isProductFound = false
    car[0].products.forEach(product => {
      isProductFound = product._id.toString().includes(idProduct)
    })

    if (!isProductFound) {
      car[0].products.push(product)
      containerMongoDB.update(car[0])
    }
  }

  res.redirect("/api/car/1/products")
})

/* -------------------------------------------------------------------------- */
/*                      Eliminar un producto del carrito                      */
/* -------------------------------------------------------------------------- */
routerCar.delete("/1/products/:id_prod", async (req, res) => {
  const idProduct = req.params.id_prod

  // const car = await container.getById(id)
  // const productsUpdate = car.products.filter(
  //   product => product.id !== parseInt(idProducts)
  // )
  // car.products = productsUpdate
  // container.replaceFile(car)

  //MongoDB
  const car = await containerMongoDB.getAll()

  for (let index = 0; index < car[0].products.length; index++) {
    car[0].products[index]._id.toString() === idProduct &&
      car[0].products.splice(index, 1)
  }

  if (car[0].products.length === 0) {
    containerMongoDB.delete()
  } else {
    containerMongoDB.update(car[0])
  }
})

/* -------------------------------------------------------------------------- */
/*                             Eliminar un carrito                            */
/* -------------------------------------------------------------------------- */
routerCar.delete("/:id", async (req, res) => {
  // const id = req.params.id
  // const message = await container.deleteById(id)

  //MongoDB
  containerMongoDB.delete()
})

module.exports = routerCar
