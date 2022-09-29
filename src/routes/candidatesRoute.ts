import express from 'express';
import candidatesController from '../controllers/candidatesController';

const router = express.Router();

router.get("/:id", candidatesController.findById);

router.get('/', candidatesController.findAll);

router.post('/', candidatesController.create);

router.delete('/:id', candidatesController.removeById);

router.put('/:id', candidatesController.updateById);

export const candidatesRouter = router;