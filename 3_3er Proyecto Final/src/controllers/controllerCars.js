import yargs from 'yargs/yargs';
const args = yargs(process.argv.slice(2)).argv;

import {CarsMongoDAO} from '../dao/carsMongoDAO.js';
import {ProductsMongoDAO} from '../dao/productsMongoDAO.js';
import {userLogin} from './login.js';
import {sendMail} from '../apis/sendMail.js';
import {sendWP, sendSMS} from '../apis/twilio.js';
import {newOrder} from '../apis/newOrder.js';

const daoCars = new CarsMongoDAO();
const daoProducts = new ProductsMongoDAO();

let products;

export const controllerCars = {
  getOrder: async (req, res) => {
    const subject = `Nuevo pedido de ${userLogin.name} (${userLogin.email})`;

    const order = newOrder(products, subject);

    const email = args.EMAIL || 'manuele.ramirez.26@gmail.com';
    // sendMail(email, subject, order.message)

    const phoneAdmin = args.PHONE;
    // sendWP(order.messageWhatsapp, phoneAdmin)

    const messageSMS = 'Tu pedido se ha realizado con éxito, está en proceso.';
    // sendSMS(messageSMS, userLogin.phone)

    daoCars.delete();

    res.render('./order/order', {userLogin});
  },

  getCars: async (req, res) => {
    const car = await daoCars.getAll();

    if (car.length === 0) {
      products = false;
    } else {
      car[0].products = car[0].products.map((product) => {
        product.id = product._id;
        product._id = undefined;
        return product;
      });

      products = car[0].products;
    }

    let carSelect = car[0];
    !carSelect && (carSelect = {_id: '0'});

    let total = 0;
    if (products) {
      products.forEach((product) => {
        const subtotal = product.price * product.amount;
        product.subtotal = subtotal;
        total += subtotal;
      });
    }

    res.render('./car/productsSelects', {products, carSelect, total});
  },

  getProductOnCar: async (req, res) => {
    const {id} = req.params;

    const car = await daoCars.getAll();

    car[0].products.forEach((product) => {
      if (product._id == id) {
        console.log(product);
        res.render('./car/updateCar', {product});
      }
    });
  },

  saveProductOnCar: async (req, res) => {
    const {id: idProduct} = req.params;
    const {amount} = req.body;

    const car = await daoCars.getAll();
    const product = await daoProducts.getById(idProduct);

    product.stock = undefined;
    product._doc.amount = amount;

    if (car.length === 0) {
      const car = {
        timestamp: Date.now(),
        products: [product],
      };
      daoCars.save(car);
    } else {
      let isProductFound = false;

      car[0].products.forEach(
        (product) =>
          (isProductFound = product._id.toString().includes(idProduct))
      );

      if (!isProductFound) {
        car[0].products.push(product);
        daoCars.update(car[0]);
      }
    }
  },

  updateProductOnCar: async (req, res) => {
    const {id} = req.params;
    const {productUpdate} = req.body;

    const car = await daoCars.getAll();

    car[0].products.forEach((product) => {
      if (product._id == id) {
        product.amount = productUpdate.amount;
      }
    });

    daoCars.update(car[0]);

    res.json({});
  },

  removeProductoOnCar: async (req, res) => {
    const idProduct = req.params.id_prod;

    const car = await daoCars.getAll();

    for (let index = 0; index < car[0].products.length; index++) {
      car[0].products[index]._id.toString() === idProduct &&
        car[0].products.splice(index, 1);
    }

    car[0].products.length === 0 ? daoCars.delete() : daoCars.update(car[0]);
  },

  removeCar: async (req, res) => daoCars.delete(),
};