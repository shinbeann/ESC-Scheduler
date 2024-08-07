import Twilio from "twilio/lib/rest/Twilio.js";

export async function sendWhatsapp(number, staff_name, course, date, hour, minute, location) {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = new Twilio(accountSid, authToken);
    const message = await client.messages.create({
      body: `Dear ${ staff_name }, this is a reminder from TSH to complete your course ${ course } at the start date ${date} at ${hour}:${minute}. The location is at ${location}.`,
      from: 'whatsapp:+14155238886',
      to: `whatsapp:+65${ number }`
    });
    console.log('Whatsapp sent:', message.sid);
  } catch (error) {
    console.error('Error sending whatsapp:', error);
  }
};

//sendWhatsapp();