import nodemailer from 'nodemailer';
import User from '../models/user/user.model';

const transporter = nodemailer.createTransport({
  host: 'outmail.abc.co.th', // hostname
  secure: false, // use SSL
  port: 25, // port for secure SMTP
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
  public async sendEmail(user1: User, user2: User): Promise<void> {
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
  }
}

export default new EmailService();
