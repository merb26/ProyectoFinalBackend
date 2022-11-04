import bcrypt from "bcrypt"
import { v4 } from "uuid"

import { Container } from "../containers/users.js"

const container = new Container()

export const loginMongodb = {
  authentic: (req, res, next) => {
    if (req.isAuthenticated()) {
      next()
    } else {
      res.redirect("/")
    }
  },

  passportLogin: async (username, password, done) => {
    const users = await container.getAll()

    const user = users.find(user => user.email === username)

    if (!user) {
      console.log(`No existe el email ${username}`)
      return done(null, false, { message: "User not found" })
    }

    const isValide = bcrypt.compareSync(password, user.password)
    if (!isValide) {
      console.log("Password incorrecto")

      return done(null, false, { message: "Password incorrect" })
    }

    done(null, user)
  },

  passportSignup: async (req, username, password, done) => {
    const users = await container.getAll()

    const { name, address, phone, prefijo } = req.body

    let user = users.find(user => user.email === username)

    if (user) return done(null, false, { message: "User already exists" })

    const uuid = v4()
    let image
    if (!req.files) {
      console.log("No tiene archivos")
    } else {
      // Sube la imagen al servidor
      image = req.files.file
      image.mv(`./src/img/${uuid}-${image.name}`, err => {
        if (err) return done(null, false, { message: "Error upload file" })
      })
    }

    let newUser = {
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null),
      email: username,
      name,
      address,
      phone: `+${prefijo} ${phone}`,
      urlPhoto: `./src/img/${uuid}-${image.name}`,
    }

    const userMongoDB = await container.save(newUser)

    return done(null, userMongoDB)
  },

  deserialize: async (id, done) => {
    const users = await container.getAll()
    let user = users.find(user => user.id === id)

    done(null, user)
  },
}
