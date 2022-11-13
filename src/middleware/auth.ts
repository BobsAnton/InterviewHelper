import { Request, Response, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import appConfig from '../configs/appConfig';

export async function auth(req: Request, res: Response, next: NextFunction) {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const decodedToken: any = jsonwebtoken.verify(token, appConfig.secret);
		const email = decodedToken.email;
		if (req.body && req.body.email && req.body.email !== email) {
			throw 'Invalid email!';
		}
		else {
			next();
		}
	} catch (err) {
		res.status(401).send({ error: err.message });
	}
}