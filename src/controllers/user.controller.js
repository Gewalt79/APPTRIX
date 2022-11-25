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
const user_model_1 = __importDefault(require("../models/user/user.model"));
const files_service_1 = __importDefault(require("../files/files.service"));
class UserController {
    static getAll(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const userService = new user_service_1.default();
            return response.send(yield userService.getAllUsers(request.query.filter, request.location));
        });
    }
    static addUser(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const filename = yield files_service_1.default.apllyWatermark(request.file);
            const user = new user_model_1.default(Object.assign(Object.assign({}, request.body), { avatar: request.file.filename }));
            const userService = new user_service_1.default();
            return response.send(yield userService.addUser(user));
        });
    }
    static matchUser(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const receiver = new user_model_1.default();
            receiver.id = parseInt(request.body.receiver.id);
            const userService = new user_service_1.default();
            return response.send(yield userService.matchUsers(request.params.id, receiver.id));
        });
    }
}
exports.default = UserController;
