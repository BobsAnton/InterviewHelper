import { Request, Response } from 'express';
import { Question } from '../models/question';

export class QuestionController {
	// Find by id
	static findById = async (req: Request, res: Response) => {
		if (!req.body) { 
			res.status(400).send({ message: "Body can not be empty!" });
		}

		res.send(await Question.findById(req.params.id));
	} 

	// Find all
	static findAll = async (req: Request, res: Response) => {
		res.send(await Question.findAll());
	}

	// Create
	static create = async (req: Request, res: Response) => {
		if (!req.body) {
			res.status(400).send({ message: "Body can not be empty!" });
		}

		const newQuestion = new Question({
			id: '',
			name: req.body.name,
			description: req.body.description,
			complexity: req.body.complexity,
			technicalField: {
				id: req.body.technicalField.id,
				name: req.body.technicalField.name,
				order: req.body.technicalField.order
			}
		});

		res.send(await Question.create(newQuestion));
	}

	// Update by id
	static updateById = async (req: Request, res: Response) => {
		if (!req.body) {
			res.status(400).send({ message: "Body can not be empty!" });
		}

		const updatedQuestion = new Question({
			id: req.params.id,
			name: req.body.name,
			description: req.body.description,
			complexity: req.body.complexity,
			technicalField: {
				id: req.body.technicalField.id,
				name: req.body.technicalField.name,
				order: req.body.technicalField.order
			}
		});

		res.send(await Question.updateById(req.params.id, updatedQuestion));
	}

	// Remove by id
	static removeById = async (req: Request, res: Response) => {
		res.send(await Question.removeById(req.params.id));
	}
};