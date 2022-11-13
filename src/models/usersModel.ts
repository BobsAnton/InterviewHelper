import { model, Schema } from 'mongoose';

export interface IUser {
	username: string;
	email: string;
	hash_password: string;
}

const UserSchema = new Schema<IUser>({
	username: { type: String, trim: true, required: true },
	email: { type: String, unique: true, lowercase: true, trim: true, required: true },
	hash_password: { type: String, required: true }
});

export const UserModel = model<IUser>('User', UserSchema);