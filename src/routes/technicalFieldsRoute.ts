import express from 'express';
import technicalFieldsController from '../controllers/technicalFieldsController';

const router = express.Router();

router.get("/:id", technicalFieldsController.findById);

router.get('/', technicalFieldsController.findAll);

router.post('/', technicalFieldsController.create);

router.delete('/:id', technicalFieldsController.removeById);

router.put('/:id', technicalFieldsController.updateById);

export const technicalFieldsRouter = router;