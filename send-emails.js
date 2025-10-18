require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const mailOptions = {
  from: process.env.MAIL_USER,
  to: 'recipient@example.com', // change to your recipient
  subject: 'Important: Verify your Instagram account',
  html: `
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial, sans-serif;">
        <p>Dear User,</p>
        <p>Please click the link below to verify your Instagram account:</p>
        <p><a href="https://computer-security-1qry.onrender.com/click" style="color: #3897f0; text-decoration: none;">Verify Your Account</a></p>
        <p>If you did not request this, please ignore this message.</p>
        <p>Regards,<br/>Instagram Team</p>
      </body>
    </html>
  `,
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});
