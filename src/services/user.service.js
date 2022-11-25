"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = __importDefault(require("../db_pool/helper"));
const helper_2 = __importDefault(require("../helpers/helper"));
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserService {
    getAllUsers(filter, location) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const pool = helper_1.default.pool();
            const query_results = yield pool.aquery(sql);
            if (distance > 0) {
                let filteredUsers = query_results.rows.filter((user) => filter >=
                    helper_2.default.geoDistance(user.latitude, user.longitude, location.latitude, location.longitude));
                return {
                    success: true,
                    data: filteredUsers,
                };
            }
            return {
                success: true,
                data: query_results.rows,
            };
        });
    }
    addUser(user, pool) {
        return __awaiter(this, void 0, void 0, function* () {
            if (pool === undefined)
                pool = helper_1.default.pool();
            if (!/\S+@\S+\.\S+/.test(user.email)) {
                return { success: false, data: { message: user.email } };
            }
            const hashedPassword = crypto_1.default
                .pbkdf2Sync(user.password, 'secret', 10, 8, 'sha512')
                .toString('hex');
            try {
                const sql_user = `INSERT INTO "user" (avatar, first_name, last_name, email, password, gender, latitude, longitude)
				VALUES ('${user.avatar}', '${user.firstName}', '${user.lastName}', '${user.email}', '${hashedPassword}', '${user.gender}', '${user.latitude}', '${user.longitude}') 
                    returning *`;
                const userResult = yield pool.aquery(sql_user, []);
                const token = jsonwebtoken_1.default.sign({
                    email: user.email,
                    permissions: ['MATCH', 'READ'],
                    lat: user.latitude,
                    lon: user.longitude,
                }, 'secret', {
                    expiresIn: '24h',
                });
                return {
                    success: true,
                    data: {
                        token: token,
                    },
                };
            }
            catch (error) {
                console.log(error);
                return { success: false, data: { message: error.detail || error } };
            }
        });
    }
    matchUsers(senderID, receiverID, pool) {
        return __awaiter(this, void 0, void 0, function* () {
            if (pool === undefined)
                pool = helper_1.default.pool();
            try {
                const sql = `SELECT * FROM do_match(${senderID}, ${receiverID})`;
                const userResult = yield pool.aquery(sql, []);
                return {
                    success: true,
                    data: {
                        user_email: userResult.rows[0],
                    },
                };
            }
            catch (error) {
                console.log(error);
                return { success: false, data: { message: error.detail || error } };
            }
        });
    }
    static verifyToken(token) {
        try {
            const verifiedToken = jsonwebtoken_1.default.verify(token, 'secret');
            return { success: true, tokenBody: verifiedToken };
        }
        catch (err) {
            return { success: false, error: err };
        }
    }
}
exports.default = UserService;
