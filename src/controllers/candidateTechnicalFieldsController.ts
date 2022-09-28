import { Request, Response } from 'express';
import { CandidateTechnicalFieldsService } from '../services/candidateTechnicalFieldsService';

export class CandidateTechnicalFieldsController {
	// Find by id
	static findById = async (req: Request, res: Response) => {
		if (!req.body) { 
			res.status(400).send({ message: "Body can not be empty!" });
		}

		res.send(await CandidateTechnicalFieldsService.findById(req.params.id));
	} 

	// Find all
	static findAll = async (req: Request, res: Response) => {
		res.send(await CandidateTechnicalFieldsService.findAll());
	}

	// Create
	static create = async (req: Request, res: Response) => {
		if (!req.body) {
			res.status(400).send({ message: "Body can not be empty!" });
		}

		const newCandidateTechnicalField = new CandidateTechnicalFieldsService({
			id: '',
			candidate: req.body.candidate,
			technicalField: req.body.technicalField
		});

		res.send(await CandidateTechnicalFieldsService.create(newCandidateTechnicalField));
	}

	// Update by id
	static updateById = async (req: Request, res: Response) => {
		if (!req.body) {
			res.status(400).send({ message: "Body can not be empty!" });
		}

		const updatedCandidateTechnicalField = new CandidateTechnicalFieldsService({
			id: req.params.id,
			candidate: req.body.candidate,
			technicalField: req.body.technicalField
		});

		res.send(await CandidateTechnicalFieldsService.updateById(req.params.id, updatedCandidateTechnicalField));
	}

	// Remove by id
	static removeById = async (req: Request, res: Response) => {
		res.send(await CandidateTechnicalFieldsService.removeById(req.params.id));
	}
};