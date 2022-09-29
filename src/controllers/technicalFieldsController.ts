import { Request, Response } from 'express';
import { ITechnicalField } from '../models/technicalFieldsModel';
import technicalFieldsService from '../services/technicalFieldsService';

async function findById(req: Request, res: Response) {
	if (!req.body) {
		res.status(400).send({ message: "Body can not be empty!" });
	}

	const result: ITechnicalField = await technicalFieldsService.findById(req.params.id);
	res.send(result);
}

async function findAll(req: Request, res: Response) {
	const result: ITechnicalField[] = await technicalFieldsService.findAll();
	res.send(result);
}

async function create(req: Request, res: Response) {
	if (!req.body) {
		res.status(400).send({ message: "Body can not be empty!" });
	}

	const newTechnicalField: ITechnicalField = {
		id: '',
		name: req.body.name,
		order: req.body.order
	};

	const result: ITechnicalField = await technicalFieldsService.create(newTechnicalField);
	res.send(result);
}

async function updateById(req: Request, res: Response) {
	if (!req.body) {
		res.status(400).send({ message: "Body can not be empty!" });
	}

	const updatedTechnicalField: ITechnicalField = {
		id: req.params.id,
		name: req.body.name,
		order: req.body.order
	};

	const result: ITechnicalField = await technicalFieldsService.updateById(req.params.id, updatedTechnicalField);
	res.send(result);
}

async function removeById(req: Request, res: Response) {
	const result: ITechnicalField = await technicalFieldsService.removeById(req.params.id);
	res.send(result);
}

export default {
	findById,
	findAll,
	create,
	updateById,
	removeById
}