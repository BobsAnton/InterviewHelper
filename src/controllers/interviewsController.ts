import { Request, Response } from 'express';
import { InterviewsService } from '../services/interviewsService';

export class InterviewsController {
	// Find by id
	static findById = async (req: Request, res: Response) => {
		if (!req.body) { 
			res.status(400).send({ message: "Body can not be empty!" });
		}

		res.send(await InterviewsService.findById(req.params.id));
	} 

	// Find all
	static findAll = async (req: Request, res: Response) => {
		res.send(await InterviewsService.findAll());
	}

	// Create
	static create = async (req: Request, res: Response) => {
		if (!req.body) {
			res.status(400).send({ message: "Body can not be empty!" });
		}

		const newInterview = new InterviewsService({
			id: '',
			candidate: req.body.candidate,
			date: req.body.date,
			status: req.body.status,
			review: req.body.review
		});

		res.send(await InterviewsService.create(newInterview));
	}

	// Update by id
	static updateById = async (req: Request, res: Response) => {
		if (!req.body) {
			res.status(400).send({ message: "Body can not be empty!" });
		}

		const updatedInterview = new InterviewsService({
			id: req.params.id,
			candidate: req.body.candidate,
			date: req.body.date,
			status: req.body.status,
			review: req.body.review
		});

		res.send(await InterviewsService.updateById(req.params.id, updatedInterview));
	}

	// Remove by id
	static removeById = async (req: Request, res: Response) => {
		res.send(await InterviewsService.removeById(req.params.id));
	}
};