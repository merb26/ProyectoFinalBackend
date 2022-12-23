import {loggerErr, loggerCons} from '../apis/loggers/logger.js';
import {MessagesRepo} from '../repository/messages/messagesRepo.js';

export const serviceMessages = {
  webSocket: (serverIO) => {
    serverIO.on('connection', (socket) => {
      loggerCons.info({level: 'info'}, 'Connection webSocket');

      socket.on('messageSent', (message) => {
        new MessagesRepo()
          .save(message)
          .then(() => console.log('Message saved'));
        new MessagesRepo().getAll().then((messages) => {
          serverIO.sockets.emit('messages', messages);
        });
      });

      new MessagesRepo().getAll().then((messages) => {
        socket.emit('messages', messages);
      });
    });
  },
};
