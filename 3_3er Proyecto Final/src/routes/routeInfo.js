import Router from 'express';

import {controllerInfo} from '../controllers/controllerInfo.js';

export const routeInfo = Router();

routeInfo.get('/', controllerInfo.getInfo);
