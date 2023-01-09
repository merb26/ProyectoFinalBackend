import yargs from 'yargs/yargs';
import {CarsMongoDAO} from '../dao/carsMongoDAO.js';
import {OrdersMongoDAO} from '../dao/ordersMongoDAO.js';
const args = yargs(process.argv.slice(2)).argv;

import {newOrder} from '../utils/newOrder.js';
import {userLogin} from '../controllers/controllerLogin.js';
import {sendMail} from '../utils/sendMail.js';
import {ProductsMongoDAO} from '../dao/productsMongoDAO.js';

const daoCars = new CarsMongoDAO();
const daoOrders = new OrdersMongoDAO();
const daoProducts = new ProductsMongoDAO();

let products;

export const serviceCars = {
  getOrder: async () => {
    const subject = `Detalles del pedido de ${userLogin.name}`;

    const car = await daoCars.getAll();

    const order = newOrder(car[0].products, subject);

    const orders = await daoOrders.getAll();

    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const age = now.getFullYear();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const dateAndHour = `[${day}/${month}/${age} ${hours}:${minutes}:${seconds}]`;

    const orderUpdate = {
      ...order.orderMongo2,
      email: userLogin.email,
      numOrder: ++orders.length || 1,
      dateAndHour,
    };

    daoOrders.save(orderUpdate);

    const email = userLogin.email || 'manuele.ramirez.26@gmail.com';
    sendMail(email, subject, order.message);

    daoCars.delete();
  },

  getCars: async () => {
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

    return {products, carSelect, total};
  },

  getProductOnCar: async (id) => {
    const car = await daoCars.getAll();
    let productUpdate;

    car[0].products.forEach((product) => {
      if (product._id == id) {
        productUpdate = product;
      }
    });

    return productUpdate;
  },

  saveProductOnCar: async (idProduct, amount) => {
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

  updateProductOnCar: async (id, productUpdate) => {
    const car = await daoCars.getAll();

    car[0].products.forEach((product) => {
      if (product._id == id) {
        product.amount = productUpdate.amount;
      }
    });

    daoCars.update(car[0]);
  },

  removeProductOnCar: async (idProduct) => {
    const car = await daoCars.getAll();

    for (let index = 0; index < car[0].products.length; index++) {
      car[0].products[index]._id.toString() === idProduct &&
        car[0].products.splice(index, 1);
    }

    car[0].products.length === 0 ? daoCars.delete() : daoCars.update(car[0]);
  },

  removeCar: async () => daoCars.delete(),
};
