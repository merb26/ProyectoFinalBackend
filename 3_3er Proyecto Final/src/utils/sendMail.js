import { createTransport } from "nodemailer"

const transporter = createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: "manuele.ramirez.26@gmail.com",
    pass: "pgkfnmzenyasrnmi",
  },
})

export const sendMail = async (email, subject, message) => {
  const mailOptions = {
    from: "Servidor Node.js",
    to: email,
    subject: subject,
    html: message,
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log(info)
  } catch (error) {
    console.log(err)
  }
}
