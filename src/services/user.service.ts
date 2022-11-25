import User from '../models/user/user.model';
import Helper from '../db_pool/helper';
import UtilHelper from '../helpers/helper';
import PGPool from '../db_pool/pg_pool';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

class UserService {
  public async getAllUsers(filter?, location?): Promise<any> {
    let sql;

    let distance = 0;

    switch (filter) {
      case 'gender':
        sql = `SELECT * FROM public.user ORDER BY gender`;
        break;
      case 'firstname':
        sql = `SELECT * FROM public.user ORDER BY first_name`;
        break;
      case 'lastname':
        sql = `SELECT * FROM public.user ORDER BY last_name`;
        break;
      default:
        sql = `SELECT * FROM public.user`;
        distance += parseInt(filter);
        break;
    }

    const pool = Helper.pool();

    const query_results = await pool.aquery(sql);

    if (distance > 0) {
      let filteredUsers = query_results.rows.filter(
        (user: User) =>
          filter >=
          UtilHelper.geoDistance(
            user.latitude,
            user.longitude,
            location.latitude,
            location.longitude
          )
      );

      return {
        success: true,
        data: filteredUsers,
      };
    }

    return {
      success: true,
      data: query_results.rows,
    };
  }

  public async addUser(user: User, pool?: PGPool): Promise<any> {
    if (pool === undefined) pool = Helper.pool();

    if (!/\S+@\S+\.\S+/.test(user.email)) {
      return { success: false, data: { message: user.email } };
    }

    const hashedPassword = crypto
      .pbkdf2Sync(user.password, 'secret', 10, 8, 'sha512')
      .toString('hex');

    try {
      const sql_user = `INSERT INTO "user" (avatar, first_name, last_name, email, password, gender, latitude, longitude)
				VALUES ('${user.avatar}', '${user.firstName}', '${user.lastName}', '${user.email}', '${hashedPassword}', '${user.gender}', '${user.latitude}', '${user.longitude}') 
                    returning *`;

      const userResult = await pool.aquery(sql_user, []);

      const token = jwt.sign(
        {
          email: user.email,
          permissions: ['MATCH', 'READ'],
          lat: user.latitude,
          lon: user.longitude,
        },
        'secret',
        {
          expiresIn: '24h',
        }
      );

      return {
        success: true,
        data: {
          token: token,
        },
      };
    } catch (error) {
      console.log(error);
      return { success: false, data: { message: error.detail || error } };
    }
  }

  public async matchUsers(senderID: number, receiverID: number, pool?: PGPool): Promise<any> {
    if (pool === undefined) pool = Helper.pool();

    try {
      const sql = `SELECT * FROM do_match(${senderID}, ${receiverID})`;
      const userResult = await pool.aquery(sql, []);

      return {
        success: true,
        data: {
          user_email: userResult.rows[0],
        },
      };
    } catch (error) {
      console.log(error);
      return { success: false, data: { message: error.detail || error } };
    }
  }

  public static verifyToken(token: string) {
    try {
      const verifiedToken = jwt.verify(token, 'secret');
      return { success: true, tokenBody: verifiedToken };
    } catch (err) {
      return { success: false, error: err };
    }
  }
}

export default UserService;
