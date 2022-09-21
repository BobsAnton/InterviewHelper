import express from 'express';
import { InterviewQuestionController } from '../controllers/interviewQuestionController';

const router = express.Router();

router.get("/:id", InterviewQuestionController.findById);

router.get('/', InterviewQuestionController.findAll);

router.post('/', InterviewQuestionController.create);

router.delete('/:id', InterviewQuestionController.removeById);

router.put('/:id', InterviewQuestionController.updateById);

export const interviewQuestionsRouter = router;