import express from 'express';
import interviewQuestionsController from '../controllers/interviewQuestionsController';
import { auth } from '../middleware/auth';

const router = express.Router();

router.get("/:id", auth, interviewQuestionsController.findById);

router.get('/', auth, interviewQuestionsController.findAll);

router.post('/', auth, interviewQuestionsController.create);

router.delete('/:id', auth, interviewQuestionsController.removeById);

router.put('/:id', auth, interviewQuestionsController.updateById);

export const interviewQuestionsRouter = router;