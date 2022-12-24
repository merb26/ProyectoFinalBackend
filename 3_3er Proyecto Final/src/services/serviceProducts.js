import {RepoProducts} from '../repository/products/productsRepo.js';

export const serviceProducts = {
  getProducts: async () => {
    return await new RepoProducts().getAll();
  },

  getProductUpdate: async (id) => {
    return await new RepoProducts().getProductUpdate(id);
  },

  getProduct: async (id) => {
    return await new RepoProducts().getProduct(id);
  },

  getProductsByCategory: async (category) => {
    return await new RepoProducts().getProductsByCategory(category);
  },

  saveProduct: async (product) => {
    return await new RepoProducts().saveProduct(product);
  },

  updateProduct: async (product) => {
    return await new RepoProducts().updateProduct(product);
  },

  removeProduct: async (_id) => {
    return await new RepoProducts().removeProduct(_id);
  },
};
