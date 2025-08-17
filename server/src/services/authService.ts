import User, { IUser } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { LoginData } from "../models/Auth";

export const registerUser = async ({
  name,
  email,
  phoneNumber,
  password,
}: IUser) => {
  // Проверка уникальности email
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    throw new Error("Этот email уже зарегистрирован");
  }

  // Проверка уникальности номера
  const existingPhone = await User.findOne({ phoneNumber });
  if (existingPhone) {
    throw new Error("Этот номер уже зарегистрирован");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    name,
    email,
    phoneNumber,
    password: hashedPassword,
  });
  await newUser.save();
  return { message: "Пользователь зарегистрирован" };
};

export const loginUser = async ({
  login,
  password,
}: LoginData): Promise<{ token: string }> => {
  const user = await User.findOne({
    $or: [{ email: login }, { phoneNumber: login }],
  });
  if (!user) {
    throw new Error("Пользователь не найден");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Неверный пароль");
  }

  const token = jwt.sign({ userId: user._id }, "your_jwt_secret", {
    expiresIn: "1h",
  });
  return { token };
};
