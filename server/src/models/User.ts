import mongoose, { Schema, Document } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}

type TUserDocument = IUser & Document;

const UserSchema: Schema<TUserDocument> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model<TUserDocument>("User", UserSchema);
