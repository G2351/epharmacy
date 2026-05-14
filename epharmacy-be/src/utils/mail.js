"use strict";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendMail = async (to, subject, message, data) => {
  const info = await transporter.sendMail({
    from: '"Dai The" <daithehh04@gmail.com>', // sender address
    to,
    subject, // Subject line
    html: `<div>${message}</div>
    <div>Ngày: ${data.date}</div>
    <div>Thời gian: ${data.start_time} ${data?.end_time ? `- ${data?.end_time}` :'' }</div>
      <i>Cảm ơn bạn đã đặt lịch, hãy chú ý thời gian lịch hẹn của mình nhé!</i>
    `, // html body
  });
  return info;
};
module.exports = sendMail;
