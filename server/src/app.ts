import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import dotenv from "dotenv";
import registerRoutes from "./routes";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

registerRoutes(app); // подключение всех маршрутов

const startServer = async () => {
  try {
    await connectDB(); // дождаться подключения к базе
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Ошибка при запуске сервера:", err);
  }
};

startServer();
