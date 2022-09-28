import express from 'express';
import { TechnicalFieldsController } from '../controllers/technicalFieldsController';

const router = express.Router();

router.get("/:id", TechnicalFieldsController.findById);

router.get('/', TechnicalFieldsController.findAll);

router.post('/', TechnicalFieldsController.create);

router.delete('/:id', TechnicalFieldsController.removeById);

router.put('/:id', TechnicalFieldsController.updateById);

export const technicalFieldsRouter = router;