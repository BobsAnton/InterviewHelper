import express from 'express';
import { InterviewQuestionsController } from '../controllers/interviewQuestionsController';

const router = express.Router();

router.get("/:id", InterviewQuestionsController.findById);

router.get('/', InterviewQuestionsController.findAll);

router.post('/', InterviewQuestionsController.create);

router.delete('/:id', InterviewQuestionsController.removeById);

router.put('/:id', InterviewQuestionsController.updateById);

export const interviewQuestionsRouter = router;