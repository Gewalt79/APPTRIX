'use strict';
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
const pg_1 = __importDefault(require("pg"));
const types = pg_1.default.types;
const timestamp_OID = 1114;
const parseDates = (val) => new Date(Date.parse(val + '+0000'));
types.setTypeParser(timestamp_OID, parseDates);
class PGPool {
    constructor(dbConfig) {
        this.pool = new pg_1.default.Pool(dbConfig);
        this.pool.on('error', function (err, _client) {
            console.log(`Idle-Client Error:\n${err.message}\n${err.stack}`);
        });
    }
    aquery(sqlText, params = []) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            try {
                const result = yield client.query(sqlText, params);
                return result;
            }
            catch (e) {
                console.log(e);
                throw e;
            }
            finally {
                client.release();
            }
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            return client;
        });
    }
}
exports.default = PGPool;
