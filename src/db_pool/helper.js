"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helper = void 0;
const pg_pool_1 = __importDefault(require("./pg_pool"));
const pgConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'APPTRIX',
    password: 'root',
    port: 5432,
};
class Helper {
    static pool() {
        return new pg_pool_1.default(pgConfig);
    }
}
exports.Helper = Helper;
exports.default = Helper;
