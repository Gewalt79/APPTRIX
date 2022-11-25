import PGPool from './pg_pool';
import User from '../models/user/user.model';
import UserService from '../services/user.service';

const pgConfig = {
  user: 'postgres',
  host: 'localhost',
  database: 'APPTRIX',
  password: 'root',
  port: 5432,
};

export class Helper {
  public static pool() {
    return new PGPool(pgConfig);
  }
}

export default Helper;
