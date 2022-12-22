import {Router} from 'express';

import {controllerMessages} from '../controllers/controllerMessages.js';

export const routeMessages = Router();

routeMessages.get('/', controllerMessages.getMessages);

export const connectServerIO = (serverIO) => {
  serviceMessages.webSocket(serverIO);
};
