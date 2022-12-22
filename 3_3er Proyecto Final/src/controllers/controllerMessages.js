import {serviceMessages} from '../services/serviceMessages.js';

export const controllerMessages = {
  getMessages: async (req, res) => {
    serviceMessages.visualizeMessages(req);

    res.render('./chat/messages');
  },
};
