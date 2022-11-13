import express from 'express';
import interviewsController from '../controllers/interviewsController';
import { auth } from '../middleware/auth';

const router = express.Router();

router.get("/:id", auth, interviewsController.findById);

router.get('/', auth, interviewsController.findAll);

router.post('/', auth, interviewsController.create);

router.delete('/:id', auth, interviewsController.removeById);

router.put('/:id', auth, interviewsController.updateById);

export const interviewsRouter = router;