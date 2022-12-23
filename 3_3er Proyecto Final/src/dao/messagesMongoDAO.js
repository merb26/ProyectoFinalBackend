import messages from '../models/messages.js';

export class messagesMongoDAO {
  async save(obj) {
    console.log(obj);
    const user = new messages(obj);

    return user.save();
  }

  async getAll() {
    return messages.find({});
  }

  async getByEmail(email) {
    return messages.find({email});
  }
}
