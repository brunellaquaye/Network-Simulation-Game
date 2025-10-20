import express from 'express';
const router = express.Router();
import { simulateDeviceState } from '../controllers/simulate.controller';

router.post('/:id',simulateDeviceState)


export default router;