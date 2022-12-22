const { asDTO } = require("../../dto/messageDTO")

const { MessagesFactory } = require("../../factory-method/messagesFactory")

const dao = new MessagesFactory()

class MessagesRepo {
  #dao

  constructor() {
    this.#dao = dao.getMessagesDAO()
  }

  async getAll() {
    const messagesDB = await this.#dao.getAll()
    const messagesDTO = asDTO(messagesDB)
    return messagesDTO
  }

  async save(message) {
    const messagesDB = await this.#dao.save(message)

    const messagesDTO = asDTO(messagesDB)

    return messagesDTO
  }
}

module.exports = { MessagesRepo }
