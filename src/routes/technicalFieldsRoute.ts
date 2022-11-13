import express from 'express';
import technicalFieldsController from '../controllers/technicalFieldsController';
import { auth } from '../middleware/auth';

const router = express.Router();

router.get("/:id", auth, technicalFieldsController.findById);

router.get('/', auth, technicalFieldsController.findAll);

router.post('/', auth, technicalFieldsController.create);

router.delete('/:id', auth, technicalFieldsController.removeById);

router.put('/:id', auth, technicalFieldsController.updateById);

export const technicalFieldsRouter = router;