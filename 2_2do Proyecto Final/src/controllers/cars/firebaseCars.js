const { CarsDaoFirebase } = require("../../daos/cars/firebase")
const { ProductsDaoFirebase } = require("../../daos/products/firebase")

const containerCars = new CarsDaoFirebase()
const containerProducts = new ProductsDaoFirebase()

const controllerCarsFirebase = {
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
        if (iterator.id === idProduct) {
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

    for (let index = 0; index < car[0].products.length; index++) {
      car[0].products[index].id.toString() === idProduct &&
        car[0].products.splice(index, 1)
    }

    if (car[0].products.length === 0) {
      containerCars.deleteById(car[0].id)
    } else {
      containerCars.update(car[0])
    }
  },
  removeCar: async (req, res) => {
    const car = await containerCars.getAll()
    containerCars.deleteById(car[0].id)
  },
}

module.exports = { controllerCarsFirebase }
