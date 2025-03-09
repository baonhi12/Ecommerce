const nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');
require('dotenv').config();


const sendEmail = asyncHandler(async (data, req, res) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: "yna050897@gmail.com",
          pass: "ujkgcznyowlzyttv",
        },
             
    });
    let info = await transporter.sendMail({
        from: '"Hello 👻" <yna050897@gmail.com>', // sender address
        to: data.to, // list of receivers
        subject: data.subject, // Subject line
        text: data.text, // plain text body
        html: data.html, // html body
    });
    
    console.log("Message sent: %s", info.messageId);

    if (nodemailer.getTestMessageUrl(info)) {
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
    res.status(200).json({ message: 'Email sent successfully' });
    
});


module.exports = { 
    sendEmail
};