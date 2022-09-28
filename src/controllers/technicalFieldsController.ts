import { Request, Response } from 'express';
import { TechnicalFieldsService } from '../services/technicalFieldsService';

export class TechnicalFieldsController {
	
	// Find by id
	static findById = async (req: Request, res: Response) => {
		if (!req.body) {
			res.status(400).send({ message: "Body can not be empty!" });
		}

		res.send(await TechnicalFieldsService.findById(req.params.id));
	} 

	// Find all
	static findAll = async (req: Request, res: Response) => {
		res.send(await TechnicalFieldsService.findAll());
	}

	// Create
	static create = async (req: Request, res: Response) => {
		if (!req.body) {
			res.status(400).send({ message: "Body can not be empty!" });
		}

		const newTechnicalField = new TechnicalFieldsService({
			id: '',
			name: req.body.name,
			order: req.body.order
		});

		res.send(await TechnicalFieldsService.create(newTechnicalField));
	}

	// Update by id
	static updateById = async (req: Request, res: Response) => {
		if (!req.body) {
			res.status(400).send({ message: "Body can not be empty!" });
		}

		const updatedTechnicalField = new TechnicalFieldsService({
			id: req.params.id,
			name: req.body.name,
			order: req.body.order
		});

		res.send(await TechnicalFieldsService.updateById(req.params.id, updatedTechnicalField));
	}

	// Remove by id
	static removeById = async (req: Request, res: Response) => {
		res.send(await TechnicalFieldsService.removeById(req.params.id));
	}
};