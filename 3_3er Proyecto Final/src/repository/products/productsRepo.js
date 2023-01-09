import {asDTO} from '../../dto/productDTO.js';

import {ProductsMongoDAO} from '../../dao/productsMongoDAO.js';

export class RepoProducts {
  constructor() {
    this.dao = new ProductsMongoDAO();
  }

  async getAll() {
    const productsDB = await this.dao.getAll();

    const productsDTO = asDTO(productsDB);

    return productsDTO;
  }

  async getProductUpdate(id) {
    const productsDB = await this.dao.getById(id);

    const productsDTO = asDTO(productsDB);

    return productsDTO;
  }

  async getProduct(id) {
    const productsDB = await this.dao.getById(id);

    const productsDTO = asDTO(productsDB);

    return productsDTO;
  }

  async getProductsByCategory(category) {
    const productsDB = await this.dao.getByCategory(category);

    const productsDTO = asDTO(productsDB);

    return productsDTO;
  }

  async saveProduct(product) {
    await this.dao.save(product);
  }

  async updateProduct(product) {
    await this.dao.update(product);
  }

  async removeProduct(_id) {
    await this.dao.deleteById(_id);
  }
}
