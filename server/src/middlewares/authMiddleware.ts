import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
  user?: any;
}

export const authMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.cookie?.split("token=")[1]; // читаем из cookies
  if (!token) {
    return res.status(401).json({ message: "Нет токена" });
  }

  try {
    const decoded = jwt.verify(token, "your_jwt_secret");
    req.user = decoded; // добавляем пользователя в запрос
    next();
    return 
  } catch (err) {
    return res.status(401).json({ message: "Недействительный токен" });
  }
};
