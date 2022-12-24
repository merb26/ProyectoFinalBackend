import {Router} from 'express';

import {controllerLogin} from '../controllers/controllerLogin.js';
import {controllerCars} from '../controllers/controllerCars.js';

export const routerCar = Router();

// /car

routerCar.get('/1/products', controllerLogin.authentic, controllerCars.getCars);

routerCar.get(
  '/formUpdate/:id',
  controllerLogin.authentic,
  controllerCars.getProductOnCar
);

routerCar.post(
  '/:id/products',
  controllerLogin.authentic,
  controllerCars.saveProductOnCar
);

routerCar.put(
  '/:id',
  controllerLogin.authentic,
  controllerCars.updateProductOnCar
);

routerCar.delete(
  '/1/products/:id_prod',
  controllerLogin.authentic,
  controllerCars.removeProductOnCar
);

routerCar.delete('/:id', controllerLogin.authentic, controllerCars.removeCar);
