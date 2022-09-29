import { Request, Response } from 'express';
import { IInterview } from '../models/interviewsModel';
import interviewsService from '../services/interviewsService';

async function findById(req: Request, res: Response) {
	if (!req.body) { 
		res.status(400).send({ message: "Body can not be empty!" });
	}

	const result: IInterview = await interviewsService.findById(req.params.id);
	res.send(result);
}

async function findAll(req: Request, res: Response) {
	const result: IInterview[] = await interviewsService.findAll();
	res.send(result);
}

async function create(req: Request, res: Response) {
	if (!req.body) {
		res.status(400).send({ message: "Body can not be empty!" });
	}

	const newInterview: IInterview = {
		id: '',
		candidate: req.body.candidate,
		date: req.body.date,
		status: req.body.status,
		review: req.body.review
	};

	const result: IInterview = await interviewsService.create(newInterview);
	res.send(result);
}

async function updateById(req: Request, res: Response) {
	if (!req.body) {
		res.status(400).send({ message: "Body can not be empty!" });
	}

	const updatedInterview: IInterview = {
		id: req.params.id,
		candidate: req.body.candidate,
		date: req.body.date,
		status: req.body.status,
		review: req.body.review
	};

	const result: IInterview = await interviewsService.updateById(req.params.id, updatedInterview)
	res.send(result);
}

async function removeById(req: Request, res: Response) {
	const result: IInterview = await interviewsService.removeById(req.params.id);
	res.send(result);
}

export default {
	findById,
	findAll,
	create,
	updateById,
	removeById
}