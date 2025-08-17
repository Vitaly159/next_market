import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, async (req, res) => {
  // req.user содержит данные из токена
  res.json({ message: "Доступ разрешен", user: req.user });
});

export default router;
