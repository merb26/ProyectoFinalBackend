import yargs from 'yargs/yargs';
import numCPUs from 'os';
const cpus = numCPUs.cpus().length;
import {loggerCons} from '../utils/loggers/logger.js';
import {config} from '../config.js';

export const serviceInfo = {
  getInfoProcess: (req) => {
    const info = {
      yargs,
      platform: process.platform,
      node: process.version,
      rss: process.memoryUsage().rss,
      pathProyect: process.cwd(),
      pathEjecutable: process.execPath,
      id: process.pid,
      numCPUs: cpus,
      port: config.PORT,
      mongoUrl: config.URL_MONGODB,
      mailAdmin: config.ADMIN_MAIL,
    };

    loggerCons.info(
      {level: 'info'},
      `${req.hostname}:${config.PORT}${req.url}`
    );

    return info;
  },
};
