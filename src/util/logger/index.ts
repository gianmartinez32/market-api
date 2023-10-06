import log4js, { LoggingEvent } from 'log4js';

log4js.configure({
  appenders: {
    out: {
      type   : 'stdout',
      layout : {
        type    : 'pattern',
        pattern : '%[[%d{yyyy-MM-dd hh:mm:ss}] [%p]%] %m',
        tokens  : {
          coloredLevel: (logEvent: LoggingEvent) => {
            const level = logEvent.level.levelStr;
            let color = '\x1b[0m';

            switch (level) {
              case 'TRACE':
                color = '\x1b[36m';
                break;
              case 'DEBUG':
                color = '\x1b[32m';
                break;
              case 'INFO':
                color = '\x1b[34m';
                break;
              case 'WARN':
                color = '\x1b[33m';
                break;
              case 'ERROR':
                color = '\x1b[31m';
                break;
              case 'FATAL':
                color = '\x1b[35m';
                break;
              default:
                break;
            }
            return `${color + level}\x1b[0m`;
          },
        },
      },
    },
  },
  categories: {
    default: { appenders: [ 'out' ], level: 'debug' },
  },
});

const logger = log4js.getLogger();
// Ejemplos de logs
// logger.trace('Mensaje de traza');
// logger.debug('Mensaje de depuración');
// logger.info('Mensaje informativo');
// logger.warn('Mensaje de advertencia');
// logger.error('Mensaje de error');
// logger.fatal('Mensaje fatal');

export default logger;
