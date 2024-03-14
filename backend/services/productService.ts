import Product from '../models/productModel';

export const findAllProducts = async () => {
  return await Product.findAll();
};

export const findProductById = async (id: number) => {
  return await Product.findByPk(id);
};
