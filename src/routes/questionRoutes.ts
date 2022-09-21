import express from 'express';
import { QuestionController } from '../controllers/questionController';

const router = express.Router();

router.get("/:id", QuestionController.findById);

router.get('/', QuestionController.findAll);

router.post('/', QuestionController.create);

router.delete('/:id', QuestionController.removeById);

router.put('/:id', QuestionController.updateById);

export const questionsRouter = router;