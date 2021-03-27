import express from 'express';
import userRouter from './user';
import patientRouter from './patient';
import visitsRouter from './visit';

const router = express.Router();

router.use('/users/', userRouter);
router.use('/patients/', patientRouter);
// router.use('/visits/', visitsRouter);

export default router;
