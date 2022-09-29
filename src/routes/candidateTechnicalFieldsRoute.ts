import express from 'express';
import candidateTechnicalFieldsController from '../controllers/candidateTechnicalFieldsController';

const router = express.Router();

router.get("/:id", candidateTechnicalFieldsController.findById);

router.get('/', candidateTechnicalFieldsController.findAll);

router.post('/', candidateTechnicalFieldsController.create);

router.delete('/:id', candidateTechnicalFieldsController.removeById);

router.put('/:id', candidateTechnicalFieldsController.updateById);

export const candidateTechnicalFieldsRouter = router;