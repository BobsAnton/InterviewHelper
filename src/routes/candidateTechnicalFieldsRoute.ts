import express from 'express';
import { CandidateTechnicalFieldsController } from '../controllers/candidateTechnicalFieldsController';

const router = express.Router();

router.get("/:id", CandidateTechnicalFieldsController.findById);

router.get('/', CandidateTechnicalFieldsController.findAll);

router.post('/', CandidateTechnicalFieldsController.create);

router.delete('/:id', CandidateTechnicalFieldsController.removeById);

router.put('/:id', CandidateTechnicalFieldsController.updateById);

export const candidateTechnicalFieldsRouter = router;