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
const user_service_1 = __importDefault(require("../services/user.service"));
class CheckAuth {
    check(request, response, next, permission) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const token = (_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
            const verifiedToken = user_service_1.default.verifyToken(token);
            if (!verifiedToken.success) {
                return response.send({
                    success: false,
                    data: { message: 'Invalid Token' },
                });
            }
            const email = verifiedToken.tokenBody.email;
            const permissions = (_b = verifiedToken.tokenBody) === null || _b === void 0 ? void 0 : _b.permissions;
            if (permissions && permissions.includes(permission)) {
                request.location = {
                    latitude: verifiedToken.tokenBody.lat,
                    longitude: verifiedToken.tokenBody.lon,
                };
                return next();
            }
            else {
                return response.send({
                    success: false,
                    data: { message: 'Out of user scope' },
                });
            }
        });
    }
}
exports.default = new CheckAuth();
