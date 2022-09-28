import { Request, Response } from 'express';
import { CandidatesService } from '../services/candidatesService';

export class CandidatesController {
	// Find by id
	static findById = async (req: Request, res: Response) => {
		if (!req.body) { 
			res.status(400).send({ message: "Body can not be empty!" });
		}

		res.send(await CandidatesService.findById(req.params.id));
	} 

	// Find all
	static findAll = async (req: Request, res: Response) => {
		res.send(await CandidatesService.findAll());
	}

	// Create
	static create = async (req: Request, res: Response) => {
		if (!req.body) {
			res.status(400).send({ message: "Body can not be empty!" });
		}

		const newCandidate = new CandidatesService({
			id: '',
			name: req.body.name
		});

		res.send(await CandidatesService.create(newCandidate));
	}

	// Update by id
	static updateById = async (req: Request, res: Response) => {
		if (!req.body) {
			res.status(400).send({ message: "Body can not be empty!" });
		}

		const updatedCandidate = new CandidatesService({
			id: req.params.id,
			name: req.body.name
		});

		res.send(await CandidatesService.updateById(req.params.id, updatedCandidate));
	}

	// Remove by id
	static removeById = async (req: Request, res: Response) => {
		res.send(await CandidatesService.removeById(req.params.id));
	}
};