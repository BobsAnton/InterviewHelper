import { Request, Response } from 'express';
import { Interview } from '../models/interview';

export class InterviewController {
	// Find by id
	static findById = async (req: Request, res: Response) => {
		if (!req.body) { 
			res.status(400).send({ message: "Body can not be empty!" });
		}

		res.send(await Interview.findById(req.params.id));
	} 

	// Find all
	static findAll = async (req: Request, res: Response) => {
		res.send(await Interview.findAll());
	}

	// Create
	static create = async (req: Request, res: Response) => {
		if (!req.body) {
			res.status(400).send({ message: "Body can not be empty!" });
		}

		const newInterview = new Interview({
			id: '',
			candidate: req.body.candidate,
			date: req.body.date,
			status: req.body.status,
			review: req.body.review
		});

		res.send(await Interview.create(newInterview));
	}

	// Update by id
	static updateById = async (req: Request, res: Response) => {
		if (!req.body) {
			res.status(400).send({ message: "Body can not be empty!" });
		}

		const updatedInterview = new Interview({
			id: req.params.id,
			candidate: req.body.candidate,
			date: req.body.date,
			status: req.body.status,
			review: req.body.review
		});

		res.send(await Interview.updateById(req.params.id, updatedInterview));
	}

	// Remove by id
	static removeById = async (req: Request, res: Response) => {
		res.send(await Interview.removeById(req.params.id));
	}
};