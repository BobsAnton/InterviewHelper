import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { IUser } from '../models/usersModel';
import usersService from '../services/usersService';
import appConfig from '../configs/appConfig';

async function signUp(req: Request, res: Response) {
	if (!req.body) {
		res.status(400).send({ message: "Body can not be empty!" });
	}

	const newUser: IUser = {
		username: req.body.username,
		email: req.body.email,
		hash_password: bcrypt.hashSync(req.body.password, 10)
	};

	const result: IUser = await usersService.create(newUser);
	res.json({
		token: jwt.sign({
			email: result.email,
			username: result.username
		},
		appConfig.secret)
	});
}

async function signIn(req: Request, res: Response) {
	if (!req.body) {
		res.status(400).send({ message: "Body can not be empty!" });
	}

	const result: IUser = await usersService.findByEmail(req.body.email);

	if (!result || !bcrypt.compareSync(req.body.password, result.hash_password))
	{
		return res.status(401).json({ message: "Authentication failed. Invalid user or password!" });
	}

	res.json({
		token: jwt.sign({
			email: result.email,
			username: result.username
		},
		appConfig.secret)
	});
}

export default {
	signUp,
	signIn
}