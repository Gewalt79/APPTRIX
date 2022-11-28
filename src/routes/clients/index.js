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
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const user_controller_1 = __importDefault(require("../../controllers/user.controller"));
const checkToken_1 = __importDefault(require("../../middlewares/checkToken"));
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: './uploads',
    filename: function (request, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
router.get('/list', (request, response, next) => {
    checkToken_1.default.check(request, response, next, 'READ');
}, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_controller_1.default.getAll(request, response);
}));
router.post('/create', upload.single('avatar'), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_controller_1.default.addUser(request, response);
}));
router.post('/match', (request, response, next) => {
    checkToken_1.default.check(request, response, next, 'MATCH');
}, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_controller_1.default.matchUser(request, response);
}));
exports.default = router;
