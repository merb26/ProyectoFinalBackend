import users from "../models/users.js"

export class Container {
  async save(obj) {
    const user = new users(obj)

    return user.save()
  }

  async getAll() {
    return users.find({})
  }
}
