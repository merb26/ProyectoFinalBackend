import bcrypt from 'bcrypt';
import yargs from 'yargs/yargs';
const args = yargs(process.argv.slice(2)).argv;

import {Container} from '../containers/users.js';
import {sendMail} from '../apis/sendMail.js';

const container = new Container();

export let userLogin = {};

export const loginMongodb = {
  authentic: (req, res, next) => {
    req.isAuthenticated() ? next() : res.redirect('/');
  },

  passportLogin: async (username, password, done) => {
    const usersDB = await container.getAll();

    const user = usersDB.find((userDB) => userDB.email === username);
    if (!user) return done(null, false, {message: 'User not exist'});

    const passIsValide = bcrypt.compareSync(password, user.password);
    if (!passIsValide)
      return done(null, false, {message: 'Password incorrect'});

    userLogin = user;

    done(null, user);
  },

  passportSignup: async (req, username, password, done) => {
    const usersDB = await container.getAll();

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

    const userMongoDB = await container.save(newUser);

    const toEmail = args.EMAIL || 'manuele.ramirez.26@gmail.com';

    const message = `
    Nombre: ${newUser.name}
    <br>
    Email: ${newUser.email}
    <br>
    Dirección: ${newUser.address}
    <br>
    Teléfono: ${newUser.phone}
    `;
    sendMail(toEmail, `Nuevo registro`, message);

    return done(null, userMongoDB);
  },

  deserialize: async (id, done) => {
    const usersDB = await container.getAll();
    let user = usersDB.find((userDB) => userDB.id === id);

    done(null, user);
  },
};
