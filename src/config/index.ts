import * as dotenv from 'dotenv';

dotenv.config();

export default {
  postgres: {
    connection : process.env.CONNECTION_POSTGRESQL || '',
    pgSsl      : process.env.PG_SSL = 'true',
  },
  crypto: {
    secretKey : process.env.SECRET_KEY || '',
    algorithm : process.env.ALGORITHM || '',
  },
  server: {
    port          : process.env.PORT_SERVER || '5151',
    os            : process.env.LINUX_DEV || '',
    cert_https    : process.env.CERT_HTTPS || '',
    key_https     : process.env.KEY_HTTPS || '',
    nodoPrincipal : process.env.PRINCIPAL || false,
    time_cron     : process.env.TIME_CRON || 0,
  },
  externalServices: {
    host: process.env.SERVER_URL || '',
  },
};
