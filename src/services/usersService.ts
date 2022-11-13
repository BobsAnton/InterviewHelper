import { IUser, UserModel } from '../models/usersModel';

async function create(newUser: IUser): Promise<IUser> {
	let newUserModel = new UserModel({
		username: newUser.username,
		email: newUser.email,
		hash_password: newUser.hash_password
	});

	return await newUserModel.save();
}

async function findByEmail(email: string): Promise<IUser> {
	return await UserModel.findOne({ email: email });
}

export default {
	findByEmail,
	create
}