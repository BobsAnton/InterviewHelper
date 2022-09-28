import express from 'express';
import { InterviewsController } from '../controllers/interviewsController';

const router = express.Router();

router.get("/:id", InterviewsController.findById);

router.get('/', InterviewsController.findAll);

router.post('/', InterviewsController.create);

router.delete('/:id', InterviewsController.removeById);

router.put('/:id', InterviewsController.updateById);

export const interviewsRouter = router;