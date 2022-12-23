import users from '../models/users.js';

export class usersMongoDAO {
  async save(obj) {
    const user = new users(obj);

    return user.save();
  }

  async getAll() {
    return users.find({});
  }
}
