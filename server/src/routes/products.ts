import { Router } from "express";
import { getAllProductsController } from "../controllers/productController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
router.use(authMiddleware);
router.get("/", getAllProductsController);

export default router;
