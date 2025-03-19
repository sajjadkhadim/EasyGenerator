import { Schema, Document } from 'mongoose';

export const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
});

export interface User extends Document {
  email: string;
  name: string;
  password: string;
}