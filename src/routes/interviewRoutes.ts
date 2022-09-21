import express from 'express';
import { InterviewController } from '../controllers/interviewController';

const router = express.Router();

router.get("/:id", InterviewController.findById);

router.get('/', InterviewController.findAll);

router.post('/', InterviewController.create);

router.delete('/:id', InterviewController.removeById);

router.put('/:id', InterviewController.updateById);

export const interviewsRouter = router;