import express from 'express';
import { CandidateTechnicalFieldController } from '../controllers/candidateTechnicalFieldController';

const router = express.Router();

router.get("/:id", CandidateTechnicalFieldController.findById);

router.get('/', CandidateTechnicalFieldController.findAll);

router.post('/', CandidateTechnicalFieldController.create);

router.delete('/:id', CandidateTechnicalFieldController.removeById);

router.put('/:id', CandidateTechnicalFieldController.updateById);

export const candidateTechnicalFieldsRouter = router;