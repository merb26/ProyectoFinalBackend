import {serviceMessages} from '../services/serviceMessages.js';

export const controllerMessages = {
  getMessages: async (req, res) => {
    res.render('./chat/messages');
  },

  getMessagesByEmail: async (req, res) => {
    const {email} = req.params;

    const messages = await serviceMessages.getMessagesByEmail(email);

    res.render('./chat/messagesEmail', {messages});
  },
};

export const connectServerIO = (serverIO) => {
  serviceMessages.webSocket(serverIO);
};
