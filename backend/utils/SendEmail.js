const nodemailer = require("nodemailer");

module.exports = {
  emailVerification : async (email, subject, text, html) => {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        service: process.env.SERVICE,
        port: Number(process.env.EMAIL_PORT),
        secure: Boolean(process.env.SECURE),
        ignoreTLS: true,
        auth: {
          user: process.env.USER,
          pass: process.env.PASS,
        },
      });
  
      await transporter.sendMail({
        from: process.env.USER,
        to: email,
        subject: subject,
        text: text,
        html: html,
      });
      console.log("email sent successfully");
    } catch (error) {
      console.log("email not sent!");
      console.log(error);
      return error;
    }
  },

  festiveEmail : async(email, subject)=>{
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        service: process.env.SERVICE,
        port: Number(process.env.EMAIL_PORT),
        secure: Boolean(process.env.SECURE),
        auth: {
          user: process.env.USER,
          pass: process.env.PASS,
        },
      });
  
      await transporter.sendMail({
        from: process.env.USER,
        to: email,
        subject: subject,
        // text: text,
        html: 
          `<h1>Eid Mubarak</h1>`,
      });
      console.log("email sent successfully");
    } catch (error) {
      console.log("email not sent!");
      console.log(error);
      return error;
    }
  }

}




