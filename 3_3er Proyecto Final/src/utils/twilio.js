import client from "twilio"
import * as dotenv from "dotenv"
dotenv.config()

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const clientVar = client(accountSid, authToken)

export const sendSMS = async (message, phone) => {
  clientVar.messages
    .create({
      body: message,
      from: "+18654197605",
      to: phone,
    })
    .then(message => console.log(message))
}

export const sendWP = async (message, phone) => {
  clientVar.messages
    .create({
      from: "whatsapp:+14155238886",
      body: message,
      to: `whatsapp:${phone}`,
    })
    .then(message => console.log(message))
    .done()
}
