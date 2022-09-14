const { CarsDaoFile } = require("../../daos/cars/file")
const { ProductsDaoFile } = require("../../daos/products/file")

const containerCars = new CarsDaoFile()
const containerProducts = new ProductsDaoFile()

const controllerCarsFile = {
  getCars: async (req, res) => {
    const car = await containerCars.getAll()
    car.length === 0 ? (products = false) : (products = car[0].products)

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

      for (const iterator of car[0].products) {
        if (iterator.id.toString() === idProduct) {
          isProductFound = true
          break
        }
      }

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

    if (car.length !== 0) {
      for (let index = 0; index < car[0].products.length; index++) {
        car[0].products[index].id.toString() === idProduct &&
          car[0].products.splice(index, 1)
      }

      if (car[0].products.length === 0) {
        containerCars.deleteAll()
      } else {
        containerCars.update(car[0])
      }
    }
  },
  removeCar: async (req, res) => {
    containerCars.deleteAll()
  },
}

module.exports = { controllerCarsFile }
