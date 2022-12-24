import pino from 'pino';

export const loggerWarn = pino('./src/utils/warn.log');

export const loggerErr = pino('./src/utils/error.log');

export const loggerCons = pino();
