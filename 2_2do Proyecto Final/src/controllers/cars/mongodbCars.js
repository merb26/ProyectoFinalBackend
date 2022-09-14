const { CarsDaoMongo } = require("../../daos/cars/mongoDB")
const { ProductsDaoMongo } = require("../../daos/products/mongoDB")

const containerCars = new CarsDaoMongo()
const containerProducts = new ProductsDaoMongo()

const controllerCarsMongodb = {
  getCars: async (req, res) => {
    const car = await containerCars.getAll()
    if (car.length === 0) {
      products = false
    } else {
      car[0].products = car[0].products.map(obj => {
        obj["id"] = obj["_id"]
        delete obj["_id"]
        return obj
      })
      products = car[0].products
    }
    res.render("./car/productsSelects", { products })
  },
  saveProductOnCar: async (req, res) => {
    const idProduct = req.params.id

    const car = await containerCars.getAll()
    const product = await containerProducts.getById(idProduct)
    if (car.length === 0) {
      const car = {
        timestamp: Date.now(),
        products: [product],
      }
      containerCars.save(car)
    } else {
      let isProductFound = false

      car[0].products.forEach(product => {
        isProductFound = product._id.toString().includes(idProduct)
      })

      if (!isProductFound) {
        car[0].products.push(product)
        containerCars.update(car[0])
      }
    }

    res.redirect("/api/car/1/products")
  },
  removeProductoOnCar: async (req, res) => {
    const idProduct = req.params.id_prod

    const car = await containerCars.getAll()

    for (let index = 0; index < car[0].products.length; index++) {
      car[0].products[index]._id.toString() === idProduct &&
        car[0].products.splice(index, 1)
    }

    if (car[0].products.length === 0) {
      containerCars.delete()
    } else {
      containerCars.update(car[0])
    }
  },
  removeCar: async (req, res) => {
    containerCars.delete()
  },
}

module.exports = { controllerCarsMongodb }
