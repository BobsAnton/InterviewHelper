import express from 'express';
import candidatesController from '../controllers/candidatesController';
import { auth } from '../middleware/auth';

const router = express.Router();

router.get("/:id", auth, candidatesController.findById);

router.get('/', auth, candidatesController.findAll);

router.post('/', auth, candidatesController.create);

router.delete('/:id', auth, candidatesController.removeById);

router.put('/:id', auth, candidatesController.updateById);

export const candidatesRouter = router;