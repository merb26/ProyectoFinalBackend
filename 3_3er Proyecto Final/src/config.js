import * as dotenv from 'dotenv';
dotenv.config();
import {loggerCons} from './utils/loggers/logger.js';
import yargs from 'yargs/yargs';
const args = yargs(process.argv.slice(2)).argv;

const NODE_ENV = process.env.NODE_ENV || 'development';

loggerCons.info({leve: 'info'}, {environment: NODE_ENV});

export const config = {
  URL_MONGODB: process.env.URL_MONGODB,
  PORT: process.env.PORT || 8080,
  SECRET: process.env.SECRET || 'MY-SECRET',
  MODO: args.MODO || 'fork',
  ADMIN_MAIL: process.env.MAIL || 'manuele.ramirez.26@gmail.com',
  SESSION_EXPIRES: 600 * 1000,
};
