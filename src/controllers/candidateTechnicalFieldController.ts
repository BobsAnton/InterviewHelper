import { Request, Response } from 'express';
import { CandidateTechnicalField } from '../models/candidateTechnicalField';

export class CandidateTechnicalFieldController {
	// Find by id
	static findById = async (req: Request, res: Response) => {
		if (!req.body) { 
			res.status(400).send({ message: "Body can not be empty!" });
		}

		res.send(await CandidateTechnicalField.findById(req.params.id));
	} 

	// Find all
	static findAll = async (req: Request, res: Response) => {
		res.send(await CandidateTechnicalField.findAll());
	}

	// Create
	static create = async (req: Request, res: Response) => {
		if (!req.body) {
			res.status(400).send({ message: "Body can not be empty!" });
		}

		const newCandidateTechnicalField = new CandidateTechnicalField({
			id: '',
			candidate: req.body.candidate,
			technicalField: req.body.technicalField
		});

		res.send(await CandidateTechnicalField.create(newCandidateTechnicalField));
	}

	// Update by id
	static updateById = async (req: Request, res: Response) => {
		if (!req.body) {
			res.status(400).send({ message: "Body can not be empty!" });
		}

		const updatedCandidateTechnicalField = new CandidateTechnicalField({
			id: req.params.id,
			candidate: req.body.candidate,
			technicalField: req.body.technicalField
		});

		res.send(await CandidateTechnicalField.updateById(req.params.id, updatedCandidateTechnicalField));
	}

	// Remove by id
	static removeById = async (req: Request, res: Response) => {
		res.send(await CandidateTechnicalField.removeById(req.params.id));
	}
};