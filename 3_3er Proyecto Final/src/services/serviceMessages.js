import {loggerErr, loggerCons} from '../apis/loggers/logger.js';
import {MessagesRepo} from '../repository/messages/messagesRepo.js';

export const serviceMessages = {
  webSocket: (serverIO, email) => {
    serverIO.on('connection', (socket) => {
      loggerCons.info({level: 'info'}, 'Connection webSocket');
      socket.on('messageSent', (message) => {
        new MessagesRepo()
          .save(message)
          .then(() => console.log('Message saved'));
        setTimeout(() => {
          new MessagesRepo().getAll().then((messages) => {
            serverIO.sockets.emit('messages', messages);
          });
        }, 1000);
      });

      new MessagesRepo().getAll().then((messages) => {
        socket.emit('messages', messages);
      });
    });
  },

  getMessagesByEmail: async (email) => {
    return await new MessagesRepo().getByEmail(email);
  },
};
