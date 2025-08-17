import { getAllProductsService } from "../services/productService";

export const getAllProductsController = async (req, res) => {
  try {
    const products = await getAllProductsService();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Ошибка при получении товаров" });
  }
};
