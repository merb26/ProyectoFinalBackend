import bcrypt from "bcrypt"

import { Container } from "../containers/users.js"

const container = new Container()

export const loginMongodb = {
  // startSesion: (req, res) => {
  //   const { name } = req.body

  //   req.session.email = name.toLowerCase()

  //   res.json("{user: ok}")
  // },

  authentic: (req, res, next) => {
    if (req.isAuthenticated()) {
      next()
    } else {
      res.redirect("/")
    }
  },

  // saveRegister: (req, res) => {
  //   const { email, password, name, address, phone, avatar } = req.body

  //   const user = {
  //     email,
  //     password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null),
  //     name,
  //     address,
  //     phone,
  //     avatar,
  //   }
  //   container.save(user)

  //   res.render("login")
  // },

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

    const { name, address, phone, avatar, prefijo } = req.body

    console.log(prefijo)

    let user = users.find(user => user.email === username)

    if (user) {
      return done(null, false, { message: "User already exists" })
    }

    let newUser = {
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null),
      email: username,
      name,
      address,
      phone: "+" + prefijo + " " + phone,
      urlPhoto: avatar,
    }

    console.log(newUser)

    const userMongoDB = await container.save(newUser)

    return done(null, userMongoDB)
  },

  deserialize: async (id, done) => {
    const users = await container.getAll()
    let user = users.find(user => user.id === id)

    done(null, user)
  },
}
