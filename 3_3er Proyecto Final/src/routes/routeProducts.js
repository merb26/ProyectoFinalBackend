import {Router} from 'express';

import {controllerLogin} from '../controllers/controllerLogin.js';
import {controllerProducts} from '../controllers/controllerProducts.js';

export const routeProducts = Router();

routeProducts.get(
  '/',
  controllerLogin.authentic,
  controllerProducts.getProducts
);

routeProducts.get('/formSave', controllerLogin.authentic, async (req, res) =>
  res.render('./products/addProduct')
);

routeProducts.get(
  '/formUpdate/:id',
  controllerLogin.authentic,
  controllerProducts.getProductUpdate
);

routeProducts.get(
  '/category/:category',
  controllerLogin.authentic,
  controllerProducts.getProductsByCategory
);

routeProducts.post(
  '/',
  controllerLogin.authentic,
  controllerProducts.saveProduct
);

routeProducts.put(
  '/:id',
  controllerLogin.authentic,
  controllerProducts.updateProduct
);

routeProducts.delete(
  '/:id',
  controllerLogin.authentic,
  controllerProducts.removeProduct
);

routeProducts.get(
  '/:id([0-9a-f]{24})',
  controllerLogin.authentic,
  controllerProducts.getProduct
);
