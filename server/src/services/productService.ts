import Product, { IProduct } from "../models/Product";

// Получить все товары
export const getAllProductsService = async (): Promise<IProduct[]> => {
  return await Product.find();
};
