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
const jimp_1 = __importDefault(require("jimp"));
class FilesService {
    static apllyWatermark(file) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [image, logo] = yield Promise.all([
                    jimp_1.default.read(file.path),
                    jimp_1.default.read('uploads/logo.png'),
                ]);
                logo.resize(image.bitmap.width / 10, jimp_1.default.AUTO);
                const xMargin = (image.bitmap.width * 5) / 100;
                const yMargin = (image.bitmap.width * 5) / 100;
                const X = image.bitmap.width - logo.bitmap.width - xMargin;
                const Y = image.bitmap.height - logo.bitmap.height - yMargin;
                let img = yield image.composite(logo, X, Y, {
                    mode: jimp_1.default.BLEND_SCREEN,
                    opacitySource: 1,
                    opacityDest: 0.5,
                });
                img.write(file.path);
                return true;
            }
            catch (e) {
                return 'Error while handling image';
            }
        });
    }
}
exports.default = FilesService;
