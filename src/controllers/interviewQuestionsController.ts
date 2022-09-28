import { Request, Response } from 'express';
import { InterviewQuestionsService } from '../services/interviewQuestionsService';

export class InterviewQuestionsController {
	// Find by id
	static findById = async (req: Request, res: Response) => {
		if (!req.body) { 
			res.status(400).send({ message: "Body can not be empty!" });
		}

		res.send(await InterviewQuestionsService.findById(req.params.id));
	} 

	// Find all
	static findAll = async (req: Request, res: Response) => {
		res.send(await InterviewQuestionsService.findAll());
	}

	// Create
	static create = async (req: Request, res: Response) => {
		if (!req.body) {
			res.status(400).send({ message: "Body can not be empty!" });
		}

		const newInterviewQuestion = new InterviewQuestionsService({
			id: '',
			interview: req.body.interview,
			question: req.body.question,
			grade: req.body.grade,
			comment: req.body.comment
		});

		res.send(await InterviewQuestionsService.create(newInterviewQuestion));
	}

	// Update by id
	static updateById = async (req: Request, res: Response) => {
		if (!req.body) {
			res.status(400).send({ message: "Body can not be empty!" });
		}

		const updatedInterviewQuestion = new InterviewQuestionsService({
			id: req.params.id,
			interview: req.body.interview,
			question: req.body.question,
			grade: req.body.grade,
			comment: req.body.comment
		});

		res.send(await InterviewQuestionsService.updateById(req.params.id, updatedInterviewQuestion));
	}

	// Remove by id
	static removeById = async (req: Request, res: Response) => {
		res.send(await InterviewQuestionsService.removeById(req.params.id));
	}
};