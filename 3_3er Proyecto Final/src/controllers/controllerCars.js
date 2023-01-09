import yargs from 'yargs/yargs';
const args = yargs(process.argv.slice(2)).argv;

import {CarsMongoDAO} from '../dao/carsMongoDAO.js';
import {ProductsMongoDAO} from '../dao/productsMongoDAO.js';
import {userLogin} from './controllerLogin.js';
import {serviceCars} from '../services/serviceCars.js';

const daoCars = new CarsMongoDAO();
const daoProducts = new ProductsMongoDAO();

export const controllerCars = {
  getOrder: async (req, res) => {
    serviceCars.getOrder();

    res.render('./order/order', {userLogin});
  },

  getCars: async (req, res) => {
    const result = await serviceCars.getCars();

    res.render('./car/productsSelects', result);
  },

  getProductOnCar: async (req, res) => {
    const {id} = req.params;

    const product = await serviceCars.getProductOnCar(id);

    res.render('./car/updateCar', {product});
  },

  saveProductOnCar: async (req, res) => {
    const {id: idProduct} = req.params;
    const {amount} = req.body;

    serviceCars.saveProductOnCar(idProduct, amount);
  },

  updateProductOnCar: async (req, res) => {
    const {id} = req.params;
    const {productUpdate} = req.body;

    serviceCars.updateProductOnCar(id, productUpdate);

    res.json({message: 'producto actualizado del carrito'});
  },

  removeProductOnCar: async (req, res) => {
    const idProduct = req.params.id_prod;

    serviceCars.removeProductOnCar(idProduct);
  },

  removeCar: async (req, res) => serviceCars.removeCar(),
};
