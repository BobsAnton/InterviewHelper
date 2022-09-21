import express from 'express';
import { CandidateController } from '../controllers/candidateController';

const router = express.Router();

router.get("/:id", CandidateController.findById);

router.get('/', CandidateController.findAll);

router.post('/', CandidateController.create);

router.delete('/:id', CandidateController.removeById);

router.put('/:id', CandidateController.updateById);

export const candidatesRouter = router;