import {Router} from 'express';

import {loginMongodb} from '../controllers/login.js';
import {controllerCars} from '../controllers/controllerCars.js';

export const routerCar = Router();

// /car

routerCar.get('/1/products', loginMongodb.authentic, controllerCars.getCars);

routerCar.get(
  '/formUpdate/:id',
  loginMongodb.authentic,
  controllerCars.getProductOnCar
);

routerCar.post(
  '/:id/products',
  loginMongodb.authentic,
  controllerCars.saveProductOnCar
);

routerCar.put(
  '/:id',
  loginMongodb.authentic,
  controllerCars.updateProductOnCar
);

routerCar.delete(
  '/1/products/:id_prod',
  loginMongodb.authentic,
  controllerCars.removeProductoOnCar
);

routerCar.delete('/:id', loginMongodb.authentic, controllerCars.removeCar);
