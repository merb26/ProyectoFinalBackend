import {asDTO} from '../../dto/messageDTO.js';

import {messagesMongoDAO} from '../../dao/messagesMongoDAO.js';

export class MessagesRepo {
  #dao;

  constructor() {
    this.#dao = new messagesMongoDAO();
  }

  async getAll() {
    const messagesDB = await this.#dao.getAll();

    const messagesDTO = asDTO(messagesDB);

    return messagesDTO;
  }

  async save(message) {
    const messagesDB = await this.#dao.save(message);

    const messagesDTO = asDTO(messagesDB);

    return messagesDTO;
  }
}
