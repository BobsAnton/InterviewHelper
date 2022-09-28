import express from 'express';
import { QuestionsController } from '../controllers/questionsController';

const router = express.Router();

router.get("/:id", QuestionsController.findById);

router.get('/', QuestionsController.findAll);

router.post('/', QuestionsController.create);

router.delete('/:id', QuestionsController.removeById);

router.put('/:id', QuestionsController.updateById);

export const questionsRouter = router;