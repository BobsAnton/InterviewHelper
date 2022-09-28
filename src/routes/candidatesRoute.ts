import express from 'express';
import { CandidatesController } from '../controllers/candidatesController';

const router = express.Router();

router.get("/:id", CandidatesController.findById);

router.get('/', CandidatesController.findAll);

router.post('/', CandidatesController.create);

router.delete('/:id', CandidatesController.removeById);

router.put('/:id', CandidatesController.updateById);

export const candidatesRouter = router;