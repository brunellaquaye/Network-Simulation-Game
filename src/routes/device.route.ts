import express from 'express';
import { getDevices,addDevices, renameDevice, removeDevice} from '../controllers/device.controller';
import { deviceValidator } from '../middleware/validator';
const router = express.Router();


router.route('/')
.get(deviceValidator,getDevices)
.post(deviceValidator,addDevices)

router.route('/:id')
.patch(renameDevice)
.delete(removeDevice)



export default router;