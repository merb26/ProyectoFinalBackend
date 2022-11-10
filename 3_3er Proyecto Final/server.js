import { loggerCons } from "./loggers/logger.js"

export const runServer = app => {
  const PORT = process.env.PORT || 8080
  app.listen(PORT, err => {
    if (err) throw new Error(err)

    loggerCons.info(
      { level: "info" },
      `*****RUNNING SERVER EXPRESS ON PORT ${PORT}*****`
    )
  })
}
