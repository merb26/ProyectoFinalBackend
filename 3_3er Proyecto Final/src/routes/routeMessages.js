import {Router} from 'express';

import {controllerMessages} from '../controllers/controllerMessages.js';

export const routeMessages = Router();

routeMessages.get('/', controllerMessages.getMessages);

routeMessages.get('/:email', controllerMessages.getMessagesByEmail);
