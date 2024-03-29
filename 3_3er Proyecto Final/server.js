import express from 'express';
import {Server} from 'socket.io';
import http from 'http';
import yargs from 'yargs/yargs';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import mongoose from 'mongoose';
import cluster from 'cluster';
import numCPUs from 'os';
import * as dotenv from 'dotenv';

const app = express();
const serverHttp = http.createServer(app);
export const serverIO = new Server(serverHttp);

import {routeLogin} from './src/routes/routeLogin.js';
import {routeRegister} from './src/routes/routeRegister.js';
import {routeProducts} from './src/routes/routeProducts.js';
import {routerCar} from './src/routes/routerCar.js';
import {routeOrder} from './src/routes/routeOrder.js';
import {routeMessages} from './src/routes/routeMessages.js';
import {routeInfo} from './src/routes/routeInfo.js';
import {loggerCons, loggerWarn} from './src/utils/loggers/logger.js';
import {connectServerIO} from './src/controllers/controllerMessages.js';
import {config} from './src/config.js';

dotenv.config();

const cpus = numCPUs.cpus().length;

const args = yargs(process.argv.slice(2)).argv;

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

/* -------------------------------------------------------------------------- */
/*                            Configuration MongoDB                           */
/* -------------------------------------------------------------------------- */

const URL = process.env.URL_MONGODB;

(async () => {
  await mongoose.connect(URL).catch((err) => {
    throw new Error(err);
  });
})();

/* -------------------------------------------------------------------------- */
/*                                      /                                     */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                      Configuration passport y session                      */
/* -------------------------------------------------------------------------- */

app.use(
  session({
    secret: config.SECRET,
    store: MongoStore.create({
      mongoUrl: process.env.URL_MONGODB,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    cookie: {
      maxAge: config.SESSION_EXPIRES,
    },
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

/* -------------------------------------------------------------------------- */
/*                                      /                                     */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                     PUG                                    */
/* -------------------------------------------------------------------------- */

app.set('views', './views');
app.set('view engine', 'pug');

/* -------------------------------------------------------------------------- */
/*                                      /                                     */
/* -------------------------------------------------------------------------- */

const modo = config.MODO;

if (cluster.isPrimary && modo.toLowerCase() == 'cluster') {
  loggerCons.info({level: 'info'}, `Master ${process.pid} is running`);

  for (let index = 0; index < cpus; index++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  /* -------------------------------------------------------------------------- */
  /*                                   Routes                                   */
  /* -------------------------------------------------------------------------- */

  app.use('/', routeLogin);
  app.use('/register', routeRegister);
  app.use('/car', routerCar);
  app.use('/products', routeProducts);
  app.use('/order', routeOrder);
  app.use('/chat', routeMessages);
  app.use('/info', routeInfo);

  /* -------------------------------------------------------------------------- */
  /*                                  WebSocket                                 */
  /* -------------------------------------------------------------------------- */

  connectServerIO(serverIO);

  /* -------------------------------------------------------------------------- */
  /*                                      /                                     */
  /* -------------------------------------------------------------------------- */

  const PORT = config.PORT;
  serverHttp.listen(PORT, () => {
    loggerCons.info(
      {level: 'info'},
      `*****RUNNING SERVER ON PORT ${PORT}*****`
    );
  });

  app.get('*', async (req, res) => {
    loggerWarn.warn({url: `${req.url}`}, 'Ruta inexistente');
    res.json({message: 'No existe la página'});
  });

  loggerCons.info({level: 'info'}, `Worker ${process.pid} started`);
}
