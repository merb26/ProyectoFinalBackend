import pino from "pino"

export const loggerWarn = pino("./loggers/warn.log")

export const loggerErr = pino("./loggers/error.log")

export const loggerCons = pino()
