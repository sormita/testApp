const { createLogger, transports ,format} = require('winston');
const logger = createLogger({
  levels: {
    
      error: 0,
      warn: 1,
      sql: 2,
      info: 3,
      console: 4
    },
  format: format.combine(
    format.json(),
    format.timestamp()
),
  transports: [
    // - Write all logs error (and below) to `somefile.log`.
    new transports.File({ filename: 'application.log', level: 'info' })
  ]
});
 module.exports = logger;