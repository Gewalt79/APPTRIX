'use strict';

import pg from 'pg';
import User from '../models/user/user.model';

const types = pg.types;
const timestamp_OID = 1114;

const parseDates = (val: string) => new Date(Date.parse(val + '+0000'));

types.setTypeParser(timestamp_OID, parseDates);

interface Callback {
  (err: null | Error, res?: pg.QueryResult): void | Error | pg.QueryResult;
}

export default class PGPool {
  pool: pg.Pool;

  constructor(dbConfig: pg.PoolConfig) {
    this.pool = new pg.Pool(dbConfig);

    this.pool.on('error', function (err: Error, _client: any) {
      console.log(`Idle-Client Error:\n${err.message}\n${err.stack}`);
    });
  }

  async aquery(sqlText: string, params: any[] = []): Promise<pg.QueryResult<any>> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(sqlText, params);
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    } finally {
      client.release();
    }
  }

  async connect(): Promise<pg.PoolClient> {
    const client = await this.pool.connect();
    return client;
  }
}
