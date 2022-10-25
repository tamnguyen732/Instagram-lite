import nodemailer from 'nodemailer';
import { DOMAIN } from '~/constants';
interface EmailType {
  email: string;
  token: string;
  userId: string;
}

export const sendEmail = async ({ email, token, userId }: EmailType) => {
  try {
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });

    let info = await transporter.sendMail({
      from: '"Instagram 👻" <instagram@ig.com>', // sender address
      to: `${email}`,
      subject: '💬 Change password 🚀',
      text: 'Hello, 👋',
      html: `<a href='${DOMAIN}/change-password?token=${token}&userId=${userId}'>Click here to change your password</a>`
    });

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log(error);
  }
};
