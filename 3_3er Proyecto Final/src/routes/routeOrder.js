import {Router} from 'express';
export const routeOrder = Router();

import {controllerCars} from '../controllers/controllerCars.js';
import {controllerLogin} from '../controllers/controllerLogin.js';

routeOrder.get('/:id', controllerLogin.authentic, controllerCars.getOrder);
