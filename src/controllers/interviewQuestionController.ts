import { Request, Response } from 'express';
import { InterviewQuestion } from '../models/interviewQuestion';

export class InterviewQuestionController {
	// Find by id
	static findById = async (req: Request, res: Response) => {
		if (!req.body) { 
			res.status(400).send({ message: "Body can not be empty!" });
		}

		res.send(await InterviewQuestion.findById(req.params.id));
	} 

	// Find all
	static findAll = async (req: Request, res: Response) => {
		res.send(await InterviewQuestion.findAll());
	}

	// Create
	static create = async (req: Request, res: Response) => {
		if (!req.body) {
			res.status(400).send({ message: "Body can not be empty!" });
		}

		const newInterviewQuestion = new InterviewQuestion({
			id: '',
			interview: req.body.interview,
			question: req.body.question,
			grade: req.body.grade,
			comment: req.body.comment
		});

		res.send(await InterviewQuestion.create(newInterviewQuestion));
	}

	// Update by id
	static updateById = async (req: Request, res: Response) => {
		if (!req.body) {
			res.status(400).send({ message: "Body can not be empty!" });
		}

		const updatedInterviewQuestion = new InterviewQuestion({
			id: req.params.id,
			interview: req.body.interview,
			question: req.body.question,
			grade: req.body.grade,
			comment: req.body.comment
		});

		res.send(await InterviewQuestion.updateById(req.params.id, updatedInterviewQuestion));
	}

	// Remove by id
	static removeById = async (req: Request, res: Response) => {
		res.send(await InterviewQuestion.removeById(req.params.id));
	}
};