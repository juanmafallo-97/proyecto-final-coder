const { createTransport } = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const transporter = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.TRASNPORTER_EMAIL,
    pass: process.env.TRASNPORTER_EMAIL_PWD
  }
});

const sendNewUserNotification = (userData) => {
  const mailOptions = {
    from: "Servidor Node.js",
    to: "l4b2ejr64bzv7ucr@ethereal.email",
    subject: "Nuevo usuario registrado",
    html: `<h1 style="color: blue;">Nuevo usuario registrado</h1>
        <p>Nombre: ${userData.name}</p>
        <p>Email: ${userData.email}</p>
        `
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("Error: ", err);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
};

module.exports = { sendNewUserNotification };
