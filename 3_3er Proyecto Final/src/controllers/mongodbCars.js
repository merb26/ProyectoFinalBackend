import yargs from "yargs/yargs"
const args = yargs(process.argv.slice(2)).argv

import { ContainerCars } from "../containers/carsMongoDB.js"
import { ContainerProducts } from "../containers/productsMongoDB.js"
import { userLogin } from "../controllers/login.js"
import { sendMail } from "../apis/sendMail.js"
import { sendWP, sendSMS } from "../apis/twilio.js"
import { newOrder } from "../apis/newOrder.js"

const containerCars = new ContainerCars()
const containerProducts = new ContainerProducts()

let products

export const controllerCars = {
  getOrder: async (req, res) => {
    const subject = `Nuevo pedido de ${userLogin.name} (${userLogin.email})`

    const order = newOrder(products, subject)

    const email = args.EMAIL || "manuele.ramirez.26@gmail.com"
    // sendMail(email, subject, order.message)

    const phoneAdmin = args.PHONE
    // sendWP(order.messageWhatsapp, phoneAdmin)
    sendWP(
      "Tu pedido Coder de Games se envió y debería ser entregado el tanto. Detalles: muchos",
      phoneAdmin
    )

    const messageSMS = "Tu pedido se ha realizado con éxito, está en proceso."
    // sendSMS(messageSMS, userLogin.phone)

    containerCars.delete()

    res.render("./order/order", { userLogin })
  },

  getCars: async (req, res) => {
    const car = await containerCars.getAll()

    if (car.length === 0) {
      products = false
    } else {
      car[0].products = car[0].products.map(product => {
        product.id = product._id
        product._id = undefined
        return product
      })

      products = car[0].products
    }

    let carSelect = car[0]
    !carSelect && (carSelect = { _id: "0" })

    let total = 0
    if (products) {
      products.forEach(product => {
        const subtotal = product.price * product.amount
        product.subtotal = subtotal
        total += subtotal
      })
    }

    res.render("./car/productsSelects", { products, carSelect, total })
  },

  saveProductOnCar: async (req, res) => {
    const { id: idProduct } = req.params
    const { amount } = req.body

    const car = await containerCars.getAll()
    const product = await containerProducts.getById(idProduct)

    product.stock = undefined
    product._doc.amount = amount

    if (car.length === 0) {
      const car = {
        timestamp: Date.now(),
        products: [product],
      }
      containerCars.save(car)
    } else {
      let isProductFound = false

      car[0].products.forEach(
        product => (isProductFound = product._id.toString().includes(idProduct))
      )

      if (!isProductFound) {
        car[0].products.push(product)
        containerCars.update(car[0])
      }
    }
  },

  removeProductoOnCar: async (req, res) => {
    const idProduct = req.params.id_prod

    const car = await containerCars.getAll()

    for (let index = 0; index < car[0].products.length; index++) {
      car[0].products[index]._id.toString() === idProduct &&
        car[0].products.splice(index, 1)
    }

    car[0].products.length === 0
      ? containerCars.delete()
      : containerCars.update(car[0])
  },

  removeCar: async (req, res) => containerCars.delete(),
}
