import * as dotenv from 'dotenv';
dotenv.config();
import yargs from 'yargs/yargs';
const args = yargs(process.argv.slice(2)).argv;

export const config = {
  URL_MONGODB: process.env.URL_MONGODB,
  PORT: process.env.PORT || 8080,
  SECRET: process.env.SECRET || 'MY-SECRET',
  MODO: args.MODO || 'cluster',
  NODE_ENV: process.env.NODE_ENV || 'develop',
  ADMIN_MAIL: args.MAIL || 'manuele.ramirez.26@gmail.com',
  SESSION_EXPIRES: 600 * 1000,
};
