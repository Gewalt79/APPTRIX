"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = __importDefault(require("../../helpers/helper"));
class User {
    constructor(model) {
        this.id = undefined;
        this.avatar = undefined;
        this.firstName = undefined;
        this.lastName = undefined;
        this.email = undefined;
        this.gender = undefined;
        this.password = undefined;
        this.latitude = undefined;
        this.longitude = undefined;
        if (model) {
            helper_1.default.shallowCopy(model, this);
        }
    }
}
exports.default = User;
