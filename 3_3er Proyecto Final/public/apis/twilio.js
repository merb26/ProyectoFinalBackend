// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token in Account Info and set the environment variables.
// See http://twil.io/secure
const accountSid =
  process.env.TWILIO_ACCOUNT_SID || "AC2b9580050252a0ab99e1702daf4bbbf8"
const authToken =
  process.env.TWILIO_AUTH_TOKEN || "578aa282333ed609ebd9c7d22cf3a0f4"
import client from "twilio"
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
