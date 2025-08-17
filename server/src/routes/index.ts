import authRoutes from "./auth";
import profileRoutes from "./profile";
import productsRouter from "./products";
import { Router } from "express-serve-static-core";

export default function registerRoutes(app: {
  use: (arg0: string, arg1: Router) => void;
}) {
  app.use("/api/auth", authRoutes);
  app.use("/api/profile", profileRoutes);
  app.use("/api/products", productsRouter);
}
