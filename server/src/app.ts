import express from "express";
import connectDB from "./config/db";

const app = express();

// connectDB(); // подключение к базе данных

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
