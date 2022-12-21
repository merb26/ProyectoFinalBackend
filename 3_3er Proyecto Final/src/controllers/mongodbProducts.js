import {ContainerProducts} from '../containers/productsMongoDB.js';
import {userLogin} from '../controllers/login.js';

const container = new ContainerProducts();

export const controllerProducts = {
  getProducts: async (req, res) => {
    const products = await container.getAll();

    res.render('./products/listProducts', {products, userLogin});
  },

  getProductUpdate: async (req, res) => {
    const {id} = req.params;

    const product = await container.getById(id);

    res.render('./products/updateProduct', {product});
  },

  getProduct: async (req, res) => {
    const {id} = req.params;

    const product = await container.getById(id);

    res.render('./products/product', {product, userLogin});
  },

  saveProduct: async (req, res) => {
    const product = {...req.body, timestamp: Date.now()};

    container.save(product);

    res.redirect('/products');
  },

  updateProduct: async (req, res) => {
    const _id = req.params.id;
    const product = {...req.body, _id};

    container.update(product);

    res.json({message: 'ok'});
  },
  removeProduct: async (req, res) => {
    const _id = req.params.id;

    container.deleteById(_id);

    res.json({message: 'ok'});
  },
};
