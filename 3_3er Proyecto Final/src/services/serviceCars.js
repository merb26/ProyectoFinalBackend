import yargs from 'yargs/yargs';
import {CarsMongoDAO} from '../dao/carsMongoDAO.js';
const args = yargs(process.argv.slice(2)).argv;

import {newOrder} from '../apis/newOrder.js';
import {userLogin} from '../controllers/login.js';

const daoCars = new CarsMongoDAO();

export const serviceCars = {
  getOrder: () => {
    const subject = `Nuevo pedido de ${userLogin.name} (${userLogin.email})`;

    const order = newOrder(products, subject);

    console.log(order);

    // const email = args.EMAIL || 'manuele.ramirez.26@gmail.com';
    // sendMail(email, subject, order.message)

    // const phoneAdmin = args.PHONE;
    // sendWP(order.messageWhatsapp, phoneAdmin)

    const messageSMS = 'Tu pedido se ha realizado con éxito, está en proceso.';

    // daoCars.delete();
  },
};
