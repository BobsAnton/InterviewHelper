import express from 'express';
import interviewQuestionsController from '../controllers/interviewQuestionsController';

const router = express.Router();

router.get("/:id", interviewQuestionsController.findById);

router.get('/', interviewQuestionsController.findAll);

router.post('/', interviewQuestionsController.create);

router.delete('/:id', interviewQuestionsController.removeById);

router.put('/:id', interviewQuestionsController.updateById);

export const interviewQuestionsRouter = router;