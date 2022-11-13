import express from 'express';
import candidateTechnicalFieldsController from '../controllers/candidateTechnicalFieldsController';
import { auth } from '../middleware/auth';

const router = express.Router();

router.get("/:id", auth, candidateTechnicalFieldsController.findById);

router.get('/', auth, candidateTechnicalFieldsController.findAll);

router.post('/', auth, candidateTechnicalFieldsController.create);

router.delete('/:id', auth, candidateTechnicalFieldsController.removeById);

router.put('/:id', auth, candidateTechnicalFieldsController.updateById);

export const candidateTechnicalFieldsRouter = router;