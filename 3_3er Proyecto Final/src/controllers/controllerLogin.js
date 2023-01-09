import bcrypt from 'bcrypt';
import yargs from 'yargs/yargs';
const args = yargs(process.argv.slice(2)).argv;

import {sendMail} from '../utils/sendMail.js';
import {usersMongoDAO} from '../dao/usersMongoDAO.js';
import {config} from '../config.js';

const dao = new usersMongoDAO();

export let userLogin = {};

export const controllerLogin = {
  authentic: (req, res, next) => {
    req.isAuthenticated() ? next() : res.redirect('/');
  },

  passportLogin: async (username, password, done) => {
    const usersDB = await dao.getAll();

    const user = usersDB.find((userDB) => userDB.email === username);
    if (!user) return done(null, false, {message: 'User not exist'});

    const passIsValide = bcrypt.compareSync(password, user.password);
    if (!passIsValide)
      return done(null, false, {message: 'Password incorrect'});

    userLogin = user;

    done(null, user);
  },

  passportSignup: async (req, username, password, done) => {
    const usersDB = await dao.getAll();

    const {name, address, phone, prefijo} = req.body;

    let user = usersDB.find((userDB) => userDB.email === username);
    if (user) return done(null, false, {message: 'User already exists'});

    let newUser = {
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null),
      email: username,
      name,
      address,
      phone: `+${prefijo}${phone}`,
    };

    userLogin = newUser;

    const userMongoDB = await dao.save(newUser);

    const userMail = `
      <br><br>Nombre: ${name}<br>
      <br>Email: ${username}<br>
      <br>Dirección: ${address}<br>
      <br>Teléfono: ${phone}
    `;

    const subject = `Nuevo usuario ${name}`;
    const email = config.ADMIN_MAIL;
    sendMail(email, subject, userMail);

    return done(null, userMongoDB);
  },

  deserialize: async (id, done) => {
    const usersDB = await dao.getAll();
    let user = usersDB.find((userDB) => userDB.id === id);

    done(null, user);
  },
};
