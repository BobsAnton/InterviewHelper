import { Request, Response } from 'express';
import { ICandidateTechnicalField } from '../models/candidateTechnicalFieldsModel';
import candidateTechnicalFieldsService from '../services/candidateTechnicalFieldsService';

async function findById(req: Request, res: Response) {
	if (!req.body) { 
		res.status(400).send({ message: "Body can not be empty!" });
	}

	const result: ICandidateTechnicalField = await candidateTechnicalFieldsService.findById(req.params.id);
	res.send(result);
}

async function findAll(req: Request, res: Response) {
	const result: ICandidateTechnicalField[] = await candidateTechnicalFieldsService.findAll();
	res.send(result);
}

async function create(req: Request, res: Response) {
	if (!req.body) {
		res.status(400).send({ message: "Body can not be empty!" });
	}

	const newCandidateTechnicalField: ICandidateTechnicalField = {
		id: '',
		candidate: req.body.candidate,
		technicalField: req.body.technicalField
	};

	const result: ICandidateTechnicalField = await candidateTechnicalFieldsService.create(newCandidateTechnicalField);
	res.send(result);
}

async function updateById(req: Request, res: Response) {
	if (!req.body) {
		res.status(400).send({ message: "Body can not be empty!" });
	}

	const updatedCandidateTechnicalField: ICandidateTechnicalField = {
		id: req.params.id,
		candidate: req.body.candidate,
		technicalField: req.body.technicalField
	};

	const result: ICandidateTechnicalField = await candidateTechnicalFieldsService.updateById(req.params.id, updatedCandidateTechnicalField);
	res.send(result);
}

async function removeById(req: Request, res: Response) {
	const result: ICandidateTechnicalField = await candidateTechnicalFieldsService.removeById(req.params.id);
	res.send(result);
}

export default {
	findById,
	findAll,
	create,
	updateById,
	removeById
}