import { Request, Response } from 'express';
import { QuestionsService } from '../services/questionsService';

export class QuestionsController {
	// Find by id
	static findById = async (req: Request, res: Response) => {
		if (!req.body) { 
			res.status(400).send({ message: "Body can not be empty!" });
		}

		res.send(await QuestionsService.findById(req.params.id));
	} 

	// Find all
	static findAll = async (req: Request, res: Response) => {
		res.send(await QuestionsService.findAll());
	}

	// Create
	static create = async (req: Request, res: Response) => {
		if (!req.body) {
			res.status(400).send({ message: "Body can not be empty!" });
		}

		const newQuestion = new QuestionsService({
			id: '',
			name: req.body.name,
			description: req.body.description,
			complexity: req.body.complexity,
			technicalField: req.body.technicalField
		});

		res.send(await QuestionsService.create(newQuestion));
	}

	// Update by id
	static updateById = async (req: Request, res: Response) => {
		if (!req.body) {
			res.status(400).send({ message: "Body can not be empty!" });
		}

		const updatedQuestion = new QuestionsService({
			id: req.params.id,
			name: req.body.name,
			description: req.body.description,
			complexity: req.body.complexity,
			technicalField: req.body.technicalField
		});

		res.send(await QuestionsService.updateById(req.params.id, updatedQuestion));
	}

	// Remove by id
	static removeById = async (req: Request, res: Response) => {
		res.send(await QuestionsService.removeById(req.params.id));
	}
};