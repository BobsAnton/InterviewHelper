import express from 'express';
import { TechnicalFieldController } from '../controllers/technicalFieldController';

const router = express.Router();

router.get("/:id", TechnicalFieldController.findById);

router.get('/', TechnicalFieldController.findAll);

router.post('/', TechnicalFieldController.create);

router.delete('/:id', TechnicalFieldController.removeById);

router.put('/:id', TechnicalFieldController.updateById);

export const technicalFieldsRouter = router;