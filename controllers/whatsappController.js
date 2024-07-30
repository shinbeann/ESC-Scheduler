import Twilio from "twilio/lib/rest/Twilio.js";

export default async function sendWhatsapp(req, res) {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = new Twilio(accountSid, authToken);
    const message = await client.messages.create({
      body: "hellooooo",
      from: 'whatsapp:+14155238886',
      to: 'whatsapp:+6589116194'
    });
    console.log('Message sent:', message.sid);
    res.json("message sent!!!");
  } catch (error) {
    res.json("message did not send");
    console.error('Error sending message:', error);
  }
};

//sendWhatsapp();