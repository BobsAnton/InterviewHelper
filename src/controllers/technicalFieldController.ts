import { Request, Response } from 'express';
import { TechnicalField } from '../models/technicalField';

export class TechnicalFieldController {
	
	// Find by id
	static findById = async (req: Request, res: Response) => {
		if (!req.body) {
			res.status(400).send({ message: "Body can not be empty!" });
		}

		res.send(await TechnicalField.findById(req.params.id));
	} 

	// Find all
	static findAll = async (req: Request, res: Response) => {
		res.send(await TechnicalField.findAll());
	}

	// Create
	static create = async (req: Request, res: Response) => {
		if (!req.body) {
			res.status(400).send({ message: "Body can not be empty!" });
		}

		const newTechnicalField = new TechnicalField({
			id: '',
			name: req.body.name,
			order: req.body.order
		});

		res.send(await TechnicalField.create(newTechnicalField));
	}

	// Update by id
	static updateById = async (req: Request, res: Response) => {
		if (!req.body) {
			res.status(400).send({ message: "Body can not be empty!" });
		}

		const updatedTechnicalField = new TechnicalField({
			id: req.params.id,
			name: req.body.name,
			order: req.body.order
		});

		res.send(await TechnicalField.updateById(req.params.id, updatedTechnicalField));
	}

	// Remove by id
	static removeById = async (req: Request, res: Response) => {
		res.send(await TechnicalField.removeById(req.params.id));
	}
};