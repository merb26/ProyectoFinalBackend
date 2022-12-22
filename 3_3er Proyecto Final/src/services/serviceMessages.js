import {loggerErr, loggerCons} from '../../loggers/logger.js';

export const serviceMessages = {
  visualizeMessages: (req) => {
    loggerCons.info({level: 'info', url: `${req.originalUrl}`}, 'Ruta request');
  },
  webSocket: (serverIO) => {
    serverIO.on('connection', (socket) => {
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
