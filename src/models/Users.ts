import { Schema, models, model } from "mongoose";

export interface UserSchema {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

const userSchema = new Schema<UserSchema>({
  username: { type: String },
  password: { type: String },
  email: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const User = models.User || model<UserSchema>("User", userSchema);
