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
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: 'outmail.abc.co.th',
    secure: false,
    port: 25,
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    },
    tls: {
        rejectUnauthorized: false,
    },
});
class EmailService {
    sendEmail(user1, user2) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailOptions1 = {
                from: process.env.EMAIL,
                to: user2.email,
                subject: 'У вас взаимная симпатия!',
                text: `Вы понравились ${user1.firstName}! Почта участника: ${user1.email}`,
            };
            const mailOptions2 = {
                from: process.env.EMAIL,
                to: user1.email,
                subject: 'У вас взаимная симпатия!',
                text: `Вы понравились ${user2.firstName}! Почта участника: ${user2.email}`,
            };
            transporter.sendMail(mailOptions1);
            transporter.sendMail(mailOptions2);
        });
    }
}
exports.default = new EmailService();
