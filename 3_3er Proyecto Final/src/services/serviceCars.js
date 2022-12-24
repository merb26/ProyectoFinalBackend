import yargs from 'yargs/yargs';
import {CarsMongoDAO} from '../dao/carsMongoDAO.js';
import {OrdersMongoDAO} from '../dao/ordersMongoDAO.js';
const args = yargs(process.argv.slice(2)).argv;

import {newOrder} from '../apis/newOrder.js';
import {userLogin} from '../controllers/login.js';
import {sendMail} from '../apis/sendMail.js';

const daoCars = new CarsMongoDAO();
const daoOrders = new OrdersMongoDAO();

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

    const orderM = {
      ...order.orderMongo2,
      email: userLogin.email,
      numOrder: ++orders.length || 1,
      dateAndHour,
    };

    daoOrders.save(orderM);

    const email = userLogin.email || 'manuele.ramirez.26@gmail.com';
    sendMail(email, subject, order.message);

    daoCars.delete();
  },
};
