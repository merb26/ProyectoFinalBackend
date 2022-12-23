import orders from '../models/orders.js';

export class OrdersMongoDAO {
  async save(obj) {
    const order = new orders(obj);

    return order.save();
  }

  async getAll() {
    const ordersDB = orders.find({});

    return ordersDB;
  }
}
