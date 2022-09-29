import { Request, Response } from 'express';
import { ICandidate } from '../models/candidatesModel';
import candidatesService from '../services/candidatesService';

async function findById(req: Request, res: Response) {
	if (!req.body) { 
		res.status(400).send({ message: "Body can not be empty!" });
	}

	const result: ICandidate = await candidatesService.findById(req.params.id);
	res.send(result);
}

async function findAll(req: Request, res: Response) {
	const result: ICandidate[] = await candidatesService.findAll();
	res.send(result);
}

async function create(req: Request, res: Response) {
	if (!req.body) {
		res.status(400).send({ message: "Body can not be empty!" });
	}

	const newCandidate: ICandidate = {
		id: '',
		name: req.body.name
	};

	res.send(await candidatesService.create(newCandidate));
}

async function updateById(req: Request, res: Response) {
	if (!req.body) {
		res.status(400).send({ message: "Body can not be empty!" });
	}

	const updatedCandidate: ICandidate = {
		id: req.params.id,
		name: req.body.name
	};

	const result: ICandidate = await candidatesService.updateById(req.params.id, updatedCandidate);
	res.send(result);
}

async function removeById(req: Request, res: Response) {
	const result: ICandidate = await candidatesService.removeById(req.params.id);
	res.send(result);
}

export default {
	findById,
	findAll,
	create,
	updateById,
	removeById
}