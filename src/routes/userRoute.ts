import express from 'express';
import usersController from '../controllers/usersController';

const router = express.Router();

router.post('/signUp', usersController.signUp);

router.post('/signIn', usersController.signIn);

export const usersRouter = router;