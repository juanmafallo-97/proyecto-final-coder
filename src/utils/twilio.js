const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const sendOrderNotice = async (order) => {
  try {
    const message = await client.messages.create({
      from: "whatsapp:+14155238886",
      to: order.user.phone,
      body: `Hola ${order.user.name}, tu pedido está listo!`
    });
    console.log(message);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendOrderNotice };
