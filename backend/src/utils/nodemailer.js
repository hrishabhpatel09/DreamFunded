import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "hkprojects9@gmail.com",
        pass: "jdbg ponv grsd gbkt",
        // pass: process.env.NODEMAILER_PASS
    },
});


export async function sendEmail({to, type, code}) {
  const info = await transporter.sendMail({
    from: '"ChatApp" <hkprojects9@gmail.com>',
    to: to,
    subject: type=='verify'?"ChatApp Verification Code":"Reset Password Verification Code",
    text: "Your verification code is: ",
    html:   `<h1>${code}</h1>` ,
  });

  // console.log("Message sent: %s", info.messageId);
}

