const twilio = require("twilio");
require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const sendWappOrderNotice = async (order) => {
  try {
    const message = await client.messages.create({
      from: "whatsapp:+14155238886",
      to: `whatsapp:${process.env.TWILIO_ADMIN_PHONE}`,
      body: `Nuevo pedido de ${order.user.name} (${order.user.email})`
    });
    console.log(message);
  } catch (error) {
    console.log(error);
  }
};

const sendSmsOrderNotice = (order) => {
  try {
    const message = client.messages.create({
      from: "+17622275674",
      to: `+${order.user.phone}`,
      body: `Hola ${order.user.name}, tu pedido se registró con éxito y se encuentra en proceso!`
    });
    console.log(message);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendWappOrderNotice, sendSmsOrderNotice };
