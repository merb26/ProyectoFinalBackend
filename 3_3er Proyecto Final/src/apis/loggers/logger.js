import pino from 'pino';

export const loggerWarn = pino('./src/apis/warn.log');

export const loggerErr = pino('./src/apis/error.log');

export const loggerCons = pino();
