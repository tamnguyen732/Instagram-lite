import { DOMAIN } from '~/constants';
import nodemailer from 'nodemailer';
interface EmailType {
  email: string;
  token: string | number;
  userId?: string;
}
export const sendEmail = async ({ email, token, userId }: EmailType) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'thientam733@gmail.com',
        pass: 'aprsfbcvbqpliaef'
      }
    });

    let info;
    if (typeof token === 'number') {
      info = await transporter.sendMail({
        from: '"Instagram" <instagram@ig.com>', // sender address
        to: `${email}`,
        subject: '💬 VERIFICATION CODE 🚀',
        text: 'Hello, 👋 Here is your verification code',
        html: `<p ><h3>Someone tried to sign up for an Instagram account with ${email}\n. If it was you, enter this confirmation code in the app:</h5>\n<h2>${token}</h2></p>`
      });
    } else {
      info = await transporter.sendMail({
        from: '"Instagram" <instagram@ig.com>', // sender address
        to: `${email}`,
        subject: '💬 RESET PASSWORD 🚀',
        text: 'Hello, 👋  ',
        html: `<p><h3> Hello, ${email}, </h3>\n <a href='${DOMAIN}/change-password?token=${token}&userId=${userId}'><h2>Click here to change your password<h2></a></p>`
      });
    }

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log(error);
  }
};
