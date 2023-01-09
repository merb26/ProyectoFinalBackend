import {ProductsMongoDAO} from '../dao/productsMongoDAO.js';
import {userLogin} from './controllerLogin.js';
import {serviceProducts} from '../services/serviceProducts.js';

const dao = new ProductsMongoDAO();

export const controllerProducts = {
  getProducts: async (req, res) => {
    const products = await serviceProducts.getProducts();

    res.render('./products/listProducts', {products, userLogin});
  },

  getProductUpdate: async (req, res) => {
    const {id} = req.params;

    const product = await serviceProducts.getProductUpdate(id);

    res.render('./products/updateProduct', {product});
  },

  getProduct: async (req, res) => {
    const {id} = req.params;

    const product = await serviceProducts.getProduct(id);

    product
      ? res.render('./products/product', {product, userLogin})
      : res.json({message: 'No se pudo encontrar el producto'});
  },

  getProductsByCategory: async (req, res) => {
    const {category} = req.params;

    const products = await serviceProducts.getProductsByCategory(category);

    res.render('./products/category', {products, userLogin});
  },

  saveProduct: async (req, res) => {
    const product = {...req.body, timestamp: Date.now()};

    serviceProducts.saveProduct(product);

    res.redirect('/products');
  },

  updateProduct: async (req, res) => {
    const _id = req.params.id;
    const product = {...req.body, _id};

    serviceProducts.updateProduct(product);

    res.json({message: 'El producto fue actualizado'});
  },

  removeProduct: async (req, res) => {
    const _id = req.params.id;

    serviceProducts.removeProduct(_id);

    res.json({message: 'ok'});
  },
};
