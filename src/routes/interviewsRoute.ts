import express from 'express';
import interviewsController from '../controllers/interviewsController';

const router = express.Router();

router.get("/:id", interviewsController.findById);

router.get('/', interviewsController.findAll);

router.post('/', interviewsController.create);

router.delete('/:id', interviewsController.removeById);

router.put('/:id', interviewsController.updateById);

export const interviewsRouter = router;