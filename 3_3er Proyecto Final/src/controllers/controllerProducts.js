import {ProductsMongoDAO} from '../dao/productsMongoDAO.js';
import {userLogin} from './login.js';

const dao = new ProductsMongoDAO();

export const controllerProducts = {
  getProducts: async (req, res) => {
    const products = await dao.getAll();

    res.render('./products/listProducts', {products, userLogin});
  },

  getProductUpdate: async (req, res) => {
    const {id} = req.params;

    const product = await dao.getById(id);

    res.render('./products/updateProduct', {product});
  },

  getProduct: async (req, res) => {
    const {id} = req.params;

    const product = await dao.getById(id);

    product
      ? res.render('./products/product', {product, userLogin})
      : res.json({message: 'No se pudo encontrar el producto'});
  },

  getProductsByCategory: async (req, res) => {
    const {category} = req.params;

    const products = await dao.getByCategory(category);

    res.render('./products/category', {products, userLogin});
  },

  saveProduct: async (req, res) => {
    const product = {...req.body, timestamp: Date.now()};

    dao.save(product);

    res.redirect('/products');
  },

  updateProduct: async (req, res) => {
    const _id = req.params.id;
    const product = {...req.body, _id};

    dao.update(product);

    res.json({message: 'ok'});
  },
  removeProduct: async (req, res) => {
    const _id = req.params.id;

    dao.deleteById(_id);

    res.json({message: 'ok'});
  },
};
