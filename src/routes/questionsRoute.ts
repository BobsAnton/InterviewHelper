import express from 'express';
import questionsController from '../controllers/questionsController';
import { auth } from '../middleware/auth';

const router = express.Router();

router.get("/:id", auth, questionsController.findById);

router.get('/', auth, questionsController.findAll);

router.post('/', auth, questionsController.create);

router.delete('/:id', auth, questionsController.removeById);

router.put('/:id', auth, questionsController.updateById);

export const questionsRouter = router;