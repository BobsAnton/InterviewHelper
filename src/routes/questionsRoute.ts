import express from 'express';
import questionsController from '../controllers/questionsController';

const router = express.Router();

router.get("/:id", questionsController.findById);

router.get('/', questionsController.findAll);

router.post('/', questionsController.create);

router.delete('/:id', questionsController.removeById);

router.put('/:id', questionsController.updateById);

export const questionsRouter = router;