import mysql,{ Pool } from 'mysql2/promise';
import { injectable } from 'inversify';
import logger from '@util/logger';
import config from '@config/index';

@injectable()
export class Database {
  private pool: Pool;

  constructor() {
    const poolConfig = {
      host: '144.91.124.50',
      user: 'root',
      database: 'shop',
      password:'Btp^i1P5qXhuC^8jylk@2PF@0tzMjh2ju1dFCfb&OFrWwtM1U2kSr9',
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
      idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0
    }
    
    this.pool =  mysql.createPool(poolConfig);
  }

  async query(query: string, params: any[] = []): Promise<any> {
    try {
      const connection = await this.pool.getConnection();
      const result = await connection.query(query,params)

      console.log(result);
      return result ;
    } catch (error: any) {
      const errorMessage = '*****************************\n'
        + ` Error : ${error} \n`
        + '*****************************\n'
        + ` SQL : ${query} \n`
        + '*****************************\n'
        + ` Values : ${params} \n`
        + '*****************************\n';
      logger.error(errorMessage);
      throw error;
    }/*  finally {
      // Close the connection when done
      await this.pool.end();
    } */
  }
}
