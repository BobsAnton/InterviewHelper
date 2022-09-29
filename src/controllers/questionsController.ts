import { Request, Response } from 'express';
import { IQuestion } from '../models/questionsModel';
import questionsService from '../services/questionsService';

async function findById(req: Request, res: Response) {
	if (!req.body) { 
		res.status(400).send({ message: "Body can not be empty!" });
	}

	const result: IQuestion = await questionsService.findById(req.params.id)
	res.send(result);
}

async function findAll(req: Request, res: Response) {
	const result: IQuestion[] = await questionsService.findAll()
	res.send(result);
}

async function create(req: Request, res: Response) {
	if (!req.body) {
		res.status(400).send({ message: "Body can not be empty!" });
	}

	const newQuestion: IQuestion = {
		id: '',
		name: req.body.name,
		description: req.body.description,
		complexity: req.body.complexity,
		technicalField: req.body.technicalField
	};

	const result: IQuestion = await questionsService.create(newQuestion);
	res.send(result);
}

async function updateById(req: Request, res: Response) {
	if (!req.body) {
		res.status(400).send({ message: "Body can not be empty!" });
	}

	const updatedQuestion: IQuestion = {
		id: req.params.id,
		name: req.body.name,
		description: req.body.description,
		complexity: req.body.complexity,
		technicalField: req.body.technicalField
	};

	const result: IQuestion = await questionsService.updateById(req.params.id, updatedQuestion);
	res.send(result);
}

async function removeById(req: Request, res: Response) {
	const result: IQuestion = await questionsService.removeById(req.params.id);
	res.send(result);
}

export default {
	findById,
	findAll,
	create,
	updateById,
	removeById
}