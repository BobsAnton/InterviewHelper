import { Request, Response } from 'express';
import { Candidate } from '../models/candidate';

export class CandidateController {
	// Find by id
	static findById = async (req: Request, res: Response) => {
		if (!req.body) { 
			res.status(400).send({ message: "Body can not be empty!" });
		}

		res.send(await Candidate.findById(req.params.id));
	} 

	// Find all
	static findAll = async (req: Request, res: Response) => {
		res.send(await Candidate.findAll());
	}

	// Create
	static create = async (req: Request, res: Response) => {
		if (!req.body) {
			res.status(400).send({ message: "Body can not be empty!" });
		}

		const newCandidate = new Candidate({
			id: '',
			name: req.body.name,
			skills: req.body.candidateTechnicalFields,
			interviews: req.body.interviews
		});

		res.send(await Candidate.create(newCandidate));
	}

	// Update by id
	static updateById = async (req: Request, res: Response) => {
		if (!req.body) {
			res.status(400).send({ message: "Body can not be empty!" });
		}

		const updatedCandidate = new Candidate({
			id: req.params.id,
			name: req.body.name,
			skills: req.body.candidateTechnicalFields,
			interviews: req.body.interviews
		});

		res.send(await Candidate.updateById(req.params.id, updatedCandidate));
	}

	// Remove by id
	static removeById = async (req: Request, res: Response) => {
		res.send(await Candidate.removeById(req.params.id));
	}
};