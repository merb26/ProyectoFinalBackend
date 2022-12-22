import {Router} from 'express';

import {loginMongodb} from '../controllers/login.js';
import {controllerProducts} from '../controllers/mongodbProducts.js';

export const routeProducts = Router();

routeProducts.get('/', loginMongodb.authentic, controllerProducts.getProducts);

routeProducts.get('/formSave', loginMongodb.authentic, async (req, res) =>
  res.render('./products/addProduct')
);

routeProducts.get(
  '/formUpdate/:id',
  loginMongodb.authentic,
  controllerProducts.getProductUpdate
);

routeProducts.get(
  '/category/:category',
  loginMongodb.authentic,
  controllerProducts.getProductsByCategory
);

routeProducts.post('/', loginMongodb.authentic, controllerProducts.saveProduct);

routeProducts.put(
  '/:id',
  loginMongodb.authentic,
  controllerProducts.updateProduct
);

routeProducts.delete(
  '/:id',
  loginMongodb.authentic,
  controllerProducts.removeProduct
);

routeProducts.get(
  '/:id([0-9a-f]{24})',
  loginMongodb.authentic,
  controllerProducts.getProduct
);
