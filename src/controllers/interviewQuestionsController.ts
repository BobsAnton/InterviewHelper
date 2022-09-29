import { Request, Response } from 'express';
import { IInterviewQuestion } from '../models/interviewQuestionsModel';
import interviewQuestionsService from '../services/interviewQuestionsService';

async function findById(req: Request, res: Response) {
	if (!req.body) { 
		res.status(400).send({ message: "Body can not be empty!" });
	}

	const result: IInterviewQuestion = await interviewQuestionsService.findById(req.params.id);
	res.send(result);
}

async function findAll(req: Request, res: Response) {
	const result: IInterviewQuestion[] = await interviewQuestionsService.findAll();
	res.send(result);
}

async function create(req: Request, res: Response) {
	if (!req.body) {
		res.status(400).send({ message: "Body can not be empty!" });
	}

	const newInterviewQuestion: IInterviewQuestion = {
		id: '',
		interview: req.body.interview,
		question: req.body.question,
		grade: req.body.grade,
		comment: req.body.comment
	};

	const result: IInterviewQuestion = await interviewQuestionsService.create(newInterviewQuestion)
	res.send(result);
}

async function updateById(req: Request, res: Response) {
	if (!req.body) {
		res.status(400).send({ message: "Body can not be empty!" });
	}

	const updatedInterviewQuestion: IInterviewQuestion = {
		id: req.params.id,
		interview: req.body.interview,
		question: req.body.question,
		grade: req.body.grade,
		comment: req.body.comment
	};

	const result: IInterviewQuestion = await interviewQuestionsService.updateById(req.params.id, updatedInterviewQuestion);
	res.send(result);
}

async function removeById(req: Request, res: Response) {
	const result: IInterviewQuestion = await interviewQuestionsService.removeById(req.params.id)
	res.send(result);
}

export default {
	findById,
	findAll,
	create,
	updateById,
	removeById
}